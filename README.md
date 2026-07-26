This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Lead tracking

The directory records what it sends each provider, so there's something
concrete to show them when discussing paid placement:

- **Calls** — tapping a provider's phone number posts to
  `/api/providers/[id]/contact`. Counts are deduplicated per visitor per 30
  minutes, so the figure is *unique callers*, not raw taps.
- **Job requests** — the quote form on each provider page emails the provider
  (admin CC'd) and stores the lead.

Both live in the admin area: **Activity** (`/admin/stats`) for per-provider
counts, **Job Requests** (`/admin/leads`) for the lead inbox.

Visitor IPs are never stored. They're salted and hashed purely for
deduplication and rate limiting.

### Deploying this change

The `ContactEvent` and `Lead` tables must exist before deploy, or provider
pages will error. This project has no migrations directory, so push the schema:

```bash
DATABASE_URL="<your Neon connection string>" npx prisma db push
```

Set `IP_HASH_SALT` to a long random string in your environment. It has a
fallback so nothing breaks without it, but setting it makes the hashes
unguessable.

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
