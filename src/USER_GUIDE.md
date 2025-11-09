# Lifecycle Copilot - User Guide

## What is Lifecycle Copilot?

Lifecycle Copilot is an AI-powered dashboard that helps Product Managers plan and track product development from concept to launch. It generates comprehensive lifecycle plans, tracks progress, and exports status updates to Slack.

---

## How to Use

### Step 1: Describe Your Product

Fill in the input form with your product details:

- **Product Name** (required) - e.g., "AI Analytics Platform"
- **Short Description** (required) - What does your product do?
- **Target Users** (optional) - Who will use it?
- **Timeline** (optional) - 3, 6, or 12 months

Click **"Generate Lifecycle Plan"** to create your plan.

⏱️ Generation takes ~2 seconds

---

### Step 2: Review Your Lifecycle Overview

After generation, you'll see:

**Phase Progression:**
- Discovery → Design → Build → Test → Launch → Post-launch
- Each phase shows its description and status

**Progress Tracking:**
- Visual progress bar
- Task completion counter
- Updates automatically as you mark tasks complete

---

### Step 3: Manage Tasks

The task table shows all your lifecycle tasks organized by phase:

**Each task has:**
- Phase assignment
- Task description
- Priority level (P0 = Critical, P1 = Important, P2 = Nice-to-have)
- Status dropdown

**Update task status:**
1. Click any status dropdown
2. Select: Not started → In progress → Done
3. Progress bar updates immediately ✨

**Priority Colors:**
- 🔴 **P0** (Red) - Must have for launch
- 🟠 **P1** (Orange) - Should have for launch
- 🟡 **P2** (Yellow) - Nice to have, can defer

---

### Step 4: Generate Status Report

Click **"Generate Status & GTM Summary"** to create:

**Status Summary:**
- Executive summary of current progress
- What's been accomplished
- Current phase analysis

**Next Steps:**
- Actionable items for the next sprint
- Priority-ordered recommendations

**Launch Checklist:**
- Pre-launch readiness tracker
- Items marked as complete ✅, in-progress 🔄, or pending ⬜

⏱️ Generation takes ~1.5 seconds

---

### Step 5: Export to Slack

Once your status report is generated:

1. Click **"Copy status"** to copy formatted text
2. Click **"Send to Slack"** to post to your workspace

The Slack message includes:
- Product name header
- Progress percentage
- Status summary
- Next steps
- Launch checklist with emoji indicators

⏱️ Sending takes ~1 second

---

## Tips & Best Practices

### 🎯 Getting Better Results

**Be specific in your description:**
- ❌ "An app for teams"
- ✅ "A real-time analytics platform that helps teams make data-driven decisions faster"

**Update tasks regularly:**
- Keep task statuses current
- Progress tracking helps identify blockers
- Great for standups and sprint planning

**Use priority levels strategically:**
- P0: Critical path items that block launch
- P1: Important but can be delayed if needed
- P2: Enhancements for future iterations

### 📊 Reading Your Dashboard

**Progress < 25%:** 
- Focus on discovery and validation
- Expect many "Not started" tasks
- This is normal early on!

**Progress 25-50%:**
- Transitioning to design/build
- Good time to generate first status report
- Start identifying risks

**Progress 50-75%:**
- Core development in progress
- Review launch checklist regularly
- Plan GTM activities

**Progress > 75%:**
- Finalize testing and documentation
- Prepare launch materials
- Update Slack team frequently

---

## Keyboard Shortcuts

Currently none, but coming soon:
- `Ctrl/Cmd + G` - Generate plan
- `Ctrl/Cmd + R` - Generate report
- `Ctrl/Cmd + K` - Send to Slack

---

## Data & Privacy

**Current Implementation (Demo Mode):**
- All data stored in browser memory only
- No data sent to servers (mock APIs)
- Data clears on page refresh
- Perfect for prototyping and demos

**Production Implementation:**
- Data sent to backend APIs only
- Lifecycle plans can be saved to database
- Slack messages sent via official webhooks
- No PII or sensitive data collected

---

## Troubleshooting

### "Product name is required" error
- Fill in both Product Name and Description fields
- These are required to generate a plan

### Generate button disabled
- Check for inline error messages
- Ensure required fields are filled
- If loading, wait for current operation to complete

### "Generate Status" button disabled
- You must generate a lifecycle plan first
- Look for Section 2 "Lifecycle overview" on the page

### "Send to Slack" button disabled
- Generate a status report first
- Button enables after Section 4 is populated

### Progress not updating
- Task status changes update progress immediately
- Check that you're selecting "Done" (not "In progress")
- Refresh page if issues persist

---

## Workflow Examples

### Example 1: New Product Kickoff

1. Fill in product details
2. Generate lifecycle plan
3. Review with team
4. Adjust task priorities based on feedback
5. Share initial status with stakeholders via Slack

### Example 2: Weekly Status Update

1. Update task statuses based on team progress
2. Generate fresh status report
3. Copy status for email or slides
4. Send to Slack for team visibility
5. Discuss blockers in standup

### Example 3: Pre-Launch Review

1. Review all P0 tasks are "Done"
2. Check launch checklist completion
3. Generate final status report
4. Share launch readiness with executives
5. Use for go/no-go decision

---

## Integrations

### Current (Demo):
- ✅ Fully functional UI
- ✅ Real-time progress tracking
- ✅ Mock API responses

### Available for Production:
- 🔌 Nemotron AI for generation
- 🔌 Slack webhooks for export
- 🔌 Database for persistence
- 🔌 Authentication (optional)

See `DEPLOYMENT_GUIDE.md` for setup instructions.

---

## Support & Feedback

For technical issues:
- Check the browser console (F12)
- Review `API_INTEGRATION.md`
- Check `DEPLOYMENT_GUIDE.md`

For feature requests:
- All buttons are functional
- State updates happen immediately
- API calls work with proper backend setup

---

## Feature Roadmap

Coming soon:
- [ ] Multiple products support
- [ ] Product comparison view
- [ ] Export to PDF/CSV
- [ ] Custom phase definitions
- [ ] Team collaboration
- [ ] Historical tracking
- [ ] Risk score calculation
- [ ] Automated reminders

---

## Quick Reference

| Action | Button Location | Prerequisite |
|--------|----------------|--------------|
| Generate Plan | Section 1 | Fill name & description |
| Update Task | Section 3 | Plan generated |
| Generate Status | Section 4 | Plan generated |
| Copy Status | Section 4 | Status generated |
| Send to Slack | Section 4 | Status generated |

---

**Need more help?** Check out:
- `API_INTEGRATION.md` - API documentation
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `EXAMPLE_NEXTJS_API.md` - Code examples
