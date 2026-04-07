# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start Next.js dev server on http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check

# Sanity Studio (separate workspace in sanity/)
cd sanity && npm run dev   # Start Sanity Studio
```

Node.js >= 22.x is required.

## Architecture

This is a Next.js 15 e-commerce storefront for "Ray Grizzly" (art/drawing products), backed by Sanity CMS and Stripe payments.

### Data Flow

1. **Sanity CMS** (`sanity/` directory) stores products, categories, and drawing images. The studio runs as a separate app.
2. **Next.js frontend** (`app/`) fetches from Sanity via GROQ queries using the client in `app/lib/sanity.ts`.
3. **Stripe** handles payments — cart is managed client-side via `use-shopping-cart`, checkout creates a Stripe session via `POST /api/checkout`, and the webhook at `POST /api/webhook` marks products as sold in Sanity after successful payment.

### Key Concepts

- Products have an `available: boolean` field. When a purchase completes, the webhook sets `available: false` and writes order info to the product document. Products default to available if the field is unset (legacy support).
- The `writeClient` in `app/lib/sanity.ts` uses `SANITY_API_TOKEN` and is only used server-side (webhook). The read `client` uses CDN and is safe for client-side use.
- Pages use `export const revalidate = 60` (ISR, 60-second cache).

### Routes

- `/` — Hero + newest products
- `/[category]` — Products filtered by category name
- `/product/[slug]` — Product detail with add-to-cart / checkout-now
- `/api/checkout` — POST: creates Stripe checkout session
- `/api/webhook` — POST: Stripe webhook, marks products sold
- `/stripe/success` and `/stripe/error` — Post-checkout redirect pages

### Environment Variables

| Variable | Used in |
|---|---|
| `NEXT_PUBLIC_STRIPE_KEY` | Client-side cart provider |
| `STRIPE_SECRET_KEY` | Server-side checkout + webhook |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |
| `SANITY_API_TOKEN` | Write client for marking products sold |
| `NEXT_PUBLIC_BASE_URL` | Stripe redirect URLs (defaults to `https://ray-grizzly.vercel.app`) |

### Sanity Schema

Three document types defined in `sanity/schemas/`:
- `product` — name, slug, images, price, price_id (Stripe price ID), description, category (ref), available
- `category` — name
- `drawingImages` — for hero/gallery images

### UI Stack

- Tailwind CSS v4 with dark mode (`class` strategy via `next-themes`)
- Radix UI primitives + shadcn/ui components in `components/ui/`
- `lucide-react` for icons
