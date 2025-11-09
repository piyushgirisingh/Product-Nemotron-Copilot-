# How to Run This Project

This is a full-stack application with a React frontend and Node.js/Express backend.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- NVIDIA Nemotron API key (get from https://build.nvidia.com/)
- Slack Webhook URL (optional, for Slack integration)

## Quick Start

### Step 1: Install Frontend Dependencies

```bash
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env
```

Add the following to `backend/.env`:

```env
NEMOTRON_API_KEY=your_nemotron_api_key_here
NEMOTRON_API_URL=https://integrate.api.nvidia.com/v1
NEMOTRON_MODEL=nvidia/nemotron-nano-12b-v2-vl
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
PORT=5002
```

**To get your API keys:**
- **NVIDIA Nemotron API Key**: Visit https://build.nvidia.com/, sign up, and get your API key
- **Slack Webhook URL** (optional): Visit https://api.slack.com/messaging/webhooks and create an incoming webhook

### Step 4: Run the Backend Server

In one terminal window:

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5002`

You can verify it's running by visiting: http://localhost:5002/health

### Step 5: Run the Frontend

In a **separate** terminal window (keep the backend running):

```bash
# From the project root directory
npm run dev
```

The frontend will start on `http://localhost:3000` and should automatically open in your browser.

## Project Structure

```
Product-Nemotron-Copilot-/
├── backend/              # Express backend server
│   ├── routes/          # API route handlers
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env            # Backend environment variables (create this)
├── src/                 # React frontend
│   ├── components/     # React components
│   ├── api/            # API client functions
│   └── config/         # Configuration files
├── package.json        # Frontend dependencies
└── vite.config.ts     # Vite configuration
```

## Available Scripts

### Frontend (from project root)
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production

### Backend (from backend/ directory)
- `npm run dev` - Start development server with auto-reload (port 5002)
- `npm start` - Start production server (port 5002)

## API Endpoints

The backend provides these endpoints:

- `GET /health` - Health check
- `POST /api/generate-lifecycle` - Generate product lifecycle plan
- `POST /api/generate-status` - Generate status report
- `POST /api/send-slack` - Send updates to Slack

## Troubleshooting

### Backend won't start
- Make sure port 5002 is not already in use
- Verify `.env` file exists in `backend/` directory
- Check that all dependencies are installed: `cd backend && npm install`

### Frontend can't connect to backend
- Make sure backend is running on port 5002
- Check that you can access http://localhost:5002/health
- Verify the proxy configuration in `vite.config.ts`

### API errors
- Verify your `NEMOTRON_API_KEY` is correct in `backend/.env`
- Check the backend console for detailed error messages
- Make sure your API key has proper permissions

### Port already in use
- Backend uses port 5002 (change in `backend/.env` if needed)
- Frontend uses port 3000 (change in `vite.config.ts` if needed)

## Development Notes

- The frontend uses a proxy to forward `/api/*` requests to the backend
- Both servers need to run simultaneously
- The backend must be running before the frontend can make API calls
- Hot reload is enabled for both frontend and backend in development mode

