---
name: Admin page routing in amira-alaa
description: How admin page bypasses the splash screen
---

## Rule
The app uses a `showSplash` state gate in `AppContent`. Without intervention, /admin shows the splash page instead of the admin panel.

**Fix:** Use `useLocation()` from wouter inside `AppContent` (which is inside `WouterRouter`). Check `location === "/admin"` and render `<AdminPage />` directly, bypassing the splash gate.

**Why:** The splash is a state-based gate, not URL-based routing. The admin page needs direct access without the splash ceremony.
