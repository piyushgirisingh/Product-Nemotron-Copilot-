# Example Next.js API Routes

This document shows complete, production-ready examples of how the API routes would work in a real Next.js application.

## Setup

First, install required packages:

```bash
npm install openai  # or NVIDIA SDK when available
npm install @slack/webhook
```

Add environment variables to `.env.local`:

```bash
NEMOTRON_API_KEY=your_nemotron_key
NEMOTRON_API_URL=https://api.nvidia.com/v1
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## 1. Generate Lifecycle (`/pages/api/generate-lifecycle.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

interface ProductInput {
  name: string;
  description: string;
  targetUsers: string;
  timeline: string;
}

interface LifecycleData {
  phases: Array<{
    name: string;
    description: string;
    status: 'active' | 'upcoming' | 'completed';
  }>;
  tasks: Array<{
    id: string;
    phase: string;
    task: string;
    priority: 'P0' | 'P1' | 'P2';
    status: 'Not started' | 'In progress' | 'Done';
  }>;
  risks: string[];
  kpis: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LifecycleData | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, description, targetUsers, timeline } = req.body as ProductInput;

  // Validation
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    // Call Nemotron API
    const response = await fetch(`${process.env.NEMOTRON_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEMOTRON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are a product management AI assistant. Generate a detailed product lifecycle plan in JSON format with:
- phases: Array of 6 phases (Discovery, Design, Build, Test, Launch, Post-launch) with names, descriptions, and status
- tasks: Array of 15-20 tasks distributed across phases with id, phase, task description, priority (P0/P1/P2), and status
- risks: Array of 4-6 key risks to consider
- kpis: Array of 5-6 metrics to track

Return ONLY valid JSON, no markdown or explanations.`,
          },
          {
            role: 'user',
            content: `Create a ${timeline}-month product lifecycle plan for:

Product: ${name}
Description: ${description}
Target Users: ${targetUsers || 'General users'}

Focus on practical, actionable tasks and realistic risks for this specific product.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Nemotron API error: ${response.statusText}`);
    }

    const data = await response.json();
    const lifecycleData = JSON.parse(data.choices[0].message.content) as LifecycleData;

    // Validate response structure
    if (!lifecycleData.phases || !lifecycleData.tasks) {
      throw new Error('Invalid response structure from AI');
    }

    return res.status(200).json(lifecycleData);
  } catch (error) {
    console.error('Error generating lifecycle:', error);
    return res.status(500).json({ 
      error: 'Failed to generate lifecycle plan. Please try again.' 
    });
  }
}
```

---

## 2. Generate Status (`/pages/api/generate-status.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

interface ReportData {
  statusSummary: string;
  nextSteps: string[];
  launchChecklist: Array<{
    item: string;
    status: 'complete' | 'in-progress' | 'pending';
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportData | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lifecycleData, productInput } = req.body;

  if (!lifecycleData) {
    return res.status(400).json({ error: 'Lifecycle data is required' });
  }

  try {
    // Calculate current progress
    const doneTasks = lifecycleData.tasks.filter((t: any) => t.status === 'Done').length;
    const totalTasks = lifecycleData.tasks.length;
    const progress = Math.round((doneTasks / totalTasks) * 100);

    // Call Nemotron API
    const response = await fetch(`${process.env.NEMOTRON_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEMOTRON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are a product management AI assistant. Generate a status report in JSON format with:
- statusSummary: A 2-3 paragraph executive summary of current status
- nextSteps: Array of 4-5 specific action items for the next sprint
- launchChecklist: Array of 6-8 launch readiness items with status (complete/in-progress/pending)

Write in professional PM language. Be specific and actionable. Return ONLY valid JSON.`,
          },
          {
            role: 'user',
            content: `Generate a status report for:

Product: ${productInput.name}
Progress: ${progress}% (${doneTasks}/${totalTasks} tasks complete)
Current Phase: ${lifecycleData.phases.find((p: any) => p.status === 'active')?.name || 'Discovery'}

Completed Tasks:
${lifecycleData.tasks.filter((t: any) => t.status === 'Done').map((t: any) => `- ${t.task}`).join('\n')}

In Progress:
${lifecycleData.tasks.filter((t: any) => t.status === 'In progress').map((t: any) => `- ${t.task}`).join('\n')}

Provide a realistic, data-driven status update.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Nemotron API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reportData = JSON.parse(data.choices[0].message.content) as ReportData;

    return res.status(200).json(reportData);
  } catch (error) {
    console.error('Error generating status:', error);
    return res.status(500).json({ 
      error: 'Failed to generate status report. Please try again.' 
    });
  }
}
```

---

## 3. Send to Slack (`/pages/api/send-slack.ts`)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingWebhook } from '@slack/webhook';

interface SlackPayload {
  productName: string;
  statusSummary: string;
  progress: number;
  doneTasks: number;
  totalTasks: number;
  nextSteps: string[];
  launchChecklist: Array<{
    item: string;
    status: 'complete' | 'in-progress' | 'pending';
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string } | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body as SlackPayload;

  if (!process.env.SLACK_WEBHOOK_URL) {
    return res.status(500).json({ error: 'Slack webhook URL not configured' });
  }

  try {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

    // Format checklist with emoji indicators
    const checklistFormatted = payload.launchChecklist.map(item => {
      const emoji = 
        item.status === 'complete' ? '✅' :
        item.status === 'in-progress' ? '🔄' : '⬜';
      return `${emoji} ${item.item}`;
    }).join('\n');

    // Send formatted message to Slack
    await webhook.send({
      text: `📊 Product Update: ${payload.productName}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `📊 ${payload.productName} - Lifecycle Update`,
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Progress:*\n${payload.progress}% (${payload.doneTasks}/${payload.totalTasks} tasks)`,
            },
            {
              type: 'mrkdwn',
              text: `*Generated:*\n${new Date().toLocaleDateString()}`,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Status Summary*\n${payload.statusSummary.substring(0, 500)}...`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Next Steps*\n${payload.nextSteps.map(step => `• ${step}`).join('\n')}`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Launch Checklist*\n${checklistFormatted}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: '🤖 Generated by Lifecycle Copilot | Powered by Nemotron',
            },
          ],
        },
      ],
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully sent to Slack' 
    });
  } catch (error) {
    console.error('Error sending to Slack:', error);
    return res.status(500).json({ 
      error: 'Failed to send to Slack. Please check your webhook URL.' 
    });
  }
}
```

---

## Testing the APIs

### 1. Start Next.js dev server:
```bash
npm run dev
```

### 2. Test with curl:

**Generate Lifecycle:**
```bash
curl -X POST http://localhost:3000/api/generate-lifecycle \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AI Analytics Platform",
    "description": "Real-time analytics for teams",
    "targetUsers": "Product managers, analysts",
    "timeline": "6"
  }'
```

**Generate Status:**
```bash
curl -X POST http://localhost:3000/api/generate-status \
  -H "Content-Type: application/json" \
  -d '{"lifecycleData": {...}, "productInput": {...}}'
```

**Send to Slack:**
```bash
curl -X POST http://localhost:3000/api/send-slack \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product",
    "statusSummary": "Making great progress...",
    "progress": 50,
    "doneTasks": 9,
    "totalTasks": 18,
    "nextSteps": ["Complete design", "Start development"],
    "launchChecklist": [...]
  }'
```

---

## Error Handling

All endpoints include:
- Method validation (POST only)
- Input validation
- Try-catch blocks
- Descriptive error messages
- Proper HTTP status codes
- Console logging for debugging

## Rate Limiting (Recommended)

Add rate limiting middleware:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export default limiter(handler);
```

## Monitoring

Consider adding:
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- API usage analytics
- Cost monitoring for AI API calls
