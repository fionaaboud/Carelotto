# Supabase Setup

CareLotto can store demo purchases and lottery-round state in Supabase so the impact and admin dashboards stay cumulative across browser sessions.

## 1. Create the Supabase Project

Create a Supabase project, then open:

- Project Settings > API
- Copy the Project URL
- Copy the anon public key

## 2. Create the Tables

Open SQL Editor in Supabase and paste the contents of:

```txt
supabase/schema.sql
```

The policies in this file are intentionally simple for the hackathon demo. They let the public app read dashboard totals, record purchases, and update the demo round. A production version should move admin writes behind a server route with a secret service-role key.

## 3. Add Environment Variables

Add these to local `.env` and to Vercel:

```txt
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

In Vercel, add them for Production and Preview, then redeploy.

## 4. Test

Complete a demo purchase. Refresh the page. The impact dashboard and admin dashboard should still show the cumulative ticket totals.
