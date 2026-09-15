# GameZone Arena — Modern Game Zone Capstone

A Vercel-ready Next.js capstone starter for a recreation venue with:
- Bowling, pool, sim racing, VR, air hockey and a supervised digital Target Challenge
- Slot-based booking request form
- Google Sheets booking ledger
- Gemini-powered website-only AI assistant
- Security headers, server-only secrets, validation and basic rate limiting
- Responsive premium UI

## Architecture

Browser → Next.js UI → server route `/api/bookings` → Google Sheets
Browser → Next.js UI → server route `/api/chat` → Gemini API

**Important:** this project is security-focused, but no application can honestly be guaranteed "100% vulnerability-free". Before production, run dependency auditing, a code review, and penetration/security testing.

## 1. Install

```bash
npm install
npm run dev
```

## 2. Environment variables

Copy `.env.example` to `.env.local`.

Never put `GEMINI_API_KEY`, Google service-account credentials, or other secrets in client components or variables beginning with `NEXT_PUBLIC_`.

Vercel environment variables are encrypted at rest; use Vercel's sensitive environment variable option for secrets.

## 3. Gemini

Create a Gemini API key and set:

`GEMINI_API_KEY=...`

Recommended model in this starter:

`GEMINI_MODEL=gemini-3.8-flash`

The key is used only by `/api/chat`, so it is not shipped to the browser.

## 4. Google Sheets

Create a Google Cloud project and enable Google Sheets API.

Create a service account. Share the target Google Sheet with the service account email as an editor.

Create a JSON credential file locally, then base64 encode the JSON and put the resulting single-line value into:

`GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`

Set:

`GOOGLE_SHEET_ID=...`
`GOOGLE_SHEET_NAME=Bookings`

Create a sheet tab named `Bookings`.

Suggested header row:

`Booking ID | Created At | Name | Email | Phone | Date | Time | Game ID | Game | Players | Total | Status`

## 5. Deploy to Vercel

Push the repository to GitHub, import it into Vercel, add the same environment variables to the Production environment, then deploy.

Do not commit `.env.local` or service-account JSON files.

## Security notes

- API secrets are server-only.
- No secret is prefixed with `NEXT_PUBLIC_`.
- Zod validates booking/chat input.
- Server routes limit request size through schema limits.
- Basic per-IP rate limiting is included.
- Security response headers are configured.
- Booking data is never passed to the AI assistant.
- AI system instructions explicitly prohibit prompt disclosure, secret disclosure, internal-data disclosure and pretending to confirm bookings.
- Google Sheet is treated as a staff ledger. For serious high-traffic production, use a database with a unique constraint/transaction for slot locking and sync confirmed bookings to Sheets.

## Important booking limitation

The sample checks the Sheet before appending. Two requests arriving simultaneously can still race. For a real venue, use a transactional database as the booking authority and mirror rows into Google Sheets.

## Suggested next upgrades

- Admin authentication with MFA
- PostgreSQL/Vercel Marketplace database as source of truth
- Real slot availability API
- Payment provider after confirming age/legal requirements and business compliance
- Email/SMS confirmations
- Cancellation workflow
- Audit logs
- CAPTCHA/Turnstile
- Distributed rate limiting (e.g. a managed Redis provider)
- Automated dependency/security scanning in CI
