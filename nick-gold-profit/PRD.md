# PRD — Nick Gold Profit System Funnel

**Author:** Giuseppe  
**Date:** 2026-03-07  
**Version:** 1.0 DEFINITIVA

---

## 1. Overview

Sales funnel per il "Gold Profit System" di Nick Parodi. Low-ticket (17€) con bump offer (27€) e OTO (67€). Tre pagine: Sales Page, Checkout, Offerta Speciale (OTO).

## 2. Pages

| Route | Pagina |
|-------|--------|
| `/` | Sales Page |
| `/checkout` | Checkout + Bump |
| `/offerta-speciale` | OTO (Cerebro Room) |

## 3. Design System

### 3.1 Colors
- **Background primary:** `#0D0D0D`
- **Background secondary:** `#1A1A1A`
- **Background card:** `rgba(255,255,255,0.03)` con `backdrop-blur`
- **Gold primary:** `#C4A95B`
- **Gold light:** `#E5D4A1`
- **Gold gradient:** `linear-gradient(135deg, #C4A95B, #E5D4A1)`
- **Text primary:** `#FFFFFF`
- **Text secondary:** `#B0B0B0`
- **Text muted:** `#777777`
- **Red (barrato):** `#EF4444`
- **Green (check):** `#22C55E`
- **Border card:** `rgba(196, 169, 91, 0.3)`

### 3.2 Typography
- **Headline font:** `'Biennale', system-ui, -apple-system, 'Segoe UI', sans-serif` — weight 800
- **Body font:** `'Inter', system-ui, sans-serif` — 16px base, line-height 1.7
- **Gold gradient text CSS:**
  ```css
  background: linear-gradient(135deg, #C4A95B, #E5D4A1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```

### 3.3 Components
- **CTA Button:** bg `#C4A95B`, text `#000`, font-bold, rounded-lg, shimmer animation (pseudo-element sweep), hover scale 1.05
- **Card (glassmorphism):** `bg-white/[0.03] backdrop-blur-md border border-[rgba(196,169,91,0.3)] rounded-2xl`
- **Section alternation:** odd `#0D0D0D`, even `#111111`, with subtle radial gold glow
- **Badge sicurezza:** lock icon + text, small, muted gold
- **Timer:** countdown display with gold accent

### 3.4 Effects
- Shimmer on CTA (keyframe translateX sweep)
- Fade-in on scroll (IntersectionObserver)
- Pulse animation on CTA
- Sticky header with backdrop-blur
- FOMO notification popup (bottom-left)

## 4. Sales Page — Sezioni in Ordine

### 4.1 Header Sticky
- Logo text "Gold Profit System" (gold gradient)
- Right: "Serve aiuto? supporto@goldprofitsystem.com"
- Sticky top, backdrop-blur, border-bottom gold/20

### 4.2 Hero
- Pre-headline: "Per chi vuole iniziare a guadagnare con il trading sull'oro"
- **Headline:** "Come guadagnare dai 300€ ai 500€ a Settimana facendo trading 30 minuti al giorno sull'asset più capitalizzato al mondo… l'oro"
- **Subheadline:** "Genera dai 300€ ai 500€ a settimana con il trading copiando i segnali di un esperto con 17 milioni di euro in gestione e 3 anni di risultati verificati — in soli 30 minuti al giorno"
- **Sotto:** "Senza analisi tecnica, passare ore davanti ai grafici, rischiare di bruciare il conto, e anche se non hai mai fatto trading o hai un piccolo capitale"
- Mockup placeholder (gold-bordered image container, 16:9 aspect ratio)

### 4.3 "Cos'è il Gold Profit System?"
- Titolo sezione gold gradient
- Body text esatto dal copy doc
- Bullet list con check icons gold

### 4.4 CTA Box #1
- Timer countdown (dynamic)
- Prezzo: ~~97€~~ → **SOLO 17€** (risparmi 80€)
- CTA button "ACCEDI ORA A SOLI 17€"
- Form placeholder (nome, email)
- Badge sicurezza (SSL, pagamento sicuro, garanzia)

### 4.5 "Intervistato da:"
- Row di loghi media placeholder (glassmorphism boxes)

### 4.6 "Cosa dicono di Nick"
- Grid 2-3 colonne di testimonianze (placeholder cards)
- Nome, testo, stelle

### 4.7 Storytelling Nick
- "Gold Profit System è una scorciatoia"
- Story: da 5€ a 17M gestiti
- Copy esatto dal task

### 4.8 Comparison Table
- "Altre strategie vs Gold Profit System"
- Tabella con ❌ e ✅
- Glassmorphism card

### 4.9 "Cosa significa per te..."
- "Cosa significa per te avere accesso al Gold Profit System nel 2026..."
- Lista ❌ (senza) e ✅ (con)

### 4.10 "MOSTRAMI LE PROVE"
- Seconda sezione testimonianze

### 4.11 Value Stack
- "ECCO COSA RICEVI + 3 BONUS GRATUITI"
- Prodotto principale: Sala segnali Gold (mockup placeholder)
- BONUS 1: Trading da telefono
- BONUS 2: Zero Risk Protocol
- BONUS 3: Piccolo capitale, grandi risultati
- Ogni item: glassmorphism card con mockup image placeholder e descrizione

### 4.12 CTA Box #2
- Identico a CTA Box #1

### 4.13 "Sarà l'ultimo sistema..."
- Copy esatto closing argument

### 4.14 "Cosa ottieni accedendo adesso"
- Dettagli 4 prodotti con immagini placeholder
- Cards grid

### 4.15 "Chi è Nick Parodi?"
- Bio con bullet points (→)
- Foto placeholder
- Glassmorphism card

### 4.16 Garanzia
- "Soddisfatto o Rimborsato — 30 giorni"
- Shield icon, gold border card

### 4.17 "Ora la scelta è tua..."
- Copy closing esatto

### 4.18 FAQ
- 8 domande accordion
- Expand/collapse con animazione

### 4.19 CTA Finale
- Ultimo CTA box con prezzo

## 5. Checkout Page (`/checkout`)

- Left: Order summary
- Right: Payment form (placeholder)
- Bump offer checkbox: "SÌ! Aggiungi anche la Sala Crypto (BTC & ETH) per soli 27€ invece di ~~97€~~"
- Copy bump esatto dal doc
- Badge sicurezza
- Design reference: 100xcoinclub checkout

## 6. OTO Page (`/offerta-speciale`)

- Headline: "Congratulazioni, ce l'hai fatta!"
- Copy esatto dal doc
- Cerebro Room Exclusive — ~~197€~~ → **67€**
- CTA: "Aggiungi Cerebro Room" (gold button)
- Skip: "No grazie, preferisco operare solo sull'oro" (text link)
- Timer urgenza

## 7. Tech Stack

- React 18+ with Vite
- Tailwind CSS v4
- React Router DOM v6+
- No external UI libraries
- Vercel-ready (static SPA with client-side routing)

## 8. File Structure

```
nick-gold-profit/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── (placeholder images)
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── pages/
│   │   ├── SalesPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── OtoPage.jsx
│   └── components/
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── CtaBox.jsx
│       ├── FaqSection.jsx
│       ├── TestimonialGrid.jsx
│       ├── ValueStack.jsx
│       ├── ComparisonTable.jsx
│       ├── CountdownTimer.jsx
│       ├── FomoPopup.jsx
│       └── GoldCard.jsx
└── vercel.json
```

## 9. Non-Functional

- Lighthouse perf > 90
- Mobile-first responsive
- All text in Italian
- SEO meta tags
- No external API calls
- `npm run build` must pass clean

## 10. Asset Strategy

- Product mockups: CSS-styled placeholder cards with gold gradients and icons (beautiful, not flat)
- Testimonial avatars: placeholder initials or generic avatar
- Media logos: placeholder gray boxes with text
- All can be replaced with real images later
