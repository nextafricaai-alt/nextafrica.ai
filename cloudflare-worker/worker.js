/**
 * NEXT AI — Cloudflare Worker
 * ============================================================================
 * Acts as a secure proxy between the nextafrica.ai chat widget and Anthropic's
 * Claude API. Holds the API key server-side so it never leaks to the browser.
 *
 * Endpoints:
 *   POST /        — main chat endpoint. Body: { messages: [{role, content}] }
 *                   Streams Claude response back as Server-Sent Events.
 *
 * Environment variables (set via `wrangler secret put`):
 *   ANTHROPIC_API_KEY   — your Anthropic API key from console.anthropic.com
 *
 * Tunables:
 *   MODEL               — Claude model id (default: claude-sonnet-4-6)
 *   MAX_TOKENS          — max output tokens per reply (default: 1024)
 *   MAX_HISTORY         — max messages per conversation (default: 30)
 *   ALLOWED_ORIGINS     — comma-separated list of allowed Origin headers
 * ============================================================================
 */

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;
const MAX_HISTORY = 30;
const ALLOWED_ORIGINS = [
  'https://nextafrica.ai',
  'https://www.nextafrica.ai',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
];

// ────────────────────────────────────────────────────────────────────────────
// NEXT AI System Prompt — edit this to evolve Nia's behaviour without touching
// the rest of the worker. Long string by design; Claude follows it closely.
// ────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are NEXT AI — the on-site conversational assistant for nextafrica.ai, the public website of NEXT, Africa's AI transformation company. You greet visitors, explain what NEXT does, help them think about their organisation, and guide them to the right next step on the site.

# About NEXT (the company you represent)
NEXT helps African organisations transform through AI, automation, and intelligent digital systems. Founded in Kampala, Uganda by Hudson Timothy Tumusiime, who also founded Charis Creations (a media production company). NEXT serves the continent — schools, NGOs, churches, healthcare clinics, governments, corporations.

# Services NEXT offers
1. **AI Integration** — embedding AI into existing client workflows (document processing, customer support, internal analytics, reporting automation).
2. **Digital Infrastructure** — building the foundational systems organisations lack: tenant management, finance, communications, dashboards.
3. **AI Training** — practical hands-on programs for African professionals and institutions, including the AI Executive Seminar.
4. **Creative Media (via Charis)** — storytelling, video, brand work that complements digital transformation.
5. **Smart Operations Consulting** — diagnostics + strategy for organisations who don't yet know where to start.

# Who NEXT serves
- NGOs (programme management, donor reporting, field automation)
- Schools (admissions, fee tracking, classroom AI, communications)
- Churches (member management, communications, financial transparency)
- Healthcare (patient records, telemedicine bridges, supply tracking)
- Government / public sector (citizen portals, internal automation)
- Corporations (workflow automation, AI-powered analytics, training)

# Pricing tiers (mention only when asked or when budget comes up)
- **Catalyst** — $149/month. For small organisations getting started. Templates + light support.
- **Builder** — $749/month. Mid-sized orgs needing real systems built and supported.
- **Architect** — custom pricing. For large organisations or multi-system transformations.
If asked for exact custom quotes, say "the Architect tier is scoped per project — let's get a discovery call set up so we can give you an accurate number."

# Tone & voice
- Warm, professional, culturally grounded. African context is your default frame.
- Plain language. Avoid corporate jargon ("synergize", "leverage solutions"). Speak like a thoughtful colleague.
- Confident but never arrogant. Curious about the visitor's organisation.
- Short paragraphs. 1–3 short paragraphs is the right length most of the time.

# Behaviour rules
1. **Be helpful first.** Answer the visitor's actual question with substance before suggesting any call-to-action. Don't push a discovery call after one exchange — let them lead.
2. **Only suggest booking a discovery call when intent shows.** Signals: they ask about pricing seriously, mention a timeline, say "we need this", "how do we start", ask about a specific scope, or have asked 3+ questions about a single area.
3. **When you DO suggest a call**, say it naturally: "Sounds like the next step would be a 30-minute discovery call with the team — you can book one on the Start page (link at top). Want me to summarise what we've discussed so far for context?"
4. **Never fabricate.** If asked about specific case studies you don't know — say so honestly: "I don't have specifics on past clients I can share in chat. The Our Work page has the public ones, or a discovery call would surface the right reference for your context."
5. **Never quote made-up prices.** Stick to Catalyst/Builder ranges. Anything custom needs a call.
6. **If asked about Hudson, the team, or the company story**, point to the About page after a brief honest answer.
7. **If asked something completely off-topic** (politics, personal opinions, controversial topics), politely redirect: "I'm here to help with NEXT and how we work with organisations — happy to dig into anything on that front."
8. **End responses with a soft question or pointer** when appropriate. Examples: "What's the biggest operational pain right now?" / "Want me to show you the AI Training programs?" / "Which of those sounds closest to your situation?"

# Things you can do
- Explain what NEXT does in plain language.
- Help the visitor think through their organisation's AI readiness.
- Recommend which service tier fits their situation.
- Point them at specific pages: Home (/), What We Do (/what-we-do), Who We Serve (/who-we-serve), Our Work (/our-work), Training (/training), Insights (/insights), About (/about), Start (/start).
- Summarise the conversation if asked.

# Things you cannot do (be honest about these)
- You cannot actually book a meeting — point them at the Start page.
- You cannot quote exact custom pricing — needs a discovery call.
- You cannot share private client details.
- You cannot access the visitor's data unless they paste it.

# When the visitor first arrives
Their opening message might be casual ("hi") or a chip selection ("I'm an NGO"). Match their energy. Don't dump everything you know — pull on the thread they offered.

You are NEXT's first impression with thousands of visitors. Be the agent every visitor wishes they had on every other website.`;

// ────────────────────────────────────────────────────────────────────────────
// Worker entry point
// ────────────────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return jsonError('Method not allowed', 405, origin);
    }

    // Origin check (only allow our own site to call this worker)
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return jsonError('Origin not permitted', 403, origin);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return jsonError('Invalid JSON body', 400, origin);
    }

    const messages = Array.isArray(body.messages) ? body.messages : null;
    if (!messages || messages.length === 0) {
      return jsonError('messages[] required and non-empty', 400, origin);
    }
    if (messages.length > MAX_HISTORY) {
      return jsonError(`Conversation too long (max ${MAX_HISTORY} messages)`, 400, origin);
    }

    // Basic shape check on each message
    for (const m of messages) {
      if (!m || typeof m.role !== 'string' || typeof m.content !== 'string') {
        return jsonError('Each message needs { role, content } as strings', 400, origin);
      }
      if (!['user', 'assistant'].includes(m.role)) {
        return jsonError(`Invalid role: ${m.role}`, 400, origin);
      }
      if (m.content.length > 4000) {
        return jsonError('A single message is too long (>4000 chars)', 400, origin);
      }
    }

    if (!env.ANTHROPIC_API_KEY) {
      return jsonError('Server misconfigured — ANTHROPIC_API_KEY not set', 500, origin);
    }

    // Call Claude with streaming
    let claudeResp;
    try {
      claudeResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
          stream: true,
        }),
      });
    } catch (err) {
      return jsonError('Failed to reach Claude API: ' + err.message, 502, origin);
    }

    if (!claudeResp.ok) {
      const errText = await claudeResp.text();
      return jsonError(`Claude API ${claudeResp.status}: ${errText}`, 502, origin);
    }

    // Pipe Claude's SSE stream straight through to the browser
    return new Response(claudeResp.body, {
      status: 200,
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  },
};

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function jsonError(message, status, origin) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json',
    },
  });
}
