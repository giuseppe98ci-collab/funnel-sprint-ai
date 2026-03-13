# PRD — Funnel Sprint AI: Landing Page Low Ticket

## Overview
Landing page di vendita low ticket (€17) per "Funnel Sprint AI" — un sistema di 5 bot AI per creare il tuo marketing funnel completo. Sales page long-form (solo testo + immagini, NO VSL) + checkout + OTO + thank you.

**Target:** Marketer/infobusiness italiani che non sanno fare ads, copy, landing, VSL.

---

## Design System

### ⚠️ TEMA CHIARO (NON SCURO!)
Questa landing è in **versione CHIARA** — sfondo bianco/grigio chiaro.

### Colori
| Token | Hex | Uso |
|-------|-----|-----|
| `bg-primary` | `#FFFFFF` | Sfondo principale |
| `bg-secondary` | `#F8F9FA` | Sezioni alternate |
| `bg-accent` | `#F0F4FF` | Sezioni highlight |
| `text-primary` | `#1A1A2E` | Testo principale (scuro) |
| `text-secondary` | `#6B7280` | Testo secondario |
| `accent` | `#2563EB` | Blu accento (link, highlight) |
| `cta-primary` | `#10B981` | Verde CTA principale |
| `cta-hover` | `#059669` | Verde CTA hover |
| `danger` | `#EF4444` | Rosso (prezzo barrato, ❌) |
| `success` | `#10B981` | Verde (✅, vantaggi) |
| `price-badge` | `#FEF3C7` | Sfondo badge prezzo |

### Font
- **Heading:** Inter (Bold/Black)
- **Body:** Inter (Regular/Medium)

### Layout
- Sfondo bianco principale con sezioni alternate in grigio chiaro
- Stile simile a geniustradingaccademy.com/vsl ma CHIARO
- Max width contenuto: 800px (centrato)
- Padding sezioni: 80-100px verticale
- Mobile-first responsive
- Card con bordi sottili e shadow leggere

---

## Pagine

### PAGINA 1: Sales Page (`/`)

**Il copy COMPLETO è in `copy/sales-page-copy.md` — seguilo ESATTAMENTE, parola per parola.**

Struttura sezioni:
1. **Hero** — Headline + sub-headline + sotto-testo
2. **Social Proof Bar** — Placeholder loghi/numeri
3. **Problema** — Perché il target è bloccato
4. **Storia breve** — Chi è Giuseppe, cosa ha scoperto
5. **Soluzione** — I 5 bot + meccanismo self-improving
6. **Tabella Confronto** — ❌ metodo vecchio vs ✅ Funnel Sprint AI
7. **Stack Offerta** — FSO + cosa include + valore
8. **Benefici** — "Cosa sarai in grado di fare"
9. **Testimonianze x4** — Card con nome + risultato
10. **Bump Offer** — €40 Bot Creativo Gemini
11. **Prezzo + CTA** — €17 barrato €97
12. **Chi è Giuseppe** — Bio breve
13. **Garanzia** — 30 giorni soddisfatto o rimborsato
14. **Chiusura** — "La scelta è tua"
15. **FAQ** — Accordion 6-8 domande
16. **CTA finale**

### PAGINA 2: OTO (`/oto`)
- Banner "IL TUO ORDINE È IN FASE DI ELABORAZIONE"
- Copy OTO per consulenza revisione €147
- CTA: "Sì, aggiungi revisione" / "No grazie, procedi"

### PAGINA 3: Thank You (`/grazie`)
- Conferma acquisto
- Accesso al materiale
- Primo step da fare
- CTA soft: "Vuoi che facciamo tutto noi? Prenota una call" → backend €997

---

## Componenti UI

### CTA Button
- Testo dal copy (es. "CREA IL TUO TEAM AI — €17")
- Colore verde `#10B981`
- Animazione pulse leggera
- Link: placeholder `#checkout`
- Sotto al bottone: micro-copy "Accesso immediato • Garanzia 30 giorni"

### Tabella Confronto
- 2 colonne: ❌ Rosso vs ✅ Verde
- Card style con bordi arrotondati
- Mobile: stacked

### Stack Offerta
- Card per ogni elemento (5 bot + Business DNA + feedback loop)
- Icona/emoji + nome + descrizione breve
- Valore percepito a destra
- Totale valore vs prezzo reale

### Testimonianze
- Card con sfondo leggero
- Stelle ⭐⭐⭐⭐⭐
- Nome + ruolo/situazione
- Quote in corsivo

### FAQ Accordion
- Expand/collapse smooth
- Icona +/-

### Timer Countdown
- Stile urgenza (numeri grandi)
- "L'offerta scade tra..."

### Badge Garanzia
- Icona scudo / 30 giorni
- Design pulito, non troppo aggressivo

---

## Requisiti Tecnici

### Stack
- **Framework:** React 18+ con Vite
- **Styling:** Tailwind CSS v4
- **Deploy:** Vercel
- **Font:** Inter (Google Fonts)

### Performance
- Bundle < 200KB
- LCP < 2.5s
- Mobile-first (traffico Facebook Ads)
- Immagini ottimizzate

### Tracking (placeholder)
- Slot per Meta Pixel
- Slot per PostHog
- Eventi: PageView, ViewContent, InitiateCheckout, Purchase

---

## ⚠️ REGOLE CRITICHE

1. **COPY PAROLA PER PAROLA** — Il testo in copy/sales-page-copy.md va riprodotto ESATTAMENTE.
2. **TEMA CHIARO** — Sfondo bianco/grigio chiaro. NON scuro.
3. **NO VSL** — Nessun video. Solo testo + immagini + recensioni.
4. **RESPONSIVE** — Mobile-first. Traffico da Facebook = prevalentemente mobile.
5. **3 PAGINE** — Sales page (`/`) + OTO (`/oto`) + Thank You (`/grazie`)
6. **Stile pulito e moderno** — Ispirato a geniustradingaccademy.com/vsl ma in versione CHIARA.
