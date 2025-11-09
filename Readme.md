# 🚀 Lifecycle Copilot

> AI-powered product lifecycle management for Product Managers who ship fast


Lifecycle Copilot transforms how Product Managers plan, track, and communicate product launches. Using NVIDIA's Nemotron AI, it generates comprehensive lifecycle plans, tracks progress in real-time, and keeps your team aligned through intelligent status updates.

---

## ✨ Features

### 🤖 AI-Powered Planning
- **Intelligent Lifecycle Generation**: Describe your product, get a complete 6-phase lifecycle plan in seconds
- **Smart Task Breakdown**: AI generates 15-20 prioritized tasks across Discovery, Design, Build, Test, Launch, and Post-launch phases
- **Risk Assessment**: Automatic identification of key risks and mitigation strategies
- **KPI Recommendations**: AI suggests relevant metrics to track success

### 📊 Real-Time Progress Tracking
- **Visual Phase Progression**: Beautiful timeline showing current phase and completion status
- **Interactive Task Management**: Update task status with a click, see progress update instantly
- **Priority Management**: P0 (Critical), P1 (Important), P2 (Nice-to-have) task organization
- **Live Progress Bar**: Real-time calculation of overall project completion

### 📝 Executive Communication
- **AI Status Reports**: Generate professional stakeholder updates in seconds
- **Next Steps Generation**: AI identifies and prioritizes upcoming actions
- **Launch Checklist**: Automated readiness assessment with completion tracking
- **One-Click Slack Integration**: Send formatted updates directly to your team channel

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6.3.5 (ultra-fast HMR)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Notifications:** Sonner toasts
- **Charts:** Recharts (ready for data visualization)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18
- **HTTP Client:** Axios 1.6
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv for config management
- **Dev Tools:** Nodemon for auto-reload

### AI & Integrations
- **AI Model:** NVIDIA Nemotron (Llama 3.1 Nemotron 70B Instruct)
- **API:** NVIDIA NIM API (https://integrate.api.nvidia.com/v1)
- **Slack:** Webhook integration for team notifications
- **Architecture:** REST API with JSON responses

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **NVIDIA API Key** (free from [build.nvidia.com](https://build.nvidia.com))
- **Slack Webhook** (optional, for team notifications)

### Installation

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Product-Nemotron-Copilot--1
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### Configuration

#### Frontend Configuration

1. Open `src/config/api-keys.ts`
2. Add your NVIDIA API key:

```typescript
export const API_CONFIG = {
  NEMOTRON_API_KEY: 'nvapi-YOUR-KEY-HERE',  // ← Paste your key
  NEMOTRON_API_URL: 'https://integrate.api.nvidia.com/v1',
  SLACK_WEBHOOK_URL: 'YOUR-SLACK-WEBHOOK-URL',  // Optional
  MODEL: {
    NAME: 'nvidia/llama-3.1-nemotron-70b-instruct',
    TEMPERATURE: 0.5,
    TOP_P: 1,
    MAX_TOKENS: 1024,
    FREQUENCY_PENALTY: 0,
    PRESENCE_PENALTY: 0,
  },
};
```

#### Backend Configuration

1. Copy the environment template:
```bash
cd backend
cp .env.example .env
```

2. Edit `backend/.env`:
```env
# Required
NEMOTRON_API_KEY=nvapi-YOUR-KEY-HERE
NEMOTRON_API_URL=https://integrate.api.nvidia.com/v1
NEMOTRON_MODEL=nvidia/llama-3.1-nemotron-70b-instruct

# Optional
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Server Config
PORT=5002
```

### Running the Application

#### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
 Backend running on `http://localhost:5002`

**Terminal 2 - Frontend Server:**
```bash
# From project root
npm run dev
```
 Frontend running on `http://localhost:3000`

#### Option 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
npm run build
# Serve the /build directory
```

### 🎉 You're Ready!

Open `http://localhost:3000` in your browser and start building!

---

## 📖 How to Use

### 1. Generate a Lifecycle Plan

1. **Fill in product details:**
   - **Product Name:** "AI Fitness Tracker"
   - **Description:** "Mobile app with AI-powered workout recommendations"
   - **Target Users:** "Health-conscious millennials aged 25-35"
   - **Timeline:** "6 months"

2. **Click "Generate Lifecycle Plan"** (takes ~5-10 seconds)

3. **Review the AI-generated plan:**
   - 6 phases (Discovery → Post-launch)
   - 15-20 prioritized tasks
   - Risk assessments
   - Success metrics (KPIs)

### 2. Track Progress

- Click task dropdowns to update status: **Not started** → **In progress** → **Done**
- Progress bar updates automatically
- Phase indicators reflect completion

### 3. Generate Status Reports

1. **Click "Generate Status & GTM Summary"** (takes ~3-5 seconds)
2. **Review AI-generated content:**
   - Executive summary
   - Next 4 prioritized action items
   - Launch readiness checklist
3. **Share it:**
   - Copy to clipboard for email/docs
   - Send directly to Slack channel

---

## 🏗️ Project Structure

```
Product-Nemotron-Copilot--1/
│
├── Frontend (React + Vite)
│   ├── src/
│   │   ├── App.tsx                        # Main app with state management
│   │   ├── main.tsx                       # App entry point
│   │   ├── components/
│   │   │   ├── Navbar.tsx                # Top navigation bar
│   │   │   ├── Sidebar.tsx               # Product selector sidebar
│   │   │   ├── InputCard.tsx             # Product input form
│   │   │   ├── LifecycleOverviewCard.tsx # Phase visualization
│   │   │   ├── ExecutionPlanCard.tsx     # Task management table
│   │   │   ├── RisksMetricsCard.tsx      # Risks & KPIs display
│   │   │   ├── StatusSummaryCard.tsx     # Status reports & Slack
│   │   │   ├── ApiStatusBanner.tsx       # API connection indicator
│   │   │   └── ui/                       # Shadcn UI components
│   │   ├── lib/
│   │   │   └── api-client.ts             # API wrapper functions
│   │   ├── api/
│   │   │   ├── generate-lifecycle.ts     # Lifecycle generation logic
│   │   │   ├── generate-status.ts        # Status report logic
│   │   │   └── send-slack.ts             # Slack integration logic
│   │   ├── config/
│   │   │   ├── api-keys.ts               # 🔑 API keys configuration
│   │   │   └── api-keys.example.ts       # Template for API keys
│   │   └── styles/
│   │       └── globals.css               # Global styles
│   ├── index.html                         # HTML entry point
│   ├── vite.config.ts                     # Vite config with proxy
│   ├── package.json                       # Frontend dependencies
│   └── package-lock.json                  # Frontend lock file
│
└── Backend (Express.js)
    ├── server.js                          # Express server entry point
    ├── routes/
    │   ├── generate-lifecycle.js          # POST /api/generate-lifecycle
    │   ├── generate-status.js             # POST /api/generate-status
    │   └── send-slack.js                  # POST /api/send-slack
    ├── .env                               # 🔑 Environment variables
    ├── .env.example                       # Environment template
    ├── .gitignore                         # Backend-specific ignores
    ├── package.json                       # Backend dependencies
    └── package-lock.json                  # Backend lock file
```

---

## 🔌 API Documentation

### Base URL
- **Development:** `http://localhost:5002`
- **Production:** Your deployed backend URL

### Endpoints

#### 1. Generate Lifecycle Plan

```http
POST /api/generate-lifecycle
Content-Type: application/json

Request Body:
{
  "name": "Product Name",
  "description": "Detailed product description",
  "targetUsers": "Target user personas",
  "timeline": "6"  // months
}

Response (200 OK):
{
  "phases": [
    {
      "name": "Discovery",
      "description": "User research and market analysis",
      "status": "active"  // active | upcoming | completed
    },
    // ... 5 more phases
  ],
  "tasks": [
    {
      "id": "1",
      "phase": "Discovery",
      "task": "Conduct user interviews with 20+ target users",
      "priority": "P0",  // P0 | P1 | P2
      "status": "Not started"  // Not started | In progress | Done
    },
    // ... 15-20 more tasks
  ],
  "risks": [
    "Market competition from established players",
    "Technical complexity of AI integration",
    // ... 5-7 risks
  ],
  "kpis": [
    "Daily Active Users (DAU)",
    "User Retention Rate (30-day)",
    // ... 5-7 KPIs
  ]
}

Error Response (400/500):
{
  "error": "Error message description"
}
```

#### 2. Generate Status Report

```http
POST /api/generate-status
Content-Type: application/json

Request Body:
{
  "lifecycleData": {
    "phases": [...],
    "tasks": [...],
    "risks": [...],
    "kpis": [...]
  },
  "productInput": {
    "name": "Product Name",
    "description": "...",
    "targetUsers": "...",
    "timeline": "6"
  }
}

Response (200 OK):
{
  "statusSummary": "Detailed executive summary text...",
  "nextSteps": [
    "Complete user research by end of Q2",
    "Finalize design mockups",
    // ... 4 next steps
  ],
  "launchChecklist": [
    {
      "item": "Product-market fit validated",
      "status": "complete"  // complete | in-progress | pending
    },
    // ... 5 checklist items
  ]
}
```

#### 3. Send to Slack

```http
POST /api/send-slack
Content-Type: application/json

Request Body:
{
  "productName": "Product Name",
  "statusSummary": "Status text...",
  "progress": 50,  // 0-100
  "doneTasks": 9,
  "totalTasks": 18,
  "nextSteps": ["Step 1", "Step 2", ...],
  "launchChecklist": [
    {
      "item": "Checklist item",
      "status": "complete"
    },
    // ...
  ]
}

Response (200 OK):
{
  "success": true,
  "message": "Sent to Slack"
}

Error Response:
{
  "error": "Slack webhook not found. Please verify your webhook URL."
}
```

#### 4. Health Check

```http
GET /health

Response (200 OK):
{
  "status": "ok",
  "message": "Lifecycle Copilot Backend is running"
}
```

---

## ⚙️ Configuration Details

### Frontend Proxy Configuration

The frontend uses Vite's proxy to forward API calls to the backend:

**`vite.config.ts`:**
```typescript
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

This means:
- Frontend calls: `http://localhost:3000/api/generate-lifecycle`
- Vite forwards to: `http://localhost:5002/api/generate-lifecycle`
- No CORS issues during development!

### Backend CORS Configuration

The backend enables CORS for production deployments:

**`server.js`:**
```javascript
const cors = require('cors');
app.use(cors());  // Allows all origins
```

For production, restrict to your frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## 🎨 Design System

### Color Palette
- **Primary Gradient:** `from-blue-600 to-indigo-600` (#2563eb → #4f46e5)
- **Background:** Neutral 50 (#fafafa)
- **Cards:** White with border-neutral-200 and shadow-sm
- **Text Hierarchy:**
  - Headings: neutral-900
  - Body: neutral-700
  - Secondary: neutral-600
  - Hints: neutral-500

### Priority Badges
- **P0 Critical:** `bg-red-50 text-red-700 border-red-200`
- **P1 Important:** `bg-orange-50 text-orange-700 border-orange-200`
- **P2 Nice-to-have:** `bg-yellow-50 text-yellow-700 border-yellow-200`

### Status Indicators
- **Not started:** Gray circle
- **In progress:** Blue circle with partial fill
- **Done:** Green checkmark

### Animations
- Button transitions: 150ms
- Progress bar: 500ms ease-out
- Card hover: 300ms
- Status updates: Instant

---

## 🔐 Security & Best Practices

### API Key Management

**❌ Never commit these files with real keys:**
- `src/config/api-keys.ts`
- `backend/.env`

**✅ Already protected:**
Both files are in `.gitignore` ✓

### Production Deployment

**Use environment variables instead of hardcoded keys:**

**Frontend (Vercel/Netlify):**
```bash
VITE_NEMOTRON_API_KEY=nvapi-...
VITE_NEMOTRON_API_URL=https://integrate.api.nvidia.com/v1
```

**Backend (Railway/Render):**
```bash
NEMOTRON_API_KEY=nvapi-...
NEMOTRON_API_URL=https://integrate.api.nvidia.com/v1
NEMOTRON_MODEL=nvidia/llama-3.1-nemotron-70b-instruct
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
PORT=5002
```

Then update your config files:
```typescript
// src/config/api-keys.ts
export const API_CONFIG = {
  NEMOTRON_API_KEY: import.meta.env.VITE_NEMOTRON_API_KEY || '',
  // ...
};
```

```javascript
// backend/server.js
const API_KEY = process.env.NEMOTRON_API_KEY;
```

### Security Checklist
- [ ] Rotate API keys every 90 days
- [ ] Use HTTPS in production
- [ ] Restrict CORS to your domain
- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Validate all inputs
- [ ] Add authentication for multi-user apps

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

3. **Set environment variables** in Vercel dashboard
4. **Done!** Your app is live

### Backend Deployment (Railway)

1. **Create Railway project**
   - Visit [railway.app](https://railway.app)
   - New Project → Deploy from GitHub

2. **Set environment variables:**
   - `NEMOTRON_API_KEY`
   - `NEMOTRON_API_URL`
   - `NEMOTRON_MODEL`
   - `SLACK_WEBHOOK_URL`
   - `PORT=5002`

3. **Deploy:** Railway auto-deploys from GitHub

4. **Update frontend** to use production backend URL:
```typescript
// In production, update API_BASE_URL in vite.config or api-client
const API_BASE_URL = 'https://your-backend.railway.app';
```

### Alternative: Deploy Together (Next.js)

You can migrate to Next.js to deploy as a single app:
- Convert backend routes to Next.js API routes (`pages/api/`)
- Deploy entire app to Vercel
- Single deployment, single domain

---

## 🗺️ Roadmap

### ✅ MVP Complete (v1.0)
- [x] AI lifecycle generation with Nemotron
- [x] Real-time progress tracking
- [x] AI-powered status reports
- [x] Slack integration
- [x] Modern, responsive UI
- [x] Full-stack Express + React architecture

### 🚧 Coming Soon (v1.1)
- [ ] **Multiple products management**
  - Save multiple product plans
  - Switch between products
  - Product search/filter
  
- [ ] **Data persistence**
  - Database integration (PostgreSQL/MongoDB)
  - User accounts
  - Save/load functionality

### 🔮 Future (v2.0)
- [ ] **Cross-functional collaboration**
  - Team member assignments
  - Comments & discussions
  - @mentions and notifications
  - Activity feed
  - Role-based permissions (Owner, Editor, Viewer)
  
- [ ] **Enhanced exports**
  - PDF export
  - CSV/Excel downloads
  - Presentation mode
  
- [ ] **Integrations**
  - Jira sync
  - GitHub issues
  - Google Calendar
  - Notion export

---

## 🤝 Contributing

Contributions welcome! Here's how:

### Setup for Development
```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/Product-Nemotron-Copilot--1.git
cd Product-Nemotron-Copilot--1

# Install dependencies
npm install
cd backend && npm install && cd ..

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes, test thoroughly

# Commit and push
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature

# Open Pull Request
```

### Development Guidelines
- Use TypeScript for frontend
- Add JSDoc comments for backend functions
- Follow existing code style
- Test all features before submitting
- Update documentation if needed

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🙏 Acknowledgments

**Powered by:**
- [NVIDIA Nemotron AI](https://build.nvidia.com/) - Advanced language model
- [NVIDIA NIM](https://www.nvidia.com/en-us/ai/) - AI inference platform
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Icon system
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

**Inspired by:**
- Linear's clean design philosophy
- Modern PM tools (Jira, Asana, Linear)
- Product School best practices

---

## 📞 Support & Troubleshooting

### Common Issues

**"API key not configured"**
- Check `src/config/api-keys.ts` has your real key
- Check `backend/.env` has NEMOTRON_API_KEY set
- Remove any extra spaces around the key
- Verify key is valid at [build.nvidia.com](https://build.nvidia.com)

**"404 error when generating"**
- Make sure backend is running on port 5002
- Check terminal for backend error messages
- Verify proxy settings in `vite.config.ts`
- Try accessing `http://localhost:5002/health` directly

**"Slack send failed"**
- Check webhook URL in `backend/.env`
- Verify URL starts with `https://hooks.slack.com/`
- Test webhook with curl:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test"}' \
  YOUR_WEBHOOK_URL
```

**"CORS error"**
- Make sure both servers are running
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5002`
- Check CORS is enabled in `backend/server.js`

### Debug Mode

Enable verbose logging:

**Frontend:** Open browser console (F12)

**Backend:** Check terminal output for request logs

### Need More Help?

1. Check browser console for errors (F12)
2. Check backend terminal for error messages
3. Review API documentation above
4. Open an issue on GitHub

---

## 🎯 Use Cases

### For Product Managers
- Rapidly generate product launch plans from ideas
- Track progress across multiple development phases
- Communicate status to stakeholders effortlessly
- Identify and mitigate risks early in the process

### For Startup Founders
- Structure your MVP development process
- Stay organized during rapid iteration
- Share progress updates with investors
- Make data-driven launch decisions

### For Product Teams
- Align on priorities and timelines across functions
- Track task ownership and completion status
- Generate consistent status reports for leadership
- Improve cross-functional communication

### For Product School Students
- Practice creating product roadmaps
- Learn lifecycle management frameworks
- Use AI to improve planning skills
- Build portfolio projects

---

## 📊 Key Metrics

- **Plan Generation Time:** ~5-10 seconds (AI processing)
- **Status Report Generation:** ~3-5 seconds
- **Slack Notification:** <1 second
- **UI Updates:** Real-time (instant)
- **API Response Format:** JSON
- **Supported Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)

---

<div align="center">

**Made with ⚡ by Product Managers, for Product Managers**

[Get Started](#-quick-start) • [API Docs](#-api-documentation) • [Report Bug](#) • [Request Feature](#)

</div>

