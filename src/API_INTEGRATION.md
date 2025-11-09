# API Integration Guide

This document explains how the Lifecycle Copilot app integrates with backend APIs.

## Current Implementation

The app is **production-ready** and uses **real NVIDIA Nemotron AI** for lifecycle generation and status reports. Simply paste your API key in `/config/api-keys.ts` to enable all features.

**Quick Setup:** See [QUICK_START_API.md](./QUICK_START_API.md) for 5-minute setup guide.

## API Endpoints

### 1. Generate Lifecycle Plan

**Endpoint:** `POST /api/generate-lifecycle`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "targetUsers": "Target user groups",
  "timeline": "6"
}
```

**Response:**
```json
{
  "phases": [
    {
      "name": "Discovery",
      "description": "Research market & validate problem",
      "status": "active"
    }
  ],
  "tasks": [
    {
      "id": "1",
      "phase": "Discovery",
      "task": "Market research & competitor analysis",
      "priority": "P0",
      "status": "Not started"
    }
  ],
  "risks": ["Risk item 1", "Risk item 2"],
  "kpis": ["KPI 1", "KPI 2"]
}
```

### 2. Generate Status Report

**Endpoint:** `POST /api/generate-status`

**Request Body:**
```json
{
  "lifecycleData": { /* full lifecycle data */ },
  "productInput": { /* product input */ }
}
```

**Response:**
```json
{
  "statusSummary": "Detailed status summary text...",
  "nextSteps": ["Step 1", "Step 2"],
  "launchChecklist": [
    {
      "item": "Checklist item",
      "status": "complete" | "in-progress" | "pending"
    }
  ]
}
```

### 3. Send to Slack

**Endpoint:** `POST /api/send-slack`

**Request Body:**
```json
{
  "productName": "Product Name",
  "statusSummary": "Status text",
  "progress": 50,
  "doneTasks": 9,
  "totalTasks": 18,
  "nextSteps": ["Step 1", "Step 2"],
  "launchChecklist": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sent to Slack"
}
```

## Integrating Real APIs

To connect to real backend APIs:

### Option 1: Next.js API Routes

1. Keep the files in `/api/` directory
2. Update the implementations to call your AI service (Nemotron, GPT, etc.)
3. Add environment variables for API keys:

```bash
# .env.local
NEMOTRON_API_KEY=your_api_key_here
SLACK_WEBHOOK_URL=your_webhook_url_here
```

4. Update `/lib/api-client.ts` to use real fetch calls:

```typescript
export const api = {
  async generateLifecycle(input: ProductInput): Promise<LifecycleData> {
    const res = await fetch('/api/generate-lifecycle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!res.ok) throw new Error('Failed to generate lifecycle plan');
    return await res.json();
  },
  // ... etc
};
```

### Option 2: External Backend

1. Update `/lib/api-client.ts` to point to your backend URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com';

export const api = {
  async generateLifecycle(input: ProductInput): Promise<LifecycleData> {
    const res = await fetch(`${API_BASE_URL}/generate-lifecycle`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      body: JSON.stringify(input),
    });
    
    if (!res.ok) throw new Error('Failed to generate lifecycle plan');
    return await res.json();
  },
  // ... etc
};
```

2. Add CORS headers to your backend
3. Set environment variables

## Testing

The current mock implementation allows you to:

- Test all UI flows without backend dependencies
- Demo the app with realistic data
- Develop frontend features independently
- Prototype API contracts before backend is ready

## State Management

All state is managed in React:

- `productInput` - User's product information
- `lifecycleData` - Generated lifecycle plan with phases and tasks
- `reportData` - Generated status report and checklist
- Loading states for each API call
- Error states with user-friendly messages

All buttons are fully functional and trigger real state changes.
