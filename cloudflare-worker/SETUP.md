# NEXT AI — Deploy The Chat Backend

This folder contains the Cloudflare Worker that powers the NEXT AI chat widget on nextafrica.ai. The worker holds your Anthropic API key server-side (never in browser code) and proxies chat requests to Claude.

## Why a Worker?

Putting an Anthropic API key directly in browser JavaScript = anyone can steal it from DevTools and burn through your credit. The Worker is a tiny serverless function that holds the key safely. The browser talks to your Worker; the Worker talks to Claude.

## What You Need

- **GitHub account** ✓ (you have it)
- **Anthropic API key** — 5-minute signup at console.anthropic.com
- **Cloudflare account (free)** — 5-minute signup at dash.cloudflare.com

Total cost: free tier covers the first ~100,000 chat requests per day. Anthropic charges per token used (~$0.001-0.005 per typical reply).

## Step 1 — Get an Anthropic API Key

1. Open **https://console.anthropic.com/**
2. Sign up with your email (or sign in if you already have an account).
3. Add a payment method (required to generate keys, but you only pay for what you use).
4. Add at least $5 in credit (one-time deposit, lasts thousands of conversations).
5. Click **API Keys** in the left sidebar → **Create Key**.
6. Name it `next-ai-website` and click Create.
7. **Copy the key** (starts with `sk-ant-...`). You won't see it again. Paste it somewhere safe for the next step.

## Step 2 — Create Cloudflare Account

1. Open **https://dash.cloudflare.com/sign-up**
2. Sign up with your email. Verify it.
3. You'll land on the dashboard. No need to add a website here — we're only using Workers.

## Step 3 — Install Wrangler (Cloudflare's CLI)

In PowerShell:

```
npm install -g wrangler
```

If npm is missing, install Node first from **https://nodejs.org/** (LTS version, click through defaults).

Verify:
```
wrangler --version
```
Should print something like `4.x.x`.

## Step 4 — Login Wrangler To Your Cloudflare Account

```
wrangler login
```

A browser window opens → click **Allow** to authorise wrangler. Return to PowerShell. You're signed in.

## Step 5 — Set Your Anthropic API Key As A Secret

`cd` into this folder first:

```
cd "C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website\cloudflare-worker"
```

Now set the secret:

```
wrangler secret put ANTHROPIC_API_KEY
```

It prompts: "Enter a secret value:" — paste your Anthropic key and press Enter. Wrangler encrypts and stores it on Cloudflare's side. It's never written to disk locally.

## Step 6 — Deploy The Worker

```
wrangler deploy
```

Output looks like:
```
Uploaded nextafrica-ai-chat (1.5 sec)
Published nextafrica-ai-chat
  https://nextafrica-ai-chat.<your-subdomain>.workers.dev
Current Version ID: abc-123-def
```

**Copy that URL** (the `.workers.dev` one). That's your chat backend.

## Step 7 — Tell The Website Where The Worker Lives

Open `C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website\src\chrome.jsx` in Notepad or VS Code.

Find this line (near the top of the file):

```js
const NEXT_AI_ENDPOINT = '';   // set to your Cloudflare Worker URL after deploying
```

Replace the empty string with your Worker URL:

```js
const NEXT_AI_ENDPOINT = 'https://nextafrica-ai-chat.<your-subdomain>.workers.dev';
```

Save the file.

## Step 8 — Rebuild HTML + Push

In PowerShell, from the website root:

```
cd "C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website"
python3 build.py
git add .
git commit -m "Wire NEXT AI chat to live Cloudflare Worker"
git push
```

Hostinger auto-pulls. Within 60 seconds the chat widget is live.

## Step 9 — Test It

1. Open `https://nextafrica.ai` in Incognito.
2. Click the green **"Chat with NEXT AI"** button (bottom-right).
3. Type "Hi" or click one of the suggestion chips.
4. You should see a real Claude response stream in character-by-character within ~1 second.

If you see "Sorry, I'm having trouble connecting…" → check:
- Did the secret save? `wrangler secret list` should show ANTHROPIC_API_KEY.
- Did Anthropic accept payment? Check console.anthropic.com → Billing.
- Is the Worker URL correct in chrome.jsx?

## Updating The System Prompt Later

The personality + knowledge that NEXT AI has lives in `worker.js` (search for `SYSTEM_PROMPT`). Edit that string anytime — add new services, change pricing, refine tone — then redeploy:

```
wrangler deploy
```

That's a 30-second update. The website doesn't need to change.

## Monitoring

Cloudflare dashboard → Workers → nextafrica-ai-chat → Logs tab shows every request and response live. Errors show up there too.

Anthropic console shows token usage and cost per conversation.

## Cost Estimate

Typical chat exchange: ~500 input tokens + ~200 output tokens = ~$0.002 (Claude Sonnet 4.6 pricing).
- 100 conversations/day → ~$0.20/day → ~$6/month
- 1,000 conversations/day → ~$2/day → ~$60/month

Cloudflare Worker: **free** up to 100,000 requests/day.

## If You Want To Use Your Own Domain

Optionally, point `chat.nextafrica.ai` at the Worker so the URL looks branded:

1. In Cloudflare dashboard → Workers & Pages → your worker → Triggers → Custom Domains.
2. Add `chat.nextafrica.ai` (you'll need to add nextafrica.ai as a site in Cloudflare first).
3. Update `NEXT_AI_ENDPOINT` in chrome.jsx to the new URL.

This is purely cosmetic — the `.workers.dev` URL works identically.
