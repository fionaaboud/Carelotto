# Privy Authentication

## Goal

Use Privy for email signup, embedded wallet creation, user sessions, and ENS profile connection.

## SDK

Privy documents the React SDK package as `@privy-io/react-auth`.

```bash
npm install @privy-io/react-auth@3.30.0
```

The app is wrapped in `PrivyProvider` when `VITE_PRIVY_APP_ID` is present. Checkout uses the Privy email-code flow, then records the Privy wallet as the buyer payout wallet for World ID and lottery entries.

## Environment

Create or open the app in the Privy Dashboard, then copy the app ID into `.env`:

```bash
VITE_PRIVY_APP_ID=
VITE_PRIVY_CLIENT_ID=
```

`VITE_PRIVY_CLIENT_ID` is optional. Use it only when the Privy Dashboard gives this environment a dedicated app client.

Keep Privy values in local or Vercel environment variables, not hard-coded in source. The browser app should only use `VITE_PRIVY_APP_ID` and optional `VITE_PRIVY_CLIENT_ID`; do not expose a Privy app secret in frontend code.

## Dashboard Setup

1. Create a Privy app for CareLotto.
2. Enable email login.
3. Enable embedded wallets.
4. Allow the local demo origin, such as `http://localhost:5173`.
5. Allow the deployed Vercel production and preview domains.
6. Copy the app ID into local `.env` and Vercel as `VITE_PRIVY_APP_ID`.
7. If using app clients, copy the client ID into `VITE_PRIVY_CLIENT_ID`.

## Local Check

Run this before a demo:

```bash
npm run env:check:privy
```

If `VITE_PRIVY_APP_ID` is missing, checkout intentionally shows a local demo wallet warning instead of looking like a real Privy flow.

## Acceptance Checklist

- [x] Email signup UI exists.
- [x] Embedded wallet state is represented in the UX.
- [x] User session state is represented in the UX.
- [x] Wallet identity is prepared for ENS profile connection.
- [x] Add `@privy-io/react-auth` to project dependencies.
- [ ] Refresh the local lockfile after npm can download the package.
- [x] Wrap the app in `PrivyProvider`.
- [x] Replace the demo auth state with Privy `usePrivy` state.
- [x] Keep a local demo fallback when `VITE_PRIVY_APP_ID` is missing.
- [x] Make the checkout UI clearly say when Privy is missing.
- [x] Add an environment check for demo readiness.
