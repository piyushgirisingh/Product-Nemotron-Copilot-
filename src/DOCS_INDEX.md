# Documentation Index

Complete guide to all documentation for Lifecycle Copilot.

---

## 🚀 Getting Started (Read These First!)

| Document | Time | Purpose |
|----------|------|---------|
| [README.md](./README.md) | 5 min | Project overview & quick start |
| [QUICK_START_API.md](./QUICK_START_API.md) | 5 min | **API setup guide (start here!)** |
| [WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md) | 2 min | Visual guide for API key setup |

---

## 🔧 Setup & Configuration

| Document | Purpose |
|----------|---------|
| [config/README.md](./config/README.md) | Configuration directory guide |
| [config/api-keys.ts](./config/api-keys.ts) | **Paste your API key here** |
| [config/api-keys.example.ts](./config/api-keys.example.ts) | Template (safe to share) |
| [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) | What changed with real APIs |
| [API_SETUP_SUMMARY.md](./API_SETUP_SUMMARY.md) | Complete setup summary |

---

## 📖 User Guides

| Document | Purpose |
|----------|---------|
| [USER_GUIDE.md](./USER_GUIDE.md) | How to use the app |
| Features walkthrough | All functionality explained |
| Best practices | Tips for PMs |

---

## 🎨 Design

| Document | Purpose |
|----------|---------|
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Complete design system |
| Visual guidelines | Colors, typography, spacing |
| Component patterns | Reusable components |
| Linear inspiration | Design philosophy |

---

## 🔌 API & Integration

| Document | Purpose |
|----------|---------|
| [API_INTEGRATION.md](./API_INTEGRATION.md) | API contracts & endpoints |
| [EXAMPLE_NEXTJS_API.md](./EXAMPLE_NEXTJS_API.md) | Code examples for Next.js |
| Request/response formats | Data structures |
| Error handling | How errors work |

---

## 🚢 Deployment

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Production deployment |
| Vercel setup | Deploy to Vercel |
| Netlify setup | Deploy to Netlify |
| Environment variables | Production config |

---

## 📁 Code Documentation

### Main Application

| File | Purpose |
|------|---------|
| `/App.tsx` | Main app component with state management |
| `/lib/api-client.ts` | API wrapper functions |

### Components

| File | Purpose |
|------|---------|
| `/components/Navbar.tsx` | Top navigation bar |
| `/components/Sidebar.tsx` | Product selector sidebar |
| `/components/ApiStatusBanner.tsx` | API setup reminder |
| `/components/InputCard.tsx` | Product input form |
| `/components/LifecycleOverviewCard.tsx` | Phase visualization |
| `/components/ExecutionPlanCard.tsx` | Task table |
| `/components/RisksMetricsCard.tsx` | Risks & KPIs display |
| `/components/StatusSummaryCard.tsx` | Status report & Slack |

### API Implementation

| File | Purpose |
|------|---------|
| `/api/generate-lifecycle.ts` | Lifecycle generation (Nemotron) |
| `/api/generate-status.ts` | Status report generation |
| `/api/send-slack.ts` | Slack webhook integration |

### Configuration

| File | Purpose |
|------|---------|
| `/config/api-keys.ts` | **Your API keys go here** |
| `/config/api-keys.example.ts` | Template file |
| `/config/check-config.ts` | Configuration checker |

---

## 🎯 Quick Reference

### I want to...

**Set up the app**
→ [QUICK_START_API.md](./QUICK_START_API.md)

**Paste my API key**
→ [WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md)

**Learn how to use it**
→ [USER_GUIDE.md](./USER_GUIDE.md)

**Understand the design**
→ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Deploy to production**
→ [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Integrate with my API**
→ [API_INTEGRATION.md](./API_INTEGRATION.md)

**See code examples**
→ [EXAMPLE_NEXTJS_API.md](./EXAMPLE_NEXTJS_API.md)

**Troubleshoot issues**
→ [QUICK_START_API.md](./QUICK_START_API.md) (Troubleshooting section)

**Customize the styling**
→ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Add new features**
→ [API_INTEGRATION.md](./API_INTEGRATION.md) + source code

---

## 📊 Documentation by Role

### Product Managers
1. [USER_GUIDE.md](./USER_GUIDE.md) - How to use
2. [QUICK_START_API.md](./QUICK_START_API.md) - Setup
3. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Visual design

### Developers
1. [QUICK_START_API.md](./QUICK_START_API.md) - Setup
2. [API_INTEGRATION.md](./API_INTEGRATION.md) - API docs
3. [EXAMPLE_NEXTJS_API.md](./EXAMPLE_NEXTJS_API.md) - Code examples
4. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy

### Designers
1. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete system
2. [README.md](./README.md) - Overview
3. [USER_GUIDE.md](./USER_GUIDE.md) - User flows

### DevOps
1. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy
2. [API_INTEGRATION.md](./API_INTEGRATION.md) - APIs
3. [config/README.md](./config/README.md) - Config

---

## 🆘 Troubleshooting Docs

| Issue | Document |
|-------|----------|
| API key not working | [QUICK_START_API.md](./QUICK_START_API.md) → Troubleshooting |
| Where to paste key | [WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md) |
| Configuration issues | [config/README.md](./config/README.md) |
| Deployment problems | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| API errors | [API_INTEGRATION.md](./API_INTEGRATION.md) |

---

## 📈 Learning Path

### Beginner (Just want to use it)
1. [README.md](./README.md) - Overview
2. [QUICK_START_API.md](./QUICK_START_API.md) - Setup
3. [WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md) - Visual guide
4. [USER_GUIDE.md](./USER_GUIDE.md) - How to use

### Intermediate (Want to customize)
1. All Beginner docs
2. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design tokens
3. [API_INTEGRATION.md](./API_INTEGRATION.md) - API details
4. Source code exploration

### Advanced (Want to extend)
1. All previous docs
2. [EXAMPLE_NEXTJS_API.md](./EXAMPLE_NEXTJS_API.md) - Code patterns
3. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production
4. API implementation files
5. Component architecture

---

## 📚 Documentation Stats

| Category | Files | Purpose |
|----------|-------|---------|
| **Setup** | 5 | Get started quickly |
| **User** | 1 | Learn to use the app |
| **Design** | 1 | Visual guidelines |
| **API** | 3 | Integration & examples |
| **Deploy** | 1 | Production deployment |
| **Config** | 4 | Configuration files |
| **Total** | **15** | Complete documentation |

---

## ✅ Documentation Checklist

Before starting, make sure you've read:

- [ ] [README.md](./README.md) - Project overview
- [ ] [QUICK_START_API.md](./QUICK_START_API.md) - API setup
- [ ] [WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md) - Where to paste key

After setup:
- [ ] [USER_GUIDE.md](./USER_GUIDE.md) - How to use features

For deployment:
- [ ] [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production guide

For customization:
- [ ] [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design system
- [ ] [API_INTEGRATION.md](./API_INTEGRATION.md) - API details

---

## 🔄 Keep Updated

This documentation is:
- ✅ Current as of the latest version
- ✅ Tested and verified
- ✅ Production-ready
- ✅ Beginner-friendly

---

## 🎯 Most Important Docs

If you only read 3 documents, read these:

1. **[QUICK_START_API.md](./QUICK_START_API.md)** - Get started in 5 minutes
2. **[WHERE_TO_PASTE_API_KEY.md](./WHERE_TO_PASTE_API_KEY.md)** - Visual setup guide
3. **[USER_GUIDE.md](./USER_GUIDE.md)** - Learn all features

---

*Happy reading! 📖*
