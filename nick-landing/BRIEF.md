# BRIEF — 3 Landing Page Variants per Nick Parodi (Facebook Ads → Telegram)

## OBIETTIVO
Creare 3 landing page varianti per Nick Parodi (@nicktrading_) che servono come bridge tra Facebook Ads e il canale Telegram gratuito. L'utente clicca l'ad → atterra sulla landing → clicca CTA → entra nel canale Telegram.

## CTA LINK (TUTTE LE VARIANTI)
**https://t.me/+xm4vsqS5IwdkYWRk**

Il link porta al canale "Nick's Life" (32.010 iscritti) — Canale N1 in ITALIA su Geopolitica, economia e Finanza.

## INFORMAZIONI NICK PARODI
- **Nome:** Nick Parodi
- **Instagram:** @nicktrading_
- **Brand:** Genius Trading
- **Community:** 22.587+ membri attivi
- **Fondi gestiti:** 7+ milioni di dollari in conti finanziati
- **Persone aiutate:** 2.432+ nel trading
- **Esperienza:** 6+ anni
- **Canale Telegram "Nick's Life":** 32.010 iscritti
- **Focus canale:** Geopolitica, economia, finanza
- **Strategia automatizzata:** Sì (ha un sistema automatizzato per trading)
- **Trustpilot:** Attivo su nicktrading.club
- **Entity:** BrokerAutomation LLC

## STRUTTURA PROGETTO
```
nick-landing/
├── variant-a/    ← Stile VinciLeonardo (dark premium)
├── variant-b/    ← Stile Telegram (simula preview canale)
├── variant-c/    ← Mix creativo (nuovo design)
├── assets/       ← Immagini scaricate (nick, testimonial, reference)
├── scraped/      ← Contenuti scrapati dai siti reference
└── BRIEF.md      ← Questo file
```

Ogni variante è un progetto React + Vite + Tailwind standalone, deployabile separatamente su Vercel con 3 URL diversi per A/B test su PostHog.

## STACK TECNICO
- React 19 + Vite + Tailwind CSS
- Mobile-first (design pensato per mobile, Facebook Ads = traffico mobile)
- Animazioni: CSS native (no GSAP per semplicità e velocità loading)
- Font: Sofia Sans o Inter
- Deploy: Vercel (3 progetti separati)

---

## VARIANTE A — "VinciLeonardo Style" (Dark Premium)

### Reference: https://vincileonardo.com/mads/
### Screenshot: `assets/vinci-fullpage.png`

**Concetto:** Riprodurre la struttura e il design di vincileonardo.com ma **più figa, più interattiva, brandizzata per Nick**.

### Design System
- **Background:** Deep dark navy (#0a0e17) con radial gradient warm amber dal centro-top
- **Testo headline:** Serif font (Playfair Display), off-white/cream
- **Accent color:** Gold/amber (#c9a44e)
- **CTA button:** Teal/cyan (#1a7a6d), uppercase, bold
- **Vibe:** Premium, esclusivo, dark, sofisticato

### Sezioni (dall'alto al basso)
1. **Live Badge** — Pill badge "🔴 LIVE OGNI GIORNO" pulsante, gold background
2. **Avatar circolare** — Foto Nick (usa `assets/nick-photo.jpeg`), bordo gold/glow
3. **Nome** — "NICK PARODI" uppercase, letter-spacing ampio, gold muted
4. **Headline** — "Vuoi accedere al canale N1 in Italia su Geopolitica, Economia e Finanza?" (serif, grande, cream)
5. **Sub-headline** — "Unisciti a oltre 32.000 persone che seguono Nick Parodi ogni giorno — 100% gratuito" (sans-serif, muted gray-blue)
6. **Stats row** — 3 stats: "32.000+ iscritti" | "LIVE ogni giorno" | "100% gratuito"
7. **CTA Button** — "✈️ ACCEDI AL CANALE TELEGRAM GRATUITO" → link Telegram
8. **Link secondario** — "Non hai Telegram? Clicca qui — ti spiego come scaricarlo in 2 minuti"
9. **Social proof** — Griglia scrollabile con screenshot testimonial (usa `assets/testi-*.jpeg`)
10. **Secondo CTA** — Ripetizione CTA button
11. **Footer disclaimer** — Standard disclaimer trading

### Migliorie rispetto a VinciLeonardo
- Animazione fade-in staggered per ogni sezione
- Glow effect più pronunciato sull'avatar
- Stats con counter animation (numeri che salgono)
- Testimonial gallery con scroll orizzontale fluido
- Subtle particle/grain background effect
- Badge "LIVE" con pulse animation reale

---

## VARIANTE B — "Telegram Style" (Premium Telegram Preview)

### Reference: https://matteozanni.com/mads-2/
### Screenshot: `assets/matteozanni-fullpage.png`

**Concetto:** Simula la preview di un canale Telegram, ma più premium. L'utente NON deve capire che è uscito da Telegram. Deve sembrare una pagina nativa Telegram, ma migliorata.

### Design System
- **Background:** Gradient verde/sage (#a8b86a → #7aaa7a → #5a9a7a) con pattern Telegram (doodle icons outline bianche, bassa opacità)
- **Card:** Bianca, border-radius 16-20px, centrata, soft shadow
- **Button:** Telegram blue (#3390ec)
- **Font:** System font / SF Pro / Helvetica Neue (come Telegram)

### Sezioni (card centrata)
1. **Avatar circolare** — Foto Nick, ~110px, bordo bianco
2. **Nome** — "Nick's Life 🏎 📺" (come il canale reale), bold, 24-28px
3. **Subscriber count** — "32 010 iscritti" (formato europeo con spazio)
4. **Descrizione** — "Canale N1 in ITALIA su Geopolitica, economia e Finanza ‼️"
5. **CTA Button** — "ACCEDI AL CANALE" → link Telegram, Telegram blue, rounded, full-width nella card
6. **Testo sotto** — "Clicca sopra per accedere al canale di **Nick Parodi**."

### Migliorie rispetto a MatteaZanni
- Background pattern Telegram reale (doodle SVG con rotazione random)
- Avatar con leggero shadow/glow
- Card con micro-animazione fade-in + slide-up all'apertura
- Subscriber count con "✓" verified style
- Piccola animazione hover sul button (brightness + translateY)
- Footer: "© Nick's Life — Canale Telegram Gratuito" discreto sotto la card

### ⚠️ IMPORTANTE
NON far capire all'utente che è uscito da Telegram. La pagina deve sembrare una pagina nativa Telegram di preview canale, solo più curata e premium.

---

## VARIANTE C — "Mix Creativo" (Telegram + Dark Premium)

### Reference: Mix di entrambi i siti
**Concetto:** Design nuovo e creativo che unisce l'atmosfera dark premium di VinciLeonardo con elementi Telegram. Lasciare spazio alla creatività ma mantenere:

### Linee guida
- Dark background ma con accenti Telegram blue
- Card component (come Telegram) ma con dark theme
- Avatar + stats + social proof
- Telegram doodle pattern ma con colori dark/neon
- Più sezioni della Variante B ma meno della A
- Feeling moderno, tech, fintech

### Sezioni suggerite
1. **Hero** — Dark bg, avatar Nick con glow, nome + headline forte
2. **Stats** — 3-4 stats in card trasparenti (iscritti, anni esperienza, fondi gestiti)
3. **Telegram preview card** — Mini preview del canale (stile Telegram embedded nella pagina dark)
4. **CTA** — Button grande, blue neon/glow effect
5. **Testimonial strip** — Scroll orizzontale mini thumbnails
6. **Final CTA** — Ripetizione con urgency text

### Design
- Background: #0a0e17 con subtle gradient
- Accent: Telegram blue (#3390ec) + gold hints
- Cards: Glass morphism (backdrop-blur, border subtle)
- Font: Inter o Sofia Sans
- Animazioni: Fade-in, parallax leggero, glow effects

---

## IMMAGINI DISPONIBILI in `assets/`

### Nick Parodi
- `nick-hero.png` — Hero banner dal sito
- `nick-photo.jpeg` — Foto profilo Nick
- `nick-banner.png` — Banner con testo

### Automatizzazione
- `auto-1.png` / `auto-2.png` / `auto-3.png` / `auto-4.png` — Grafiche strategia automatizzata

### Testimonial/Risultati (da nicktrading.club)
- `testi-1.jpeg` → `testi-12.jpeg` — Screenshot risultati clienti

### VinciLeonardo Reference
- `vinci-reference.jpg` — Foto Leonardo
- `vinci-result-1.jpg` → `vinci-result-20.jpg` — Screenshot risultati (reference struttura)

### Preview Telegram
- `/Users/giuseppe/.openclaw/media/inbound/file_269---653ceef8-798e-4b76-ba66-5ada161148ae.jpg` — Preview canale Nick's Life

### Screenshots reference
- `vinci-fullpage.png` — Screenshot completo vincileonardo.com
- `matteozanni-fullpage.png` — Screenshot completo matteozanni.com
- `nicktrading-fullpage.png` — Screenshot completo nicktrading.club

---

## CONTENUTO NICK (da nicktrading.club)

### Bio
- Ho fondato e costruito una community dedicata al trading che oggi conta oltre 22.587 membri attivi
- Insieme al mio team, ho gestito con successo più di 7 milioni di dollari in conti finanziati
- Negli ultimi due anni ho aiutato oltre 2.432 persone a generare redditi significativi grazie al trading e ai Conti Finanziati
- Con oltre 6 anni di esperienza, ho sviluppato strategie che ti aiutano a ottenere risultati reali nei mercati, riducendo i rischi e aumentando i profitti
- Ho avuto l'onore di collaborare con professionisti con decenni di esperienza nei fondi di investimento

### Copy per headlines (da adattare)
- "Canale N1 in ITALIA su Geopolitica, economia e Finanza"
- "Accedi gratuitamente al canale dove oltre 32.000 persone seguono Nick Parodi ogni giorno"
- "Il canale Telegram più seguito in Italia su finanza e geopolitica"

---

## DEPLOY
Ogni variante va deployata come progetto Vercel separato:
```bash
VERCEL_TOKEN="$(cat ~/.config/vercel/token)"
cd variant-a && npx vercel --prod --yes --token="$VERCEL_TOKEN"
cd variant-b && npx vercel --prod --yes --token="$VERCEL_TOKEN"
cd variant-c && npx vercel --prod --yes --token="$VERCEL_TOKEN"
```

## VERIFICA POST-DEPLOY
1. Aprire ogni URL su mobile (Chrome DevTools mobile view)
2. Verificare CTA → deve aprire t.me/+xm4vsqS5IwdkYWRk
3. Verificare animazioni fluide
4. Verificare loading speed < 2s
5. Screenshot e invio a Giuseppe per approvazione
