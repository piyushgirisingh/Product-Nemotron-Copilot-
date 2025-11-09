# Lifecycle Copilot - Design System

> Linear-inspired design for a modern, clean, and fast-looking product management dashboard

---

## Design Philosophy

**Core Principles:**
- **Clean & Minimal** - Remove unnecessary elements, let content breathe
- **Sharp & Modern** - Crisp edges, subtle shadows, refined details
- **Fast-looking** - Smooth transitions, intentional animations, responsive feedback
- **Professional** - B2B SaaS aesthetic that feels reliable and trustworthy

---

## Layout Structure

### Top Navigation Bar
```
Height: 56px (3.5rem)
Position: Sticky, translucent backdrop blur
Background: white/80 with backdrop-blur-md
Border: bottom border neutral-200/60
```

**Elements:**
- **Logo** (left): 28px gradient icon + brand name
- **Status pill** (center): Nemotron badge with animated green dot
- **Partner badges** (right): NVIDIA + PNC outline badges

### Left Sidebar
```
Width: 240px (15rem)
Background: neutral-900 (dark theme)
Border: right border neutral-800
```

**Layout:**
- Upper section: Product list with selection state
- Lower section: New product button + footer info
- Typography: uppercase labels, clear hierarchy

### Main Content
```
Max-width: 1024px (5xl)
Padding: 2rem
Background: neutral-50
```

**Card spacing:** 1.5rem vertical gaps

---

## Color System

### Primary Palette

**Blue Accent** (Primary actions, progress, active states)
- `blue-600`: #2563eb - Primary buttons, links
- `blue-700`: #1d4ed8 - Hover states
- `indigo-600`: #4f46e5 - Gradient accents

**Neutral Scale** (Backgrounds, text, borders)
- `neutral-50`: #fafafa - Page background
- `neutral-100`: #f5f5f5 - Subtle backgrounds
- `neutral-200`: #e5e5e5 - Borders, dividers
- `neutral-300`: #d4d4d4 - Inactive borders
- `neutral-500`: #737373 - Secondary text
- `neutral-600`: #525252 - Body text
- `neutral-700`: #404040 - Emphasized text
- `neutral-900`: #171717 - Headings, sidebar bg

**Sidebar Dark Theme**
- `neutral-900`: #171717 - Background
- `neutral-800`: #262626 - Selected state, hover
- `neutral-100`: #f5f5f5 - Text
- `neutral-400`: #a3a3a3 - Icons
- `neutral-500`: #737373 - Labels

### Status Colors

**Priority Badges**
- P0 Critical: `red-50/red-700/red-200` - #fef2f2/#b91c1c/#fecaca
- P1 Important: `orange-50/orange-700/orange-200` - #fff7ed/#c2410c/#fed7aa
- P2 Nice-to-have: `yellow-50/yellow-700/yellow-200` - #fefce8/#a16207/#fef08a

**Task Status**
- Done: `green-500/green-700` - #22c55e/#15803d
- In progress: `blue-600/blue-700` - #2563eb/#1d4ed8
- Not started: `neutral-300/neutral-500` - #d4d4d4/#737373

**Phase Status**
- Completed: `green-500` with checkmark
- Active: `blue-600` with dot + glow shadow
- Upcoming: `neutral-100/neutral-300` with dot

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Scale

**Headings**
- H1: 24px (1.5rem) - Page titles
- H2: 20px (1.25rem) - Card titles (medium weight)
- H3: 18px (1.125rem) - Section titles
- H4: 16px (1rem) - Subsections

**Body Text**
- Base: 14px (0.875rem) - Primary content
- Small: 12px (0.75rem) - Labels, metadata
- Extra small: 11px (0.6875rem) - Badges, hints

**Weights**
- Medium: 500 - Headings, labels, buttons
- Normal: 400 - Body text, inputs

**Line Height**
- Headings: 1.5
- Body: 1.5
- Relaxed: 1.625 - Long-form text

---

## Spacing System

### Card Padding
- Default: 24px (1.5rem)
- Compact sections: 16px (1rem)

### Element Gaps
- Card stack: 24px (1.5rem)
- Section spacing: 24px (1.5rem)
- Component gaps: 12-16px (0.75-1rem)
- List items: 10px (0.625rem)

### Margins
- Page horizontal: 32px (2rem)
- Content max-width: 1024px centered

---

## Border Radius

### Rounded Corners
- Cards: 12px (0.75rem) - `rounded-xl`
- Buttons: 6px (0.375rem) - `rounded-md`
- Pills/Badges: 9999px - `rounded-full`
- Tables: 8px (0.5rem) - `rounded-lg`
- Icons containers: 6px - `rounded-md`

---

## Shadows

### Elevation System

**Cards**
```css
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

**Buttons (Primary)**
```css
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

**Active Elements (Blue glow)**
```css
shadow-blue-500/50: 0 0 0 2px rgba(37, 99, 235, 0.5)
```

**Subtle hover states**
- Use background color transitions instead of heavy shadows
- Keep shadows minimal and purposeful

---

## Components

### Cards

**Structure:**
```jsx
<Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl">
  <h2>Title</h2>
  {/* Content */}
</Card>
```

**Variants:**
- Default: White background, subtle border and shadow
- Info box: `bg-neutral-50` with `border-neutral-200`

### Buttons

**Primary** (Main actions)
```
bg-blue-600 hover:bg-blue-700
text-white
shadow-sm
rounded-md
px-5 py-2
```

**Secondary** (Alternative actions)
```
border-neutral-300
text-neutral-700
hover:bg-neutral-50
```

**Ghost** (Sidebar, tertiary)
```
text-neutral-400
hover:text-neutral-100
hover:bg-neutral-800
```

### Inputs

**Text fields:**
```
border-neutral-200
focus:border-blue-500
focus:ring-blue-500/20
rounded-md
```

**States:**
- Default: neutral border
- Focus: blue border + ring
- Disabled: neutral-100 background
- Error: red-200 border + red-50 background

### Tables

**Header:**
```
bg-neutral-50
border-b border-neutral-200
text-xs font-medium text-neutral-600
```

**Rows:**
```
border-b border-neutral-100
hover:bg-neutral-50/50
transition-colors
```

### Progress Bar

**Container:**
```
h-2 (8px height)
bg-neutral-100
rounded-full
overflow-hidden
```

**Fill:**
```
bg-gradient-to-r from-blue-600 to-indigo-600
transition-all duration-500 ease-out
shadow-sm
```

### Badges

**Priority badges:**
```
text-xs
px-2 py-0.5
border
rounded-md
font-medium
```

**Status badges:**
```
text-xs
px-2.5 py-0.5
rounded-full
```

### Phase Stepper

**Circle:**
```
w-8 h-8
rounded-full
border-2
```

**States:**
- Completed: green-500 fill + white checkmark
- Active: blue-600 fill + white dot + glow shadow
- Upcoming: neutral-100 fill + neutral dot

**Connector:**
```
w-0.5 h-8
bg-neutral-200 (or green-300 for completed)
```

---

## Animations & Transitions

### Timing
```css
transition-colors duration-150 - Default interactions
transition-all duration-500 ease-out - Progress bar
animate-spin - Loading spinners
animate-pulse - Status indicators
```

### States
- Hover: Smooth color transitions (150ms)
- Focus: Ring appearance with 20% opacity
- Loading: Spinner with opacity animation
- Success: Toast slide-in from bottom-right

### Smooth Scrolling
- Custom scrollbar (8px width, rounded)
- Smooth scroll behavior on page navigation

---

## Iconography

**Library:** Lucide React

**Sizes:**
- Small: 16px (w-4 h-4) - Buttons, inline
- Medium: 20px (w-5 h-5) - Cards, headers
- Large: 24px (w-6 h-6) - Empty states

**Usage:**
- Sparkles: AI features, generation
- Folder: Products, documents
- Plus: Add actions
- Check: Completion, success
- AlertTriangle: Warnings, risks
- TrendingUp: Metrics, growth
- Send: Slack, sharing
- Copy: Clipboard actions
- Loader2: Loading states (with animate-spin)

**Icon containers:**
```
w-8 h-8
rounded-lg
bg-{color}-50
flex items-center justify-center
{color}-600 icon
```

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary text: neutral-900 (14.5:1)
- Secondary text: neutral-600 (7:1)
- Links/actions: blue-600 (5.5:1)

### Focus States
- Visible focus rings on all interactive elements
- Ring color: blue-500/20
- Keyboard navigation supported

### Form Accessibility
- Labels associated with inputs
- Required field indicators (*)
- Error messages with icons
- Disabled state clearly indicated

---

## Responsive Behavior

### Breakpoints
- Mobile: < 768px - Single column, stacked cards
- Tablet: 768-1024px - Adjust sidebar, maintain card layout
- Desktop: > 1024px - Full layout with sidebar

### Adaptations
- Grid layouts: `grid-cols-2` → `grid-cols-1` on mobile
- Cards maintain full width but stack vertically
- Tables: Consider horizontal scroll on mobile
- Sidebar: Can collapse to icon-only on smaller screens

---

## Implementation Notes

### Tailwind Classes
```jsx
// Card wrapper
"p-6 bg-white border border-neutral-200 shadow-sm rounded-xl"

// Primary button
"bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-md px-5"

// Input field
"border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-md"

// Section spacing
"space-y-6" // Between cards
"space-y-4" // Within cards
"space-y-2" // Form fields

// Text hierarchy
"text-neutral-900" // Headings
"text-neutral-700" // Body
"text-neutral-600" // Secondary
"text-neutral-500" // Labels, hints
```

### Custom CSS
- Scrollbar styling in globals.css
- Font smoothing for better text rendering
- Backdrop blur for navbar translucency

---

## Design Tokens Summary

```css
/* Primary */
--primary-blue: #2563eb;
--primary-hover: #1d4ed8;

/* Backgrounds */
--bg-page: #fafafa;
--bg-card: #ffffff;
--bg-dark: #171717;

/* Text */
--text-primary: #171717;
--text-body: #404040;
--text-secondary: #737373;
--text-hint: #a3a3a3;

/* Borders */
--border-default: #e5e5e5;
--border-subtle: rgba(0, 0, 0, 0.1);

/* Radius */
--radius-card: 12px;
--radius-button: 6px;
--radius-pill: 9999px;

/* Spacing */
--space-card: 24px;
--space-section: 24px;
--space-component: 16px;
```

---

## Best Practices

1. **Consistency** - Use established patterns across all components
2. **Whitespace** - Give content room to breathe
3. **Hierarchy** - Clear visual distinction between elements
4. **Feedback** - Always provide loading/success/error states
5. **Performance** - Smooth transitions without jank
6. **Accessibility** - Keyboard navigation and screen reader support
7. **Responsiveness** - Test at multiple screen sizes

---

## References

**Inspired by:**
- Linear (linear.app) - Clean, fast, modern PM tool
- Tailwind UI - Component patterns
- Shadcn/ui - Component architecture

**Tools:**
- Figma - Design prototypes
- Tailwind CSS - Styling framework
- Lucide React - Icon system
- Next.js - React framework

---

*This design system ensures a cohesive, professional, and delightful user experience for Lifecycle Copilot.*
