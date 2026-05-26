This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contact Form Email Setup (Vercel)

To make `/contact` send real emails:

1. Create a [Resend](https://resend.com) account and generate an API key.
2. In Vercel project settings, add these environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (required recipient inbox, e.g. `infoclientify@gmail.com`)
   - `CONTACT_FROM_EMAIL` (optional; defaults to `Triofy Contact <onboarding@resend.dev>` for testing, but use your own verified sender in production)
3. Redeploy the site.

The API route is `app/api/contact/route.ts` and sends:
1. One notification email to `CONTACT_TO_EMAIL`.
2. One confirmation email back to the form submitter.

## Internal CRM Setup (Leads)

The repository includes an internal CRM at `/crm` with secret-link access and PostgreSQL persistence.

### Required environment variables

Set these locally in `.env.local` and in Vercel Project Settings → Environment Variables:

- `DATABASE_URL` (PostgreSQL connection string)
- `CRM_ACCESS_KEY` (shared internal secret key)

### Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. (Optional dev seed data) populate sample leads:
   ```bash
   npm run db:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

### Secret-link access flow

- Share access using:
  - `https://<your-domain>/crm?key=<CRM_ACCESS_KEY>`
- On first successful visit, CRM sets a secure HttpOnly access cookie and redirects to the same route without `key`.
- If key is missing or invalid, users are redirected to `/crm/access`.

### Revoke access

Rotate `CRM_ACCESS_KEY` (local + Vercel), redeploy, and share the new link.
Old cookies become invalid because cookie signatures depend on the key.

### CRM quick walkthrough

- Dashboard: `/crm` → status summary cards + follow-up list.
- Leads list: `/crm/leads` → search, filter, and sort leads.
- Create lead: `/crm/leads/new`.
- Lead detail: `/crm/leads/:id` → edit fields, update status/priority, add notes, mark contacted, delete lead.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
