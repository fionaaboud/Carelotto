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

Add the Privy app ID to `.env`:

```bash
VITE_PRIVY_APP_ID=
VITE_PRIVY_CLIENT_ID=
```

`VITE_PRIVY_CLIENT_ID` is optional. Keep the app ID in local or Vercel environment variables, not hard-coded in source.

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
