# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Indonesian recruiters, internship/graduate-program screeners, and campus
competition judges evaluating Sandy Kurnia Ramadhan — usually scanning on a laptop
in under three minutes, often comparing him against dozens of student portfolios.

Secondary: senior engineers and security practitioners who click through from
GitHub or LinkedIn and will open the repository links.

## Product Purpose

A single portfolio site that proves one specific claim: this person ships working
software across web, mobile, and desktop, and also understands how that software
breaks under attack. Success is a recruiter or engineer going from landing to a
repository or a sent message without ever asking "what does he actually do?"

## Positioning

The rare combination of builder and breaker: the same person who wrote the Laravel
application placed 2nd in a cyber CTF against that class of application. Network
operations (MTCNA), application security (CTF, web exploitation), and product
development (Laravel, Kotlin, Java) are evidenced by separate, dated artifacts —
not by an adjective.

## Operating Context

- Evaluated remotely; mobile and laptop both matter, often on a slow connection.
- Visitors arrive from LinkedIn, GitHub profile, and the CV PDF (which points to
  the site at sandykurniia.github.io/Portfolio).
- Repository links and live deployments are the deepest proof available; the site
  must route to them rather than replace them.
- Content is authored by Sandy alone; there is no CMS and no build step.

## Capabilities and Constraints

- Static site: plain HTML, CSS, and JavaScript. No framework, no bundler, no build
  step. Must stay deployable by copying files (GitHub Pages / Vercel).
- Contact form posts to a Formspree endpoint (`https://formspree.io/f/xanbvelg`)
  and must keep working as an AJAX submission with visible success and error states.
- All copy in Indonesian; technical terms, tool names, and job titles stay in their
  original form.
- Every claim must trace to the CV PDF in `dist/` or a public repository. Nothing
  invented: no client names, testimonials, metrics, or employment history.
- Assets are limited to the screenshots and photographs already in `dist/`.
  No new photographic or illustrative assets are available.

## Brand Commitments

- Legal name: Sandy Kurnia Ramadhan. Short mark: SKR.
- Voice: first person, technical, plain. No marketing superlatives.
- Tri-identity from the CV is binding: Network Engineer · Cyber Security ·
  Web & Mobile Developer. The site must not present him as a web developer only.
- Contact: sandybkng@gmail.com · 081363032647 · Rumbai, Pekanbaru, Riau.

## Evidence on Hand

Verified, quotable:

- **Education** — Politeknik Caltex Riau, Teknologi Rekayasa Komputer, 2023–2027,
  IPK 3.52.
- **Certifications** — MTCNA MikroTik (2026); Junior Mobile Programmer, BNSP (2026);
  Red Hat System Administration II RH134 (2025); Red Hat Academy Program Learner (2025).
- **Awards** — Juara II Cyber CTF Politeknik Caltex Riau (2026), categories: web
  exploitation, cryptography, forensics, reverse engineering. Juara III IDCloudCamp,
  IDCloudhost (2026).
- **Organizations** — Badan Legislatif Mahasiswa, Komisi 5 (Advokasi dan Aspirasi);
  HIMAKOM.
- **Projects** — Finlock (`Finlock-Aplikasi-Pencatatan-Keuangan`, Laravel 11 / PHP 8.4 /
  MySQL / Blade / Tailwind, created 2026-01-06); Sumatera Career Center
  (`SumateraCareerCenter`, Java desktop / JavaFX-or-Swing XML UI / SQLite–MySQL /
  Material, created 2025-08-09); Zona Bakat (`ZonaBakatApps`, Kotlin / Android Studio /
  Room / Material, created 2025-08-09); Widjaya Hotel (`ReservasiHotel`, PHP native /
  MySQL / Bootstrap, created 2025-08-09, Midtrans payment); Batik Sawit Nusantara
  (static HTML components, live at batik-sawit-nusantara.vercel.app, created 2026-03-07);
  Flowers (`Flowers`, pure-CSS animation study, created 2023-12-12).
- **Photographs** — `dist/Foto.jpg` (portrait), `dist/foto_sandy.jpg` (Lake Toba).
  Real, his own.
- **Screenshots** — `dist/Dashboard-UMKM.png`, `dist/SCC.png`, `dist/Zona_Bakat_Apps.png`,
  `dist/Reservasi.png`, `dist/Bunga_Mekar.jpeg`.
- **Links** — github.com/SANDYKURNIIA (10 public repos) ·
  linkedin.com/in/sandy-kurnia-ramadhan-703995280 · instagram.com/sandykurniia_

Absent — must not be fabricated: employment history, freelance clients,
testimonials, download counts, user numbers, revenue impact, team sizes.

## Product Principles

1. **Evidence over adjectives.** Every claim carries a date, a repository, a
   certificate, or a screenshot. If it cannot be sourced, it does not ship.
2. **The work leads.** Project evidence appears before biography; the interface
   recedes behind the artifacts.
3. **One identity, three disciplines.** Network, security, and development are
   presented as one practice, not as three skill cards competing for attention.
4. **Honest status.** He is a student through 2027 and says so plainly; ambition is
   shown through output, not through inflated seniority.
5. **Fits anywhere.** Ships as static files, loads fast on a campus connection,
   keeps a working form, and remains readable on the phone recruiters actually use.

## Accessibility & Inclusion

Body text at 4.5:1 or better; visible keyboard focus; form fields with real labels
and announced errors; motion respects `prefers-reduced-motion`; no information
carried by colour alone.
