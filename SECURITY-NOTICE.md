# Security Notice

The previously shared `DATABASE_URL` should be treated as **leaked**.

## Rotate the database credentials

1. Go to your Neon project dashboard.
2. Rotate/regenerate the database password/connection string.
3. Update `DATABASE_URL` in:
   - Local `.env.local`
   - Vercel project environment variables

## CRM access key

Set `CRM_ACCESS_KEY` in your environment (local + Vercel). Example:

```bash
CRM_ACCESS_KEY=Hashir-goated
```

Then visit:
- `/crm/access` and enter the key, or
- `/crm?key=Hashir-goated` to set the access cookie.
