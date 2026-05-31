# Tip App WWW

This folder is a complete static mobile tipping app connected to Supabase.

## Files

- `index.html` - customer tipping page.
- `signin.html` - manager/worker sign in and registration.
- `manager.html` - manager portal for workers and tip records.
- `worker.html` - worker dashboard for claimed worker profiles.
- `assets/app.js` - shared Supabase connection and helpers.
- `assets/customer.js` - customer page behavior.
- `assets/signin.js` - authentication behavior.
- `assets/manager.js` - manager portal behavior.
- `assets/worker.js` - worker dashboard behavior.
- `assets/styles.css` - shared mobile-first styling.
- `schema.sql` - Supabase database setup.

## Setup

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Paste and run all of `schema.sql`.
4. In **Authentication > URL Configuration**, add the URL where you host this folder.
5. Upload or deploy the contents of this `WWW` folder to any static web host.

The Supabase project URL and publishable key are already set in `assets/app.js`.

## First use

1. Open `signin.html`.
2. Create a manager account.
3. Open `manager.html` and add workers.
4. Share each worker's claim code with that worker.
5. Workers create accounts on `signin.html`, open `worker.html`, and claim their profile.
6. Customers use `index.html` to record tips.

This app records tips in Supabase. It does not process card payments. Add each worker's Venmo, Cash App, Stripe Payment Link, or other payment URL in the manager portal so customers can complete payment after recording the tip.
