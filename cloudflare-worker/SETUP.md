# NEXT AI — Deploy The Chat Backend (FREE)

This folder contains the Cloudflare Worker that powers the NEXT AI chat widget on nextafrica.ai. It uses **Cloudflare Workers AI** (Llama 3.3 70B) — no external API key, no payment, generous free tier.

## What You Need

- **A Cloudflare account (free)** — sign up at dash.cloudflare.com
- **Node.js installed locally** — for running wrangler. Get it from nodejs.org if missing.

Total time: ~5 minutes.

## Step 1 — Create Cloudflare Account

1. Open **https://dash.cloudflare.com/sign-up**
2. Sign up with your email. Verify it.
3. You'll land on the dashboard. No need to add a website here.

## Step 2 — Install Wrangler (Cloudflare's CLI)

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

## Step 3 — Login Wrangler To Your Cloudflare Account

```
wrangler login
```

A browser window opens → click **Allow** to authorise wrangler. Return to PowerShell. You're signed in.

## Step 4 — Deploy The Worker

`cd` into this folder:

```
cd "C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website\cloudflare-worker"
```

Deploy:

```
wrangler deploy
```

Output:
```
Uploaded nextafrica-ai-chat (1.5 sec)
Published nextafrica-ai-chat
  https://nextafrica-ai-chat.<your-subdomain>.workers.dev
Current Version ID: abc-123-def
```

**Copy that URL** (the `.workers.dev` one). That's your chat backend.

## Step 5 — Tell The Website Where The Worker Lives

Open `C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website\src\chrome.jsx` in Notepad / VS Code.

Find this line near the top:

```js
const NEXT_AI_ENDPOINT = '';
```

Replace with your Worker URL:

```js
const NEXT_AI_ENDPOINT = 'https://nextafrica-ai-chat.<your-subdomain>.workers.dev';
```

Save.

## Step 6 — Rebuild + Push

```
cd "C:\Users\LIZ\Downloads\NEXT_OS (2)\next-ai-website"
python3 build.py
git add .
git commit -m "Wire NEXT AI chat to live Cloudflare Worker"
git push
```

Hostinger auto-pulls. Within 60 seconds the live chat is wired.

## Cost

**Free.**

- Cloudflare Workers — first 100,000 requests/day free
- Workers AI — 10,000 neurons/day free (one neuron ≈ a few seconds of small-model inference; a typical chat reply uses 5-50 neurons)

Practical: ~200 to 2,000 conversations per day stay free. If you blow past that, Cloudflare bills $5/month + ~$0.011 per neuron — still cheap.

## Updating The System Prompt Later

`worker.js` has a long `SYSTEM_PROMPT` constant. Edit it → save → `wrangler deploy` → live in 30 seconds. The website doesn't need to change.

## Upgrading To Claude Later (Optional)

If Llama's quality isn't enough for production, swap to Anthropic Claude:

1. Sign up at console.anthropic.com, add $5 credit, generate API key.
2. Run `wrangler secret put ANTHROPIC_API_KEY` → paste the key.
3. Replace the `env.AI.run(...)` block in `worker.js` with a `fetch('https://api.anthropic.com/v1/messages', ...)` call.
4. Redeploy.

The frontend stays identical — same streaming format, same chat UI.

## If Something Breaks

- **"Workers AI binding missing"** — your wrangler.toml is missing the `[ai]` block. Already set in the version we ship, but if you edited it: ensure `[ai]\nbinding = "AI"` is present.
- **CORS errors** — your Worker URL is not in the ALLOWED_ORIGINS list at the top of worker.js. Add it and redeploy.
- **No reply** — Cloudflare dashboard → Workers → nextafrica-ai-chat → Logs tab shows live errors.
