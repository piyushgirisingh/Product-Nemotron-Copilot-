# Lifecycle Copilot Backend

Express backend server for Lifecycle Copilot, integrating with NVIDIA Nemotron nano model for AI-powered product lifecycle management.

## Features

- 🚀 Generate product lifecycle plans using Nemotron nano model
- 📊 Generate status reports and GTM summaries
- 📱 Send updates to Slack via webhooks
- 🔒 Secure API key management with environment variables
- 🌐 CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
NEMOTRON_API_KEY=your_nemotron_api_key_here
NEMOTRON_API_URL=https://integrate.api.nvidia.com/v1
NEMOTRON_MODEL=nvidia/nemotron-nano-12b-v2-vl
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
PORT=5002
```

### 3. Get API Keys

#### NVIDIA Nemotron API Key
1. Visit: https://build.nvidia.com/
2. Sign up and get your API key
3. Paste it in `.env` as `NEMOTRON_API_KEY`

#### Slack Webhook (Optional)
1. Visit: https://api.slack.com/messaging/webhooks
2. Create an incoming webhook for your workspace
3. Paste the webhook URL in `.env` as `SLACK_WEBHOOK_URL`

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5002` (or the port specified in `.env`).

## API Endpoints

### 1. Generate Lifecycle Plan

**POST** `/api/generate-lifecycle`

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
      "description": "brief description",
      "status": "active"
    }
  ],
  "tasks": [
    {
      "id": "1",
      "phase": "Discovery",
      "task": "task description",
      "priority": "P0",
      "status": "Not started"
    }
  ],
  "risks": ["risk description 1"],
  "kpis": ["KPI description 1"]
}
```

### 2. Generate Status Report

**POST** `/api/generate-status`

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
      "status": "complete"
    }
  ]
}
```

### 3. Send to Slack

**POST** `/api/send-slack`

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

## Health Check

**GET** `/health`

Returns server status:
```json
{
  "status": "ok",
  "message": "Lifecycle Copilot Backend is running"
}
```

## Integration with Frontend

Update the frontend API client (`src/lib/api-client.ts`) to point to the backend:

```typescript
const API_BASE_URL = 'http://localhost:5002';

export const api = {
  async generateLifecycle(input: ProductInput): Promise<LifecycleData> {
    const res = await fetch(`${API_BASE_URL}/api/generate-lifecycle`, {
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

## Error Handling

The backend includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- API errors (500)
- Slack webhook errors (404, 400)

All errors return JSON responses with descriptive error messages.

## Model Configuration

The backend uses the Nemotron nano model (`nvidia/nemotron-nano-12b-v2-vl`) by default. You can change this in the `.env` file:

```env
NEMOTRON_MODEL=nvidia/nemotron-nano-12b-v2-vl
```

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- In production, use a proper secret management system
- Enable HTTPS in production
- Consider adding rate limiting for production use

