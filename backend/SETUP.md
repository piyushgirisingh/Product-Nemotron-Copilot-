# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your API keys:
```env
NEMOTRON_API_KEY=your_actual_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here  # Optional
PORT=5002
```

## Step 3: Get Your API Keys

### NVIDIA Nemotron API Key
1. Visit: https://build.nvidia.com/
2. Sign up/login
3. Get your API key from the dashboard
4. Paste it in `.env` as `NEMOTRON_API_KEY`

### Slack Webhook (Optional)
1. Visit: https://api.slack.com/messaging/webhooks
2. Create an incoming webhook
3. Copy the webhook URL
4. Paste it in `.env` as `SLACK_WEBHOOK_URL`

## Step 4: Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5002`

## Step 5: Start the Frontend

In a separate terminal:

```bash
# From the project root
npm run dev
```

The frontend will start on `http://localhost:3000` (or the port configured in vite.config.ts)

## Step 6: Test the Backend

Visit: `http://localhost:5002/health`

You should see:
```json
{
  "status": "ok",
  "message": "Lifecycle Copilot Backend is running"
}
```

## Troubleshooting

### Backend won't start
- Check that port 5002 is not already in use (port 5000 is often used by macOS AirPlay)
- Verify all dependencies are installed: `npm install`
- Check that `.env` file exists and has valid values

### API errors
- Verify your `NEMOTRON_API_KEY` is correct
- Check the API key has proper permissions
- Look at the backend console for detailed error messages

### Frontend can't connect to backend
- Verify backend is running on port 5002
- Check CORS settings (should be enabled by default)
- Verify the frontend is pointing to the correct backend URL

### Slack integration not working
- Verify `SLACK_WEBHOOK_URL` is set in `.env`
- Test the webhook URL directly with curl:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Hello from Lifecycle Copilot!"}' \
  YOUR_SLACK_WEBHOOK_URL
```

