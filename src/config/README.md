# Configuration Directory

## Files

### `api-keys.ts` 🔑
**This is where you paste your API keys**

```typescript
export const API_CONFIG = {
  NEMOTRON_API_KEY: 'PASTE_YOUR_KEY_HERE',  // ← Change this!
  // ...
};
```

- Open this file
- Replace `'PASTE_YOUR_KEY_HERE'` with your actual API key
- Save and refresh your browser

### `api-keys.example.ts`
Template file (safe to commit to Git)

- Copy this if you need to recreate `api-keys.ts`
- Share this with your team
- Never share `api-keys.ts`

### `check-config.ts`
Configuration checker script

Run to verify your setup:
```bash
npx ts-node config/check-config.ts
```

---

## Quick Setup

### 1. Get Your API Key (2 minutes)

Visit: https://build.nvidia.com/nvidia/nemotron-4-340b-instruct

1. Sign up (free)
2. Click "Get API Key"
3. Copy your key (starts with `nvapi-`)

### 2. Paste It (30 seconds)

1. Open `api-keys.ts`
2. Find `NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE'`
3. Replace with `NEMOTRON_API_KEY: 'nvapi-your-actual-key-here'`
4. Save

### 3. Done! ✅

Refresh your browser and start generating AI-powered lifecycle plans.

---

## Security

### ✅ Protected

- `api-keys.ts` is in `.gitignore`
- Will not be committed to Git
- Safe to paste real keys

### ⚠️ Important

- **Never commit** `api-keys.ts` with real keys
- **Never share** your API keys publicly
- **Do rotate** keys periodically

---

## Need Help?

📖 Full guide: [/QUICK_START_API.md](../QUICK_START_API.md)

Common issues:

**"Invalid API key"**
- Check you copied the full key
- Remove any spaces
- Verify key at https://build.nvidia.com/

**"API key not configured"**
- Make sure you edited `api-keys.ts` (not `api-keys.example.ts`)
- Save the file
- Refresh your browser

---

## Optional: Slack Integration

To enable Slack notifications:

1. Visit: https://api.slack.com/messaging/webhooks
2. Create an incoming webhook
3. Copy the webhook URL
4. Paste it in `api-keys.ts` at `SLACK_WEBHOOK_URL`

---

## Production Deployment

For production, use environment variables instead:

```typescript
// api-keys.ts (production version)
export const API_CONFIG = {
  NEMOTRON_API_KEY: process.env.NEXT_PUBLIC_NEMOTRON_API_KEY || '',
  NEMOTRON_API_URL: process.env.NEXT_PUBLIC_NEMOTRON_API_URL || 'https://integrate.api.nvidia.com/v1',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  // ...
};
```

Then set environment variables in your hosting platform (Vercel, Netlify, etc.)

---

**That's it! Simple and secure.** 🎉
