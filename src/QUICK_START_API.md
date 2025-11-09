# Quick Start: API Setup

> Get your Lifecycle Copilot running with real AI in 5 minutes

---

## Step 1: Get Your NVIDIA Nemotron API Key

1. **Visit** [NVIDIA Build](https://build.nvidia.com/nvidia/nemotron-4-340b-instruct)

2. **Sign up** or log in with your NVIDIA account

3. **Get API Key**:
   - Click "Get API Key" button
   - Copy your API key (starts with `nvapi-...`)

4. **Keep it safe** - You'll paste this in the next step

---

## Step 2: Paste Your API Key

1. **Open** `/config/api-keys.ts` (or copy from `api-keys.example.ts` if needed)

2. **Find this line**:
   ```typescript
   NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE',
   ```

3. **Replace** with your actual key:
   ```typescript
   NEMOTRON_API_KEY: 'nvapi-YOUR-ACTUAL-KEY-HERE',
   ```

4. **Save** the file

---

## Step 3: Test It Out

1. **Refresh** your browser

2. **Fill out** the product form:
   - Product Name: "My Test Product"
   - Description: "A tool to help users..."
   - Target Users: "Product Managers"
   - Timeline: "6 months"

3. **Click** "Generate Lifecycle Plan"

4. **Wait** 5-10 seconds for AI to generate your plan

5. **Success!** 🎉 You should see:
   - 6 lifecycle phases
   - 15+ tasks
   - Risks & KPIs
   - AI-generated content

---

## Step 4: Enable Slack (Optional)

If you want to send updates to Slack:

### A. Create Slack Webhook

1. **Visit** [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

2. **Click** "Create your Slack app"

3. **Follow steps**:
   - Name your app: "Lifecycle Copilot"
   - Choose your workspace
   - Enable Incoming Webhooks
   - Add New Webhook to Workspace
   - Choose a channel
   - Copy the webhook URL

### B. Add Webhook to Config

1. **Open** `/config/api-keys.ts`

2. **Find this line**:
   ```typescript
   SLACK_WEBHOOK_URL: 'PASTE_YOUR_SLACK_WEBHOOK_URL_HERE',
   ```

3. **Replace** with your webhook:
   ```typescript
   SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
   ```

4. **Save** the file

5. **Test** by clicking "Send to Slack" in the app

---

## Troubleshooting

### "Invalid API key" Error

**Problem:** API key not recognized

**Solutions:**
- ✅ Check you copied the full key (starts with `nvapi-`)
- ✅ Make sure no extra spaces before/after the key
- ✅ Verify the key is still active in your NVIDIA account
- ✅ Try generating a new API key

### "Failed to generate" Error

**Problem:** API call failed

**Solutions:**
- ✅ Check your internet connection
- ✅ Verify the API key is valid
- ✅ Check browser console for detailed error messages
- ✅ Make sure you're not hitting rate limits

### Slack Not Working

**Problem:** Message not appearing in Slack

**Solutions:**
- ✅ Verify webhook URL is correct
- ✅ Check the URL starts with `https://hooks.slack.com/`
- ✅ Make sure the webhook is still active
- ✅ Try sending a test message from Slack's webhook page

---

## API Limits

### NVIDIA Nemotron (Free Tier)
- **Rate Limit:** ~15 requests per minute
- **Token Limit:** 2048 tokens per request
- **Cost:** FREE during beta

### Slack Webhooks
- **Rate Limit:** 1 message per second
- **Cost:** FREE

---

## Security Best Practices

### ⚠️ IMPORTANT

**DO NOT:**
- ❌ Commit `/config/api-keys.ts` with real keys to GitHub
- ❌ Share your API keys publicly
- ❌ Use the same key across multiple apps

**DO:**
- ✅ Keep API keys private
- ✅ Rotate keys periodically
- ✅ Use environment variables in production
- ✅ Add `/config/api-keys.ts` to `.gitignore`

### For Production Deployment

Instead of hardcoding keys, use environment variables:

```typescript
// config/api-keys.ts (production version)
export const API_CONFIG = {
  NEMOTRON_API_KEY: process.env.NEXT_PUBLIC_NEMOTRON_API_KEY || '',
  NEMOTRON_API_URL: process.env.NEXT_PUBLIC_NEMOTRON_API_URL || 'https://integrate.api.nvidia.com/v1',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  // ... rest of config
};
```

Then set environment variables in your deployment platform (Vercel, Netlify, etc.)

---

## What's Happening Behind the Scenes?

### Generate Lifecycle Plan

1. Your product info is sent to NVIDIA Nemotron AI
2. AI analyzes the description and generates:
   - 6 lifecycle phases (Discovery → Post-launch)
   - 15-20 specific tasks with priorities
   - 5-7 key risks to watch
   - 5-7 KPIs to track
3. Response is parsed and displayed in the dashboard

### Generate Status Summary

1. Current progress data is sent to Nemotron AI
2. AI creates:
   - Executive status summary (2-3 sentences)
   - 4 specific next steps
   - 5-item launch checklist with status
3. Formatted for stakeholder communication

### Send to Slack

1. Status data is formatted as Slack Block Kit message
2. Sent to your webhook URL
3. Appears in your chosen Slack channel
4. Includes progress, summary, next steps, and checklist

---

## API Response Times

- **Generate Lifecycle:** 5-10 seconds (AI processing)
- **Generate Status:** 3-5 seconds (shorter prompt)
- **Send to Slack:** <1 second (webhook POST)

---

## Need Help?

1. **Check** browser console (F12) for detailed error messages
2. **Review** `/API_INTEGRATION.md` for API documentation
3. **Test** your API key directly at [NVIDIA Build](https://build.nvidia.com/)
4. **Verify** Slack webhook with a curl test:
   ```bash
   curl -X POST -H 'Content-type: application/json' \
   --data '{"text":"Test from Lifecycle Copilot"}' \
   YOUR_WEBHOOK_URL
   ```

---

## Next Steps

✅ **You're all set!** Your Lifecycle Copilot is now powered by real AI.

**Try These:**
- Generate multiple product plans to see AI variety
- Update task statuses and regenerate status summaries
- Send updates to Slack to notify your team
- Customize the AI prompts in `/api/` files for your specific needs

**Want More?**
- Read the full [User Guide](/USER_GUIDE.md)
- Review [API Integration docs](/API_INTEGRATION.md)
- Check out [Deployment Guide](/DEPLOYMENT_GUIDE.md)

---

*Happy product planning! 🚀*
