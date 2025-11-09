# Deployment Guide - Lifecycle Copilot

## Overview

This app is built with React, TypeScript, and Tailwind CSS. It's designed to work as a single-page application with API integration points.

## Architecture

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   API Client    │  (/lib/api-client.ts)
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────┐
│   Mock APIs (Development)       │  (/api/*.ts)
│   OR                             │
│   Real APIs (Production)        │
│   - Nemotron AI for generation  │
│   - Slack webhook for export    │
└─────────────────────────────────┘
```

## Features & Interactions

### ✅ Fully Functional UI

All buttons and interactions are fully wired:

1. **Generate Lifecycle Plan** 
   - Validates required fields (name, description)
   - Shows inline errors for missing data
   - Displays loading state with spinner
   - Calls `/api/generate-lifecycle`
   - Renders lifecycle data on success

2. **Task Status Updates**
   - Each task has a working dropdown
   - Updates React state immediately
   - Recalculates progress bar in real-time
   - No page refresh needed

3. **Generate Status & GTM Summary**
   - Only enabled after lifecycle is generated
   - Shows loading state during generation
   - Calls `/api/generate-status`
   - Displays formatted status report

4. **Send to Slack**
   - Only enabled after status is generated
   - Shows loading state while sending
   - Calls `/api/send-slack`
   - Shows success/error toast notification

## State Management

All state is managed in React (`/App.tsx`):

```typescript
// Input state
const [productInput, setProductInput] = useState<ProductInput>({...})

// Generated data
const [lifecycleData, setLifecycleData] = useState<LifecycleData | null>(null)
const [reportData, setReportData] = useState<ReportData | null>(null)

// Loading states
const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
const [isGeneratingStatus, setIsGeneratingStatus] = useState(false)
const [isSendingSlack, setIsSendingSlack] = useState(false)

// Error handling
const [planError, setPlanError] = useState<string | null>(null)
const [statusError, setStatusError] = useState<string | null>(null)
```

## Current Setup (Development/Demo)

The app currently uses **mock APIs** that:
- Simulate 1-2 second delays
- Return realistic sample data
- Work entirely in the browser
- Don't require backend setup

Perfect for:
- Development
- Prototyping
- Demos
- UI testing

## Production Deployment Options

### Option 1: Next.js (Recommended)

Deploy as a Next.js app with API routes:

1. **Convert to Next.js:**
   ```bash
   npx create-next-app@latest lifecycle-copilot
   # Copy all components and files
   # Move /api/* to /pages/api/* or /app/api/*
   ```

2. **Environment Variables:**
   ```bash
   # .env.local
   NEMOTRON_API_KEY=your_key_here
   NEMOTRON_API_URL=https://api.nvidia.com/v1/
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   ```

3. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

### Option 2: Separate Backend

1. **Frontend:** Deploy React app to Netlify/Vercel
2. **Backend:** Deploy API to your own server/cloud
3. **Update API client** to point to backend URL

### Option 3: Supabase Edge Functions

1. Use Supabase Edge Functions for API routes
2. Store lifecycle data in Supabase database
3. Use Supabase Auth for user management

## Integrating Real AI (Nemotron)

Update `/api/generate-lifecycle.ts`:

```typescript
export default async function handler(req, res) {
  const { name, description, targetUsers, timeline } = req.body;
  
  const response = await fetch('https://api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEMOTRON_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-4-340b-instruct',
      messages: [{
        role: 'system',
        content: 'You are a product management assistant...'
      }, {
        role: 'user',
        content: `Create a lifecycle plan for: ${name} - ${description}`
      }],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });
  
  const data = await response.json();
  // Parse AI response and format as LifecycleData
  res.json(parsedLifecycleData);
}
```

## Integrating Slack

Update `/api/send-slack.ts`:

```typescript
export default async function handler(req, res) {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  
  const slackMessage = {
    text: `📊 ${req.body.productName} - Status Update`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📊 ${req.body.productName}`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Progress:* ${req.body.progress}%`
        }
      },
      // Add more blocks for status, next steps, checklist
    ]
  };
  
  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackMessage),
  });
  
  res.json({ success: true });
}
```

## Database (Optional)

To persist data across sessions:

```typescript
// Add to lifecycle generation
await supabase.from('lifecycles').insert({
  user_id: userId,
  product_name: name,
  lifecycle_data: lifecycleData,
  created_at: new Date(),
});

// Load existing products
const { data } = await supabase
  .from('lifecycles')
  .select('*')
  .eq('user_id', userId);
```

## Testing

Run the app locally:

```bash
npm install
npm run dev
```

All functionality works without backend:
- Fill in product details
- Click "Generate Lifecycle Plan" (2s delay)
- Update task statuses and watch progress
- Click "Generate Status & GTM Summary" (1.5s delay)
- Click "Send to Slack" (1s delay)
- See toast notifications

## Security Notes

- Never commit API keys to version control
- Use environment variables for all secrets
- Validate all inputs on the backend
- Rate limit API endpoints
- Use CORS appropriately
- Consider adding authentication

## Support

For issues or questions:
1. Check the API_INTEGRATION.md file
2. Review component code comments
3. Check browser console for errors
4. Verify environment variables are set
