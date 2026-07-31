I read through the whole site — Hero, About, Projects, Skills, Experience, Contact, the project data, routing, and the WebGL background.
  The honest verdict: the visual craft is genuinely strong (the animation polish, floating previews, and the project write-ups'
  problem→solution framing are better than most student/junior portfolios). What's holding it back isn't design — it's credibility details,
  performance weight, and a few content choices that a recruiter will notice in the first 60 seconds. Here's the critique, ordered by impact:

  Credibility issues (fix these first — they cost you interviews)

  1. The "4 Years Experience" claim doesn't survive scrutiny (Experience.jsx:56). Your own timeline shows: B.Sc. 2022–2026 (still a student),
  one 3-month contract in 2025, and a cyber café ops role. A recruiter who reads the card below the number will feel misled — and being
  caught inflating one number makes them discount everything else. Replace it with a stat you can defend: "11 projects shipped", "3 apps in
  production use" (AutoBite at KPLC is genuinely impressive — lead with that), or "5+ real clients/organizations served."
  2. 5 of 11 projects say "In Development", and 2 of them sit in your top-4 default view. The first four projects are your storefront.
  Reorder so the default view is all shipped work with live links: CrochetHub, Minnie Miss, AutoBite, Kiu Fresh. AutoBite is your single best
  story (enterprise client, real deployment, full stack) and it's currently buried at #07 behind class projects.
  3. The copy has a strong AI/marketing flavor in places, and technical readers are increasingly allergic to it: "velocity-first productivity
  tool," "a case study in UI friction," "Ship Excellence // No compromises," "results-driven." Worst offender: Onyx's feature list literally
  says "Demonstrates initiative: most portfolio projects have a client or a course requirement behind them. This one has neither." — that's
  telling, not showing, written as a bullet point where a feature should be. Rewrite in plain first person with concrete specifics. "Handles
  M-Pesa STK Push callbacks and updates order status in under 2 seconds" beats any adjective.
  4. Naming inconsistency: the repo/folder is "derek-portfolio", GitHub is "J-Derek", the site says "Derrick Macharia". Fine, but make sure
  the CV PDF, meta tags, and GitHub display name all agree on one spelling — recruiters do search your name.
  5. No LinkedIn link anywhere, and "Schedule Call" is actually just a tel: link (Contact.jsx:73) — misleading label. Either wire up a real
  scheduler (Cal.com is free) or rename it "Call Me". Add LinkedIn; for many recruiters it's the first thing they look for.

  Performance (this actively hurts you)

  6. You're shipping three.js + @react-three/fiber + drei to render 80 particles. That's roughly 500–700 KB of gzipped JS for a background
  effect a recruiter may never notice. On Kenyan mobile networks especially, this is your biggest real-world problem. Options, best to
  acceptable:
    - Rewrite the particle field in a plain <canvas> 2D loop (~80 lines, zero dependencies — 80 drifting dots don't need WebGL).
    - At minimum, React.lazy() the DynamicBackground so the rest of the page paints first.
  7. sharp is in dependencies — it's a build-time image tool and belongs in devDependencies (or nowhere, if unused).
  8. ~5 MB of PNGs in logos + screenshots. Convert to WebP (you literally have sharp installed), and add loading="lazy" + explicit dimensions
  to project images.
  9. No route-level code splitting — ProjectDetail is eagerly imported in main.jsx:7. Lazy-load it.
  10. The preloader delays first contentful paint on every first visit. Combined with the three.js payload, your Lighthouse score is likely
  rough. Consider cutting it entirely — the hero's letter-stagger animation already provides an entrance moment.

  SEO / sharing

  11. No Open Graph or Twitter meta tags at all in index.html. When you share this portfolio on LinkedIn/WhatsApp/X — which is the whole
  point — there's no preview image, title, or description. Add og:title, og:description, og:image (a nice screenshot of the hero), and
  twitter:card. This is 15 minutes of work with outsized payoff.
  12. No sitemap.xml/robots.txt, and project detail pages should each get their own Helmet title/description (worth checking
  ProjectDetail.jsx).

  Design / content polish

  13. Section numbering is broken: About is "01 // Expertise", Projects "02", Skills "03", Contact "05" — 04 is skipped, and Experience has
  an unnumbered "Career Path" label. Make Experience "04 // Career Path".
  14. The hero subtitle uses a literal | character ("Full Stack Developer | UI/UX Designer") as a word in the stagger array — typographically
  it reads as a leftover separator. Use a styled middot or split it into two lines.
  15. "Contact Info" is a weak CTA — it describes a noun, not an action. "Get in touch" or "Let's talk" performs better. Also consider making
  "View my work" the primary CTA instead of "Download CV" — you want them scrolling, not leaving into a PDF.
  16. "Professional Values" as a skills category (Leadership, Teamwork, Time Management...) reads like a CV filler section and dilutes the
  strong technical categories around it. Cut it — your project write-ups already demonstrate those traits.
  17. The About section's const developer = {...} code card is a well-worn portfolio cliché at this point. If you keep the card, make it
  real: your actual GitHub contribution graph, or a terminal showing real commands from a real project.

  What's already good — keep it

  - The problem → solution → features structure in projects.js is excellent and rare; most portfolios just list tech stacks.
  - Kenya-specific context (M-Pesa integration, KPLC, Daystar) is a differentiator, not a limitation — it shows you ship for real users with
  real constraints. Lean into it harder.
  - MotionConfig reducedMotion="user", touch-aware custom cursor, session-scoped preloader — thoughtful details.
  - The floating hover preview and the editorial table layout for projects are genuinely tasteful.

  If you only do three things: (1) reorder projects so the top 4 are shipped work with AutoBite near the top and fix the "4 years" stat, (2)
  kill or lazy-load the three.js background and compress images, (3) add OG meta tags + a LinkedIn link. Those move it from "impressive
  student site" to "hire this person."

  Want me to implement any of these? I'd suggest starting with the quick wins (meta tags, project reorder, sharp→devDeps, lazy loading) which
  I can do in one pass.

✻ Cogitated for 2m 3s

※ recap: I reviewed your portfolio and delivered a full critique: strongest fixes are reordering projects so shipped work like AutoBite
  leads, replacing the "4 Years Experience" claim, cutting the heavy three.js background, and adding OG meta tags. Next: tell me which fixes
  to implement. (disable recaps in /config)