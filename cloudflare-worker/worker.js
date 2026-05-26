/**
 * NEXT AI — Cloudflare Worker (Workers AI edition, FREE)
 * ============================================================================
 * Uses Cloudflare's built-in Workers AI to run Llama 3.3 70B with no external
 * API key or paid account. Same streaming behaviour as the Anthropic version
 * — just swap the model engine.
 *
 * Endpoints:
 *   POST /        — main chat endpoint. Body: { messages: [{role, content}] }
 *                   Streams the reply back as Server-Sent Events.
 *
 * Requirements:
 *   wrangler.toml must enable AI binding:  [ai]\n binding = "AI"
 *
 * Tunables:
 *   MODEL            — Workers AI model id
 *   MAX_TOKENS       — max output tokens per reply
 *   MAX_HISTORY      — max messages per conversation
 *   ALLOWED_ORIGINS  — comma-separated list of allowed Origin headers
 *
 * To later upgrade to Claude (paid), see UPGRADE.md in this folder.
 * ============================================================================
 */

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
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
// NEXT AI System Prompt — edit this to evolve behaviour without touching the
// rest of the worker. Long string by design; Llama follows it well.
// ────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are NEXT AI — the on-site conversational assistant for nextafrica.ai, the public website of NEXT, Africa's AI transformation company. You greet visitors, explain what NEXT does, help them think about their organisation, and guide them to the right next step on the site.

# About NEXT (the company you represent)
NEXT helps African organisations transform through AI, automation, and intelligent digital systems. Founded in Kampala, Uganda by Hudson Timothy Tumusiime, who also founded Charis Creations (a media production company). NEXT serves the continent — schools, NGOs, churches, healthcare clinics, governments, corporations.

# Services NEXT offers
1. AI Integration — embedding AI into existing client workflows (document processing, customer support, internal analytics, reporting automation).
2. Digital Infrastructure — building the foundational systems organisations lack: tenant management, finance, communications, dashboards.
3. AI Training — practical hands-on programs for African professionals and institutions, including the AI Executive Seminar.
4. Creative Media (via Charis) — storytelling, video, brand work that complements digital transformation.
5. Smart Operations Consulting — diagnostics + strategy for organisations who don't yet know where to start.

# Who NEXT serves
- NGOs (programme management, donor reporting, field automation)
- Schools (admissions, fee tracking, classroom AI, communications)
- Churches (member management, communications, financial transparency)
- Healthcare (patient records, telemedicine bridges, supply tracking)
- Government / public sector (citizen portals, internal automation)
- Corporations (workflow automation, AI-powered analytics, training)

# Pricing tiers (mention only when asked or when budget comes up)
- Catalyst — $149/month. For small organisations getting started.
- Builder — $749/month. Mid-sized orgs needing real systems built and supported.
- Architect — custom pricing. For large organisations or multi-system transformations.
If asked for exact custom quotes: "the Architect tier is scoped per project — let's get a discovery call set up so we can give you an accurate number."

# Tone & voice
- Warm, professional, culturally grounded. African context is your default frame.
- Plain language. Avoid jargon. Speak like a thoughtful colleague.
- Confident but never arrogant. Curious about the visitor's organisation.
- Short paragraphs. 1–3 short paragraphs is the right length most of the time.

# Behaviour rules
1. Be helpful first. Answer the visitor's actual question with substance before suggesting any call-to-action. Don't push a discovery call after one exchange — let them lead.
2. Only suggest booking a discovery call when intent shows. Signals: they ask about pricing seriously, mention a timeline, say "we need this", or have asked 3+ questions about a single area.
3. When you do suggest a call, say it naturally: "Sounds like the next step would be a 30-minute discovery call — you can book one on the Start page."
4. Never fabricate. If asked about specific case studies you don't know — say so honestly: "I don't have specifics on past clients in chat. The Our Work page has the public ones."
5. Never quote made-up prices.
6. If asked about Hudson, the team, or the company story, point to the About page after a brief honest answer.
7. If asked something off-topic, politely redirect to NEXT topics.
8. End responses with a soft question when appropriate.

# Site pages
Home (/), What We Do (/what-we-do), Who We Serve (/who-we-serve), Our Work (/our-work), Training (/training), Insights (/insights), About (/about), Start (/start).

You are NEXT's first impression with thousands of visitors. Be the agent every visitor wishes they had on every other website.`;

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

    if (!env.AI) {
      return jsonError('Workers AI binding missing — set [ai] in wrangler.toml', 500, origin);
    }

    // Workers AI expects [{role:'system'|'user'|'assistant', content:'...'}, ...]
    const llamaMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    let aiStream;
    try {
      aiStream = await env.AI.run(MODEL, {
        messages: llamaMessages,
        stream: true,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
      });
    } catch (err) {
      return jsonError('AI run failed: ' + (err.message || String(err)), 502, origin);
    }

    // env.AI.run returns a ReadableStream with SSE-style chunks of
    //   data: {"response":"hello"}
    //   data: {"response":" world"}
    //   data: [DONE]
    // We translate it into Anthropic-compatible SSE so the frontend parser
    // (which expects content_block_delta) doesn't have to change.
    const translated = translateToAnthropicSSE(aiStream);

    return new Response(translated, {
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

/**
 * Convert Workers-AI SSE format → Anthropic-compatible SSE.
 * Frontend already parses `content_block_delta` events so we emit those.
 */
function translateToAnthropicSSE(aiStream) {
  const reader = aiStream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = '';
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events separated by \n\n
          const events = buffer.split('\n\n');
          buffer = events.pop();

          for (const ev of events) {
            const dataLine = ev.split('\n').find((ln) => ln.startsWith('data: '));
            if (!dataLine) continue;
            const raw = dataLine.slice(6).trim();
            if (!raw || raw === '[DONE]') continue;
            try {
              const obj = JSON.parse(raw);
              // Workers-AI gives { response: "...text..." } per chunk
              const text = obj.response || '';
              if (!text) continue;
              // Emit Anthropic-compatible content_block_delta event
              const payload = JSON.stringify({
                type: 'content_block_delta',
                delta: { type: 'text_delta', text },
              });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            } catch (e) {
              // skip malformed chunk
            }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}

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
