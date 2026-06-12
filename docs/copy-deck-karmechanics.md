# COPY DECK — karmechanics.com Storefront (T-PORT-02)

**Version:** 1.0 · **Date:** 2026-06-12
**Author:** Jonas Weber (mkt-content-jonas), Content & Brand Marketing Manager
**Source plan:** Luca repo `change-management/DOMAIN-PORTFOLIO-MONETIZATION-REPORT-2026-06-11.md` §4 Launch 1
**Language:** en-US only. No hreflang, no locale variants.
**Compliance:** No persona/app/module counts. No speed claims. No invented testimonials, clients, or outcomes. The $450 / 67% / ~$108K figures are industry findings and must stay phrased that way — never as our results. Every voice plan discloses AI + recording on-call.
**Placeholders the builder must NOT resolve:** `[[DEMO-NUMBER]]` (provisioned in 02V), `[[FORWARDING-INSTRUCTIONS]]` (per-carrier copy lands with onboarding), `[[COUNSEL-REVIEW]]` (legal pages ship only after counsel sign-off).

---

## GLOBAL: Shared UI strings

### Navigation (header, in order)
- How it works → `/#how-it-works`
- Pricing → `/#pricing`
- FAQ → `/#faq`
- Sign in → `/dashboard/`

### Header CTA button
- Label: `Start free trial` → `/signup/`

### Footer
- Tagline line: `KarMechanics — your shop's phone, answered.`
- Demo line: `Hear it yourself: [[DEMO-NUMBER]]`
- Link column (Legal): Privacy (`/privacy/`) · Terms (`/terms/`)
- Compliance line: `Calls are answered by an AI assistant with an automatic recording disclosure. No contracts — cancel anytime from your dashboard.`
- Trust line: `Built and operated by Gus IT LLC — NVIDIA Inception member with an enterprise-infrastructure background.`
- Legal-entity line: `KarMechanics is a product of Gus IT LLC, a Florida (USA) limited liability company.`
- Contact line: `gus@gusit.de`
- Copyright: `© 2026 Gus IT LLC. All rights reserved.`

### Shared form strings
- Required-field legend: `* Required field`
- Email validation error: `Please enter a valid email address.`
- Generic submit error: `Something went wrong. Try again — or email gus@gusit.de and a human will sort it out.`
- Submitting state: `One sec…`

---

## PAGE: `/` (home)

### Hero
- H1: `You fix cars. We answer the phone.`
- Subhead: `Every missed call is a repair order driving to the shop down the street. Forward your line to KarMechanics: it picks up 24/7, gets the vehicle, the problem, and a callback number, then texts you the summary. You stay under the hood.`
- CTA primary: `Call the demo line — talk to it` → `tel:[[DEMO-NUMBER]]` (display the number next to the button)
- CTA secondary: `Start free trial` → `/signup/`
- Microcopy under CTAs: `The demo line is the actual product, not a recording. Call [[DEMO-NUMBER]] and ask it about a brake job.`

### The math (`#the-math`)
**Section heading:** `Do the math on a missed call`
**Intro:** `These are industry findings, not our numbers — but it's your phone they're describing.`

Stat cards (3):
1. Stat: `$450` — Caption: `the average repair order riding on a single call, per industry estimates`
2. Stat: `67%` — Caption: `of callers who hit voicemail don't leave a message — industry research says they just call the next shop`
3. Stat: `~$108K/yr` — Caption: `what industry studies estimate a shop loses to unanswered calls`

**Closing line:** `You don't need more leads. You need to stop leaking the ones already calling you.`

### How it works (`#how-it-works`)
**Section heading:** `How it works`

**Step 1 — Forward your line**
`Keep your number — nothing ports, nothing changes with your carrier. You get a dedicated KarMechanics number and forward your shop line to it: always, only when busy, or only after hours. We send plain instructions for every major carrier.`

**Step 2 — KarMechanics answers**
`It greets callers with your shop's name, tells them up front it's an AI assistant and that the call is recorded, then asks what a service writer would ask: year, make, model, what's going on, name, and the best callback number. Hours and basic info come from your settings.`

**Step 3 — You get a text summary**
`Seconds after hang-up, your phone buzzes: vehicle, issue, callback number, and whether it sounded urgent. The recording and transcript are in your dashboard. Call back when your hands are clean.`

### Plans (`#plans`)
**Section heading:** `Three plans. One job: stop going silent.`

**Plan 1 — Live Answer**
- Tagline: `Every call, day and night.`
- Bullets:
  - `Answers 24/7 — lunch rush, lift time, Sunday morning`
  - `Captures vehicle, issue, name, and callback number on every call`
  - `Text summary to your phone the moment the call ends`
  - `Recordings and transcripts in your dashboard`
  - `100 talk minutes a month included, then $0.25/min`

**Plan 2 — After-Hours Answer**
- Tagline: `You take days. We take nights.`
- Bullets:
  - `The same AI answering — only when you're closed`
  - `Nights, weekends, holidays covered`
  - `Walk in to a queue of callbacks instead of hang-ups`
  - `100 talk minutes a month included, then $0.25/min`

**Plan 3 — Missed-Call Text-Back**
- Tagline: `No AI voice. Just never go silent.`
- Bullets:
  - `SMS only — when a call goes unanswered, the caller instantly gets a text from your shop`
  - `"Sorry we missed you — what's the vehicle and what's going on?"`
  - `Replies land in your dashboard and on your phone`
  - `No minutes, no metering — flat price`

### Pricing table (`#pricing`)
**Section heading:** `Pricing`
- Billing toggle labels: `Monthly` · `Annual`
- Annual badge: `2 months free`
- Row 1: `Live Answer` — monthly: `$20/mo` — annual: `$200/yr`
- Row 2: `After-Hours Answer` — monthly: `$10/mo` — annual: `$100/yr`
- Row 3: `Missed-Call Text-Back` — monthly: `$5/mo` — annual: `$50/yr`
- Minutes line: `Voice plans include 100 talk minutes a month, then $0.25 per minute. Metered, on your bill — no surprise tiers, no upsell calls.`
- Trial line: `Every plan starts with a 7-day free trial. Card required, nothing charged until day 8. Trial voice minutes are capped at 25.`
- No-contract line: `No contracts. Cancel anytime, self-serve, from your dashboard.`
- Table CTA (per plan): `Start free trial` → `/signup/`

### Trust block
`KarMechanics is built and operated by Gus IT LLC — an NVIDIA Inception member with an enterprise-infrastructure background. Questions go to gus@gusit.de and get answered.`

### FAQ (`#faq`)
**Section heading:** `Straight answers`

**Q1:** `Does it sound robotic?`
`Call [[DEMO-NUMBER]] and judge for yourself — the demo line is the exact system your customers would reach. It speaks naturally, handles interruptions, and asks the questions a good service writer asks. It also tells every caller it's an AI assistant, because that's honest — and in some states, required.`

**Q2:** `What happens when a caller wants a human?`
`It never pretends to be one. If a caller asks for a person, it says you're with a customer, takes the full message, and texts you immediately, flagged "asked for you." You decide whether that's a call-back-now or a call-back-at-five.`

**Q3:** `What about call recording laws?`
`Handled by default. Every call opens with a short automatic disclosure that the caller is speaking with an AI assistant and that the call is recorded. The disclosure is built for two-party-consent states and can't be switched off. Recordings and transcripts stay in your dashboard.`

**Q4:** `Can I keep my number?`
`Yes. Your number stays exactly where it is, with your carrier. You forward it to your KarMechanics number — fully, when busy, or on a schedule — and you can unforward anytime. Nothing to port, nothing to undo.`

**Q5:** `What counts against my minutes?`
`Connected talk time on AI-answered calls, on the two voice plans. 100 minutes a month are included; after that it's $0.25 per minute. Text summaries don't cost minutes. Missed-Call Text-Back has no minutes at all — it's SMS only.`

**Q6:** `How do I cancel?`
`From your dashboard, in two clicks. No contracts, no cancellation call, no retention script. If something didn't work, tell us — our default is to refund, not to argue.`

**Q7:** `Can I use it only after hours?`
`That's exactly what the $10 After-Hours Answer plan is for. Forward your line when you lock up — or set a forwarding schedule with your carrier — and your daytime phone stays 100% yours.`

**Q8:** `What's Missed-Call Text-Back?`
`The $5 plan, and the simplest one: no AI voice at all. When a call to your shop goes unanswered, the caller immediately gets a text asking for the vehicle and the problem. Industry research says most voicemail callers won't leave a message — but most people will answer a text. Their replies come straight to you.`

### Final CTA block
- Heading: `The next missed call is on its way.`
- Body: `Don't take a website's word for how it sounds. Call the demo line, try to stump it, then decide.`
- CTA primary: `Call [[DEMO-NUMBER]] — talk to it` → `tel:[[DEMO-NUMBER]]`
- CTA secondary: `Start free trial` → `/signup/`

---

## PAGE: `/signup/`

- H1: `Pick a plan. Start your trial.`
- Intro: `7 days free on every plan. Card required, nothing charged until day 8. Cancel from your dashboard anytime.`

### Plan picker (radio cards)
- Option 1: `Live Answer` — sub: `24/7 answering · 100 min/mo` — price label: `$20/mo` / `$200/yr`
- Option 2: `After-Hours Answer` — sub: `Nights, weekends, holidays · 100 min/mo` — price label: `$10/mo` / `$100/yr`
- Option 3: `Missed-Call Text-Back` — sub: `SMS only, no AI voice` — price label: `$5/mo` / `$50/yr`
- Billing toggle labels: `Monthly` · `Annual` — annual badge: `2 months free`

### Form
- Email field — Label: `Email` (required) — placeholder: `you@yourshop.com`
- Submit button: `Start 7-day free trial`
- Card note (under button): `We ask for a card to keep trials honest and toll-fraudsters off the line. You won't be charged until your trial ends — and canceling takes two clicks, not a phone call. Trial voice minutes are capped at 25.`
- Payment handoff note (microcopy): `Payment is handled by Stripe's secure checkout. We never see or store your card number.`

### Post-checkout messages
- Success heading: `You're in.`
- Success body: `Check your inbox — your sign-in link and setup instructions are on the way. First job: forward your shop line. It's in the email.`
- Success CTA: `Go to your dashboard` → `/dashboard/`
- Cancel heading: `Checkout canceled.`
- Cancel body: `Your card wasn't charged. Your plan choice is saved on this page whenever you're ready.`
- Cancel CTA: `Back to pricing` → `/#pricing`

---

## PAGE: `/dashboard/` (post-login shell)

### Magic-link login (logged-out state)
- H1: `Sign in to KarMechanics`
- Body: `No passwords here. Enter the email you signed up with and we'll send you a sign-in link.`
- Email field — Label: `Email` (required) — placeholder: `you@yourshop.com`
- Button: `Email me a sign-in link`
- Sent state: `Link sent — check your inbox. It's good for 15 minutes.`
- Unknown-email error: `That email isn't on a plan. Use the address you signed up with — or start a free trial.` (link `start a free trial` → `/signup/`)

### Dashboard navigation
- `Calls` · `Usage` · `Account`

### Calls tab
- Empty state heading: `No calls yet — forward your shop line to get started.`
- Empty state body: `[[FORWARDING-INSTRUCTIONS]]`
- Call row labels: `Caller` · `Vehicle` · `Issue` · `When` · `Recording` · `Transcript`
- Urgent flag label: `Sounded urgent`
- Asked-for-human flag label: `Asked for you`

### Usage tab
- Meter heading: `This billing cycle`
- Meter string: `{used} of {included} minutes used`
- Labels: `Minutes used` · `Minutes included` · `Overage`
- Overage string: `{n} overage minutes × $0.25 = {amount}`
- Reset string: `Resets on {date}`
- Text-back plan note: `Your plan is SMS-only — no minutes to meter.`

### Account tab
- Plan label: `Your plan`
- Billing button: `Manage billing` (→ Stripe customer portal)
- Cancel link: `Cancel plan` — confirm copy: `Cancel at the end of this billing period? Your number forwarding keeps working until then. No fees, no phone call.` — confirm button: `Yes, cancel` — keep button: `Keep my plan`

---

## PAGE: `/privacy/`

> `[[COUNSEL-REVIEW]]` — SHORT placeholder. Builder ships it marked draft; counsel finalizes before paid launch. Structure mirrors the gusit.de privacy policy, adapted to a voice product.

- H1: `Privacy Policy`
- Date line: `Last updated: June 2026 — draft pending legal review`

**Body (verbatim, placeholder):**

`KarMechanics is operated by Gus IT LLC, a Florida (USA) limited liability company ("we"). Contact for all privacy matters: gus@gusit.de.`

`What we process: your account email; call recordings and transcripts from calls answered on your line (stored so you can review them in your dashboard); SMS notifications we send to you and, on the text-back plan, to your callers; and billing data handled by Stripe — we never see or store card numbers.`

`Call recordings: every answered call begins with an automatic disclosure that the call is with an AI assistant and is recorded. Recordings and transcripts are stored for your account and are not sold or used to advertise to anyone.`

`Your controls: you can export or delete your call recordings, transcripts, and account data from your dashboard at any time. Deleting your account removes your stored call data after a short wind-down period.`

`Hosting and analytics: this site is served via Cloudflare Pages (server logs for security and delivery) and uses cookieless, aggregate analytics — no marketing pixels, no third-party trackers.`

`[[COUNSEL-REVIEW]]: retention periods, processor list (Stripe, Twilio, Cloudflare, AI inference provider), state-privacy-law disclosures (incl. CCPA), and recording-consent language by state.`

---

## PAGE: `/terms/`

> `[[COUNSEL-REVIEW]]` — SHORT placeholder, same handling as `/privacy/`.

- H1: `Terms of Service`
- Date line: `Last updated: June 2026 — draft pending legal review`

**Body (verbatim, placeholder):**

`KarMechanics is a subscription service of Gus IT LLC (Florida, USA). By subscribing you agree to these terms.`

`Subscriptions and trials: plans bill monthly or annually through Stripe. Every plan starts with a 7-day free trial; a card is required and nothing is charged until the trial ends. Trial voice usage is capped at 25 minutes.`

`Metering: voice plans include 100 talk minutes per month; additional connected talk time bills at $0.25 per minute on your next invoice. The text-back plan is unmetered SMS.`

`Cancellation and refunds: cancel anytime from your dashboard, effective at the end of the billing period — no contracts, no cancellation fees. If the service didn't work as described, tell us: our default is to refund.`

`Beta service level: KarMechanics is in its beta period. We work hard to keep it answering, but we do not yet offer a formal uptime SLA. Don't use it as your only path for emergencies.`

`Acceptable use: your line, your callers, lawful use only — no resale of minutes, no use of the service to record calls without the built-in disclosure.`

`[[COUNSEL-REVIEW]]: liability cap, dispute venue, recording-law allocation of responsibility, AI-disclosure obligations by state, and refund-policy wording.`

---

## PAGE: 404

- H1: `Wrong turn.`
- Body: `This page doesn't exist — but the shop's still open. Head back home, or call the demo line and talk to the product instead of a website.`
- Button primary: `Go to homepage` → `/`
- Button secondary: `Call the demo line: [[DEMO-NUMBER]]` → `tel:[[DEMO-NUMBER]]`

---

## SEO METADATA (all pages)

> Builder note: `og:site_name` = `KarMechanics`, `og:locale` = `en_US` on all pages. OG image: pending brand assets — ship without `og:image` rather than with a placeholder graphic.

### `/`
- Meta title: `KarMechanics — AI Phone Answering for Auto Repair Shops`
- Meta description: `Forward your shop line. KarMechanics answers 24/7, captures the vehicle, the issue, and a callback number, and texts you the summary. From $5/mo. Call the demo line and talk to it.`
- OG title: `You fix cars. We answer the phone.`
- OG description: `AI answering for auto repair shops: 24/7 pickup, vehicle + issue + callback captured, summary texted to you. From $5/mo — call the demo line and talk to it.`

### `/signup/`
- Meta title: `Start Your 7-Day Free Trial — KarMechanics`
- Meta description: `Pick a plan — Live Answer $20/mo, After-Hours $10/mo, or Missed-Call Text-Back $5/mo. 7-day free trial, card required, cancel anytime.`
- OG title: `Start your 7-day free trial`
- OG description: `Live Answer $20/mo · After-Hours $10/mo · Missed-Call Text-Back $5/mo. Card required, nothing charged until day 8.`

### `/dashboard/`
- Meta title: `Dashboard — KarMechanics`
- Meta description: none — set `robots: noindex` (logged-in surface).

### `/privacy/`
- Meta title: `Privacy Policy — KarMechanics`
- Meta description: `How KarMechanics (Gus IT LLC) handles your data: call recordings and transcripts, SMS notifications, Stripe billing, and your export and delete rights.`
- OG title: `Privacy Policy — KarMechanics`
- OG description: `Call recordings, transcripts, SMS, Stripe billing — and your export and delete rights.`

### `/terms/`
- Meta title: `Terms of Service — KarMechanics`
- Meta description: `Subscription terms for KarMechanics: 7-day trial, metered minutes, cancel anytime, refund-by-default, beta service level.`
- OG title: `Terms of Service — KarMechanics`
- OG description: `7-day trial, metered minutes, cancel anytime, refund-by-default, beta service level.`

### 404
- Meta title: `Page Not Found — KarMechanics`
- Meta description: none — set `robots: noindex`.

---

## BUILDER NOTES (non-copy, do not render)

1. `[[DEMO-NUMBER]]` appears in: hero CTA + microcopy, footer demo line, FAQ Q1, final CTA block, 404 secondary button. Render every instance as both visible text and a `tel:` link. Token resolves in 02V — block publish while unresolved.
2. `[[FORWARDING-INSTRUCTIONS]]` (dashboard Calls empty state) arrives with onboarding copy; ship the heading and leave the body slot wired.
3. `/privacy/` and `/terms/` ship with the `draft pending legal review` date lines and `[[COUNSEL-REVIEW]]` blocks intact — they must remain visible in source until counsel signs off; resolve before paid launch.
4. Pricing strings are bound to live Stripe test prices ($20/$200, $10/$100, $5/$50, $0.25/min overage, 100 min included, 7-day trial, 25-min trial cap). Any price change goes through this deck, not ad-hoc edits.
5. The trust line ships as plain text — no NVIDIA logo until badge-usage approval is confirmed.
6. Stat phrasing in "the math" must stay attributed to industry findings/research. Never reframe as KarMechanics results or customer outcomes.

— End of copy deck. Jonas Weber (mkt-content-jonas), for review by Marta Keller (mkt-vp-marta).
