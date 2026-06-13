# Project Setup

## Local Development

1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Open the local URL printed by Vite.

## Validation

Run `npm run check` before opening a pull request. This currently builds the Vite app.

## Current Architecture

CareLotto is currently a frontend prototype. Integration work should stay isolated behind issue branches until the MVP flows are ready to connect.

## Pull Request Checklist

- [ ] The app builds with `npm run check`.
- [ ] README or setup notes are updated when behavior changes.
- [ ] New environment variables are documented in `.env.example`.
- [ ] UI changes are checked in the browser at desktop and mobile widths.
