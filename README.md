**`README.md`**

# Employee Onboarding Checklist

An interactive checklist application for new employee onboarding. Built with vanilla HTML, CSS and Javascript.

# Features

- 15 onboarding tasks across 3 categories (IT Setup, HR Paperwork, Team Introductions)
- Real-time progress bar with animated updates
- Filter tasks by status (All / Incomplete / Completed)
- Reset all tasks with confirmation dialog
- Persistent state via localStorage - progress survives page refresh
- Fully accessible (ARIA attributes, keyboard navigation, screen reader support)
- Responsive design - work on desktop and mobile

## Tech Stack

- **HTML5** - semantic markup with accessibility attributes
- **CSS3** - flexbox layout, transitions, responsive design
- **Javascript (ES6+)** - DOM manipulation, event handling, localStorage API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AlvinLogen/employee-onboarding-checklist.git
   ```
2. Open `index.html` in your browser

No build tools, no dependencies, no server required.

## What I Learned

This project was built during Sprint 2 of my full-stack development journey. Key concepts:

- DOM manipulation with `document.createElement()` and `appendChild()`
- Event-driven programming with `addEventListener()`
- State-driven rendering — data changes drive UI updates
- Array methods: `.filter()`, `.find()`, `.map()`, `.forEach()`
- XSS prevention: `textContent` over `innerHTML`
- localStorage for client-side persistence
- Accessible interactive elements with ARIA attributes
- CSS transitions for micro-interactions
- Git conventional commits and feature branch workflow

## Project Structure

```
├── index.html          — Page structure and semantic markup
├── style.css           — Layout, styling, transitions, responsive
├── app.js              — Data model, DOM rendering, events, persistence
├── .gitignore          — Git ignore rules
├── README.md           — This file
```
