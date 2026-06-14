# CareLotto

CareLotto turns an art vending machine into an onchain lottery for chance, transparent giving, and collective care.

This repository currently contains a Vite + React prototype homepage for CareLotto, styled with Tailwind CSS and animated with Framer Motion.

## Hackathon Scope

The current app is frontend-first. Backend, smart contract, ENS, World, Chainlink, and Privy work should be added issue-by-issue so each feature can be reviewed in a focused pull request.

## Overview

Every play contributes to three outcomes:

- Support for a community organization
- Support for a creative or social impact project
- Entry into an individual prize pool

Participants receive an artwork-style receipt documenting their contribution. The prototype explores how systems typically designed for extraction can be redesigned to generate care, connection, and shared value.

## Current Tech Stack

- Vite
- React
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Project Structure

```text
src/
  App.jsx        Main prototype experience
  main.jsx       React entry point
  styles.css     Tailwind and global styles
public/
  carelotto-machine-draft*.png
```

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the project check:

```bash
npm run check
```

## Environment

Copy `.env.example` to `.env` and fill in the integrations you want to demo. Privy turns on when `VITE_PRIVY_APP_ID` is present; otherwise checkout clearly uses the local demo wallet fallback.

Run a general environment check:

```bash
npm run env:check
```

Run this before showing the real Privy email and embedded-wallet flow:

```bash
npm run env:check:privy
```

## Vision

CareLotto reimagines the lottery as a tool for collective benefit, where every play generates cultural, social, and economic value regardless of who wins.

Hackathon prototype under active development.
