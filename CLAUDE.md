@AGENTS.md

# Austin Sleep & Airway Health

## Project overview

This repository is a rebuild of austinsleephealth.com for Austin Sleep & Airway Health (ASAH), the dental sleep and airway practice of Dr. Kacie Culotta in Austin, Texas. It is a marketing site built with Next.js App Router and TypeScript, styled with Tailwind CSS v4, statically generated, and deployed on Vercel. Brand fonts are self hosted and shared UI primitives plus a typed site config in lib/site.ts give every worker a common foundation to build pages against.

## Hard rules

These rules are not optional. They apply to page copy, component code, code comments, docs, and commit messages.

1. No em dashes anywhere. Use commas, colons, or periods instead. This includes code comments, strings, documentation, and commit messages.
2. No diagnostic language. This site does not diagnose. Quizzes and questionnaires are educational screenings, never diagnostic tests. Do not imply that a screening confirms or rules out a condition.
3. No outcome guarantees. Do not promise results, cures, or guaranteed improvement.
4. Never disparage CPAP. Oral appliance therapy is presented as an option, not as superior to or a replacement that puts down CPAP.
5. No health data in third party trackers. Do not send any health related user input, quiz answers, or symptom data to analytics or other third party tracking.
6. hello@austinsleephealth.com is the only email address that appears anywhere on the site.

## Design tokens

Brand colors, defined in app/globals.css. Never introduce colors outside this set.

- sage #5E8472, primary brand green
- forest #49665A, dark green, headings
- terracotta #D17960, primary accent, CTAs
- salmon #F09B85, secondary accent, soft backgrounds
- gold #CCA257, small highlights only
- cream #F5F5F0, alternating section backgrounds
- ink #0A0A0A, body text
- white #FFFFFF

Fonts, self hosted with next/font/local, no Google Fonts CDN.

- Super Clarendon Bold, headline font, exposed as font-display and the css variable --font-clarendon
- Mona Sans variable, body font, exposed as font-sans and the css variable --font-mona

Type scale utility classes are defined in app/globals.css: text-display, text-h1, text-h2, text-h3, text-eyebrow, text-body, text-small.

## Multi-Agent Work

This rebuild is executed by multiple workers in parallel. The coordination contract, roles, output schema, and hand off rules are documented in ORCHESTRATION_STANDARD.md at the repo root. Read it before starting any worker task. Component prop signatures and usage examples live in docs/components-api.md so workers can code against the primitives without reading their source.
