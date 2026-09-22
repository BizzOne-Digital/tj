# Mounties Youth Basketball

Premium Next.js website for the Philipsburg-Osceola Mountaineer Elementary Basketball Program.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **GSAP** (scroll animations)
- **Nodemailer** (contact & booking emails)
- **Zod** (form validation)

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your SMTP credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Setup

See `.env.example` for required variables:

| Variable | Description |
|---|---|
| `SMTP_HOST` | Gmail SMTP host (smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (465) |
| `SMTP_SECURE` | true for SSL |
| `SMTP_USER` | Your Gmail address |
| `SMTP_APP_PASSWORD` | Gmail App Password (not regular password) |
| `CONTACT_TO_EMAIL` | Where form submissions are sent |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO/canonical links |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Database name (default: `mounties-youth-basketball`) |

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → your cluster
2. **Database** → **Connect** → **Drivers**
3. Copy the connection string and paste as `MONGODB_URI` in `.env.local`
4. Replace `<db_password>` with your database user password
5. Add your IP to **Network Access** (or `0.0.0.0/0` for development)

Connection helper: `src/lib/db.ts` (`getDb()`)

### Gmail App Password

1. Enable 2FA on your Google account
2. Google Account → Security → App passwords
3. Generate password for "Mail"
4. Use as `SMTP_APP_PASSWORD`

## Adding Media

Place client-approved media in:

```
public/
  brand/          # Logo variants
  images/         # Organized by section (home, teams, camps, etc.)
  videos/         # hero-basketball.mp4 for homepage
```

See `MIGRATION_CHECKLIST.md` for full migration status.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
  app/            # Routes and API handlers
  components/     # UI, layout, forms, motion, galleries
  config/         # Site config, navigation, external links
  data/           # Structured content (programs, teams, news, etc.)
  lib/            # Mail, validation, SEO utilities
```

## Forms

- **Contact:** `POST /api/contact` — general inquiries
- **Booking:** `POST /api/booking` — training requests (not instant confirmation)

Both include honeypot spam protection and server-side Zod validation.

## Deployment

1. Set environment variables on your hosting platform
2. Add `NEXT_PUBLIC_SITE_URL` to your production domain
3. Upload client media to `public/` folders
4. Run `npm run build` to verify

## Notes

- No database, admin panel, or CMS — content lives in `src/data/` files
- Player names/rosters only published when client-approved
- No fake testimonials or statistics
