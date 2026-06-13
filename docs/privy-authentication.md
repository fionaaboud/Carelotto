# Privy Authentication

## Goal

Use Privy for email signup, embedded wallet creation, user sessions, and ENS profile connection.

## SDK

Privy documents the React SDK package as `@privy-io/react-auth`.

```bash
npm install @privy-io/react-auth@latest
```

The package install stalled in this local environment, so the app currently includes a Privy-ready demo auth panel without importing the SDK.

## Environment

Add the Privy app ID to `.env`:

```bash
VITE_PRIVY_APP_ID=
```

## Acceptance Checklist

- [x] Email signup UI exists.
- [x] Embedded wallet state is represented in the UX.
- [x] User session state is represented in the UX.
- [x] Wallet identity is prepared for ENS profile connection.
- [ ] Install `@privy-io/react-auth`.
- [ ] Wrap the app in `PrivyProvider`.
- [ ] Replace the demo auth state with Privy `usePrivy` state.
