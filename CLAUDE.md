# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project from Mosh Hamedani's Claude Code course (https://codewithmosh.com/p/claude-code). It is **intentionally** shipped with a bug, poor UI, and messy code — these are fixed iteratively as course exercises. Do not assume existing issues are accidental; check with the user before "cleaning up" code that may be a deliberate teaching artifact.

## Commands

```bash
npm install      # install deps
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # production build
npm run lint     # ESLint over the repo
npm run preview  # preview built bundle
```

There is no test runner configured.

## Architecture

Single-page React 19 + Vite app. Entire application logic lives in `src/App.jsx` as one component:

- All state (transactions list, form fields, filters) is local `useState` in `App`.
- Initial transactions are hard-coded; there is no persistence layer or backend.
- Totals (`totalIncome`, `totalExpenses`, `balance`) and `filteredTransactions` are derived inline on each render.
- `amount` is stored as a **string** (from the `<input type="number">`), so the `reduce` sums concatenate rather than add — this is the known starter bug.

Styling is plain CSS in `src/App.css` and `src/index.css`. No router, state library, or component library.
