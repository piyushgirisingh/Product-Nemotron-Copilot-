# 🔑 API Keys Setup Guide

This guide will help you configure real API integrations for Lifecycle Copilot.

---

## Quick Setup (3 minutes)

### Step 1: Open the Configuration File

Open `/config.ts` in your editor.

### Step 2: Add Your NVIDIA Nemotron API Key

```typescript
NEMOTRON_API_KEY: 'nvapi-xxxxxxxxxxxxxxxxxxxxx',
```

**How to get your key:**

1. Go to [https://build.nvidia.com/](https://build.nvidia.com/)
2. Sign up or log in
3. Navigate to the API Keys section
4. Click "Generate API Key"
5. Copy the key (starts with `nvapi-`)
6. Paste it in `config.ts`

### Step 3: Add Your Slack Webhook URL (Optional)

```typescript
SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX',
```

**How to get your webhook:**

1. Go to [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
2. Click "Create your Slack app"
3. Choose "From scratch"
4. Name your app "Lifecycle Copilot"
5. Select your workspace
6. Click "Incoming Webhooks" in the sidebar
7. Toggle "Activate Incoming Webhooks" to On
8. Click "Add New Webhook to Workspace"
9. Select the channel to post to
10. Copy the webhook URL
11. Paste it in `config.ts`

### Step 4: Save and Restart

Save `config.ts` and reload the application. You're done! 🎉

---

## Verification

When you restart the app, check the console for:

```
🔧 Configuration Status:
  Nemotron API: ✓ Configured
  Slack Webhook: ✓ Configured
```

If you see `✗ Not configured`, double-check your API keys.

---

## Testing Your Configuration

### Test Nemotron AI Generation

1. Fill out the product form:
   - **Product Name:** "Test Product"
   - **Description:** "A simple test"
   - **Target Users:** "Everyone"
   - **Timeline:** "6 months"

2. Click "Generate Lifecycle Plan"

3. Wait 5-15 seconds for the AI to respond

4. **Success:** You'll see phases, tasks, risks, and KPIs
   **Error:** Check the error message and your API key

### Test Slack Integration

1. After generating a lifecycle plan
2. Click "Generate Status & GTM Summary"
3. Wait for the status report to generate
4. Click "Send to Slack"
5. Check your Slack channel for the message

---

## Configuration Options

### AI Temperature (Optional)

Controls creativity vs. consistency:

```typescript
AI_TEMPERATURE: 0.7,  // Default: 0.7
```

- **0.3-0.5:** More focused, consistent responses
- **0.7-0.9:** More creative, varied responses
- **1.0:** Maximum creativity (may be unpredictable)

### Max Tokens (Optional)

Controls response length:

```typescript
AI_MAX_TOKENS: 2000,  // Default: 2000
```

- **1000-1500:** Shorter, more concise plans
- **2000-3000:** Detailed, comprehensive plans
- **3000+:** Very detailed (slower, more expensive)

---

## Troubleshooting

### ❌ "Nemotron API key not configured"

**Solution:** Make sure you've replaced `YOUR_NEMOTRON_API_KEY_HERE` with your actual API key in `/config.ts`.

### ❌ "Nemotron API error: 401"

**Solution:** Your API key is invalid. Generate a new one from [build.nvidia.com](https://build.nvidia.com/).

### ❌ "Nemotron API error: 429"

**Solution:** You've hit the rate limit. Wait a few minutes or upgrade your NVIDIA API plan.

### ❌ "Failed to parse lifecycle data from AI response"

**Solution:** The AI returned an unexpected format. Try again or adjust the temperature lower (0.5).

### ❌ "Slack webhook not configured"

**Solution:** Replace `YOUR_SLACK_WEBHOOK_URL_HERE` with your actual webhook URL in `/config.ts`.

### ❌ "Slack API error: 404"

**Solution:** Your webhook URL is invalid. Create a new webhook from Slack.

---

## Security Best Practices

### ⚠️ Important Security Notes

1. **Never commit `config.ts` to public repositories**
   - Add it to `.gitignore`
   - Use environment variables in production

2. **Keep your API keys secret**
   - Don't share them with anyone
   - Rotate them periodically
   - Use separate keys for dev/production

3. **Monitor usage**
   - Check your NVIDIA API dashboard for usage
   - Set up billing alerts
   - Monitor Slack webhook logs

### Production Setup (Recommended)

For production deployments, use environment variables instead:

1. Create a `.env.local` file:

```bash
NEMOTRON_API_KEY=your_key_here
SLACK_WEBHOOK_URL=your_webhook_here
```

2. Update `config.ts` to read from environment:

```typescript
export const config = {
  NEMOTRON_API_KEY: process.env.NEMOTRON_API_KEY || 'YOUR_NEMOTRON_API_KEY_HERE',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || 'YOUR_SLACK_WEBHOOK_URL_HERE',
  // ... rest of config
};
```

3. Add `.env.local` to `.gitignore`

---

## Cost Estimates

### NVIDIA Nemotron API

- **Free Tier:** 1,000 requests/month
- **Paid:** ~$0.001-0.003 per request
- **Typical usage:** 2 requests per lifecycle plan
- **Monthly cost (100 plans):** ~$0.20-0.60

### Slack

- **Free:** Unlimited webhook messages
- **No cost** for this integration

---

## API Limits

### NVIDIA Nemotron

- **Rate limit:** 60 requests/minute (free tier)
- **Request timeout:** 30 seconds
- **Max tokens:** 4096 (response)

### Slack Webhooks

- **Rate limit:** 1 message/second per webhook
- **No daily limit**

---

## Alternative: Keep Using Mocks

If you prefer to keep using mock data for development:

1. Don't modify `config.ts`
2. The app will show error messages prompting for API keys
3. Mock mode is perfect for UI development and testing

---

## Need Help?

- **NVIDIA API Docs:** [https://docs.api.nvidia.com/](https://docs.api.nvidia.com/)
- **Slack API Docs:** [https://api.slack.com/](https://api.slack.com/)
- **Issues:** Check the error messages in the browser console

---

## Quick Reference

| Service | Config Key | Where to Get |
|---------|-----------|--------------|
| NVIDIA Nemotron | `NEMOTRON_API_KEY` | [build.nvidia.com](https://build.nvidia.com/) |
| Slack | `SLACK_WEBHOOK_URL` | [api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks) |

---

**That's it!** You're ready to use real AI-powered lifecycle planning. 🚀
