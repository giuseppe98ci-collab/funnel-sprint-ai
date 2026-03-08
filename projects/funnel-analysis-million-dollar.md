# 📊 Analisi Funnel — Million Dollar Book Method
## Reference Design per Funnel Low-Ticket Americano

**Autore funnel:** Ryan Wegner  
**Prodotto:** The Million-Dollar Book Method (ebook + bonus)  
**Prezzo front-end:** $4.99 (da $97)  
**Target:** Coach, consulenti, service provider  
**Tipo:** Self-Liquidating Offer (SLO) / Loss-leader book funnel  
**Pagine PDF:** 5 (pagine lunghissime, scroll verticale — equivalenti a ~30+ schermate)

---

## 1. 🎨 PALETTE COLORI

### Colori Primari
| Ruolo | Colore | Hex Approssimativo | Uso |
|-------|--------|---------------------|-----|
| **Oro/Gold** (primario brand) | Oro muted/tan | `#C4A95B` / `#C9A84C` | CTA button, badge "FREE!", prezzo, accenti headline, checkmark, connettori |
| **Nero/Charcoal** (testo + sfondi dark) | Nero profondo | `#1A1A1A` / `#222222` | Sfondo hero, card bonus, testo body |
| **Bianco** | Bianco puro | `#FFFFFF` | Sfondo sezioni light, testo su dark |

### Colori Secondari
| Ruolo | Colore | Hex Approssimativo | Uso |
|-------|--------|---------------------|-----|
| **Crema/Ivory** (sfondo pagina) | Crema caldo | `#F7F5EF` / `#F5F0E8` | Background principale sezioni sales letter |
| **Verde scuro** (CTA alternativo) | Forest green | `#2D7D46` / `#2D4A2D` | Bottone CTA sidebar destra |
| **Navy scuro** (badge "New Way") | Navy/charcoal | `#2C3E50` / `#1E2D3D` | Badge flowchart "The New Way" |

### Colori Accento
| Ruolo | Colore | Hex Approssimativo | Uso |
|-------|--------|---------------------|-----|
| **Rosso** (negativo/pain) | Rosso medio | `#E74C3C` / `#D9534F` | Icone ❌, cerchi highlight screenshot |
| **Verde** (positivo/trust) | Verde brillante | `#4CAF50` / `#2E8B57` | Icone ✅, shield garanzia, "Succeeded" nei payment proof |
| **Grigio/Beige** (muted, "Old Way") | Grigio-beige | `#B8B0A0` / `#C4BBA8` | Badge "Old Way" nel confronto |

### Gradienti
- **CTA Gold:** da `#D4BC7C` a `#B8A060` (gradiente sottile orizzontale)
- **Hero section:** Sfondo nero con raggi diagonali semi-trasparenti (spotlight effect) `#333333` → `#444444`

---

## 2. ✏️ TIPOGRAFIA

### Font Principali
| Tipo | Famiglia | Peso | Uso |
|------|----------|------|-----|
| **Display/Headline** | Serif bold condensato (tipo Playfair Display Black o DM Serif Display) | 800-900 (Extra Bold/Black) | Headline principali, sezioni titolo |
| **Body Copy** | Serif leggibile (tipo Georgia, Lora, o sistema serif) | 400 (Regular) | Testo narrativo, sales letter |
| **UI/Badge** | Sans-serif clean (tipo Inter, Open Sans, Lato) | 600-700 (Semi-Bold/Bold) | Badge, CTA button, nav bar, form |

### Gerarchia Tipografica
| Livello | Stile | Dimensione | Peso | Case | Colore |
|---------|-------|------------|------|------|--------|
| **H1 — Hero headline** | Serif display, italic | 40-50px | Black (900) | UPPERCASE | Bianco + Oro |
| **H2 — Section headline** | Serif display | 32-40px | Extra Bold (800) | UPPERCASE | Nero |
| **H3 — Sub-section** | Serif display | 28-36px | Bold (700) | UPPERCASE | Nero |
| **Body text** | Serif | 16-18px | Regular (400) | Sentence case | Nero `#1A1A1A` |
| **Bold emphasis** | Serif | 16-18px | Bold (700) | Sentence case | Nero |
| **CTA primary** | Sans-serif | 22-24px | Bold (700) | UPPERCASE | Bianco |
| **CTA secondary** | Sans-serif | 13-14px | Regular (400) | Sentence case | Bianco |
| **Badge/pill text** | Sans-serif | 12-14px | Bold (700) | UPPERCASE | Bianco |
| **Small trust text** | Sans-serif | 12-13px | Regular (400) | Sentence case | Grigio `#666666` |
| **Pre-headline pill** | Sans-serif | 13-14px | Medium (500) | UPPERCASE, letter-spacing largo | Bianco |

### Pattern Tipografici
- **Line-height body:** 1.6-1.8 (molto generoso, alta leggibilità)
- **Paragrafi ultra-corti:** 1-3 frasi max per paragrafo
- **Spaziatura paragrafi:** 20-28px (doppio rispetto al normale)
- **Bold strategico:** Frasi chiave boldate come "pattern interrupt" per chi scansiona
- **Italic:** Usato per domande retoriche e citazioni testimonial
- **Ellipsis (...):** Usato alla fine di quasi ogni paragrafo per mantenere momentum

---

## 3. 📐 STRUTTURA PAGINA — Layout e Flow

### Layout Generale
```
┌──────────────────────────────────────────────┐
│              NAVBAR (dark, full-width)         │
│  [Logo oro] MILLION-DOLLAR BOOKS    [Email]   │
├──────────────────────────────────────────────┤
│           PRE-HEADLINE PILL (gold)            │
│     "NEW BOOK REVEALS A COUNTERINTUITIVE..."  │
├──────────────────────────────────────────────┤
│           HERO HEADLINE (serif italic)        │
│    "I'LL SHOW YOU HOW TO WRITE A SHORT BOOK"  │
│         + "OR YOUR MONEY BACK" (gold)         │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │   VIDEO PLAYER   │  │  PRODUCT CARD    │  │
│  │   (~60% width)   │  │  (~35% width)    │  │
│  │                   │  │  - Price $4.99   │  │
│  │                   │  │  - From $97      │  │
│  │                   │  │  - Email form    │  │
│  │                   │  │  - CTA GOLD      │  │
│  │                   │  │  - Trust badges  │  │
│  └─────────────────┘  └──────────────────┘  │
│                                              │
├──────────── TWO-COLUMN BODY ─────────────────┤
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │   SALES COPY     │  │  STICKY SIDEBAR  │  │
│  │   (~60% width)   │  │  (~40% width)    │  │
│  │                   │  │                  │  │
│  │  - Pain points ❌ │  │  - TOC bullets   │  │
│  │  - Benefits ✅    │  │  - Pricing       │  │
│  │  - Old vs New Way │  │  - CTA button    │  │
│  │  - Story/proof    │  │  - Testimonials  │  │
│  │  - Value stack    │  │  - Chat screens  │  │
│  │  - Bonus cards    │  │                  │  │
│  │  - FAQ inline     │  │  [STICKY/SCROLL] │  │
│  │  - Guarantee      │  │                  │  │
│  └─────────────────┘  └──────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│              FOOTER (minimal, dark bar)        │
└──────────────────────────────────────────────┘
```

### Flow delle Sezioni (Top → Bottom)

#### PAGINA 1 — Hook + Intro
1. **Navbar** — Logo oro + email supporto, sfondo dark
2. **Pre-headline pill** — Badge gold con testo "NEW BOOK REVEALS..."
3. **Hero Headline** — Serif italic grande, promessa principale + "OR YOUR MONEY BACK" in oro
4. **Sub-headline** — "No creating freebies, no posting on social media..."
5. **Video + Product Card** — Layout 60/40, video a sinistra, card acquisto a destra
6. **Sales Copy** — Inizio narrativa, pain points con ❌
7. **Benefits list** — Cosa otterrai con ✅
8. **Mid-page CTA** — Bottone gold + trust badges
9. **"Old Way vs New Way"** — Confronto visuale flowchart (8 step vs 3 step)
10. **Video Testimonials** — 4 video con quote sotto

#### PAGINA 2 — Proof + Value Stack
11. **Payment screenshots** — Stripe dashboard con cerchi rossi sui numeri
12. **Copy esplicativa** — Come funziona il modello economico
13. **High-ticket proof** — Screenshot transazioni $4K-$12K
14. **CTA ripetuto** — Stesso design gold
15. **Video testimonial grandi** — Paul Hardin, Jonny Collins, Elliott Rayne (formato card con badge nome)
16. **"INTRODUCING..."** — Presentazione prodotto con stats (21 sezioni, 120 pagine, 1 sistema)
17. **Feature callouts** — 6 benefit intorno al mockup libro (3+3)
18. **VALUE STACK** — 8 prodotti in card layout 2 colonne con prezzo barrato + "FREE!"
19. **Sales letter** — "From The Desk of Ryan Wegner" formato lettera

#### PAGINA 3 — Story + Social Proof Massivo
20. **Continuation copy** — Promessa "20+ HIGH-TICKET CLIENTS"
21. **Pain points ripetuti** — Con ❌ (diversi dalla prima lista)
22. **"SO LET ME PROVE IT TO YOU"** — Bridge ai testimonial
23. **Screenshot chat** — Discord, iMessage, Facebook (Lisa $15K, Doug $15K, Gary $3K, Kristen $170K, Mallory $12.8K, Travis $35K, Olga $30K/mese)
24. **Identity framing** — "Paul, Kristen, Jonny, Elliott & Doug are part of a group..."
25. **Client Acquisition Spiral of Doom** — Diagramma flowchart verticale (8 step negativi)
26. **Origin story** — "I almost gave up... but I tried something..."

#### PAGINA 4 — Content Preview + Bonuses
27. **Photo collage** — 8-9 foto lifestyle dell'autore (viaggi, scuba, etc.)
28. **"New Way" flowchart** — 3 step gold con freccia tratteggiata
29. **"Sneak Peek" bullets** — 24+ bullet points con riferimenti pagina (pag 7-111)
30. **CTA ripetuto**
31. **Bonus card: AI Book Builder** — Card dark con mockup, valore $97 → FREE
32. **"There's No Catch"** — Sezione gestione obiezioni

#### PAGINA 5 — Close + Guarantee
33. **Scarcity copy** — "THIS WON'T LAST LONG..."
34. **Price justification** — Perché $4.99 invece di $97
35. **Bonus: Audiobook** — Card dark, valore $37 → FREE
36. **Guarantee section** — Badge 100% + "365-DAY" watermark
37. **Guarantee details** — Step-by-step: compra, leggi, applica, rimborso se non soddisfatto
38. **CTA FINALE** — Bottone gold + trust badges
39. **Footer minimal** — Barra dark, nessun link visibile

---

## 4. 🎯 ELEMENTI DI CONVERSIONE

### CTA Buttons
| Posizione | Colore | Testo Primario | Testo Secondario | Shape |
|-----------|--------|----------------|-------------------|-------|
| Hero (sidebar) | Gold gradient `#C9A84C` | "INSTANT ACCESS ➜" | "365-Day Money Back Guarantee" | Rounded rect ~8-10px radius |
| Mid-page (left) | Gold gradient | "INSTANT ACCESS ➜" | "Get The Book & Bonuses For Just $4.99" | Rounded rect, ~400-500px wide |
| Sidebar (right) | Dark green `#2D7D46` | "INSTANT ACCESS ➜" | "365-Day Money Back Guarantee" | Rounded rect |
| Finale | Gold gradient | "INSTANT ACCESS ➜" | "Get The Book & Bonuses For Just $4.99" | Pill shape, ~300-350px, 80-90px tall |

**Pattern CTA:** Testo sempre bianco, uppercase, con icona freccia (➜). Sempre seguiti da: shield verde + testo garanzia + loghi carte di pagamento.

### Form
- **Input email:** Background bianco, bordo grigio chiaro `#CCCCCC`, rounded corners ~6-8px, altezza ~45-50px
- **Placeholder:** "Your Best Email (To Send Your Book)" con icona casa verde a destra
- **Posizione:** Solo nella sidebar destra hero

### Pricing & Anchoring
- **Prezzo anchor:** "$97.00" con ~~strikethrough~~
- **Prezzo attuale:** "$4.99" in oro grande (48-56px)
- **Risparmio:** "YOU'RE SAVING $92!" in badge bordato
- **Urgency:** "Offer Ending on Nov 7, 2025!" in pill beige
- **Total value stack:** $1,516 di valore → $4.99

### Value Stack (8 prodotti)
| Prodotto | Valore Dichiarato | Prezzo |
|----------|-------------------|--------|
| Million-Dollar Book Method | $97.00 | $4.99 |
| Audiobook | $37.00 | FREE |
| Scaling Calculator | $297.00 | FREE |
| Book Launch Checklist | $97.00 | FREE |
| 7-Day Book Masterclass | $297.00 | FREE |
| 15-Minute AI Book Builder | $97.00 | FREE |
| 7-Figure Funnel Breakdowns | $97.00 | FREE |
| Private VIP Community | $497.00 | FREE |
| **TOTALE** | **$1,516.00** | **$4.99** |

### Trust Badges & Garanzia
- **Garanzia:** 365 giorni money back (eccezionalmente lunga)
- **Badge visuale:** Sigillo circolare nero/oro con "100% MONEY BACK SATISFACTION GUARANTEE"
- **Watermark:** "365-DAY GUARANTEE" gigante e semi-trasparente come sfondo
- **Loghi pagamento:** Visa, Mastercard, Discover, American Express
- **Stripe:** Badge "Powered by Stripe"
- **Lock icon:** 🔒 "Guaranteed safe & secure checkout"

### Social Proof
- **4 video testimonial** con quote sotto (formato player con speaker icon oro)
- **3 video testimonial grandi** con badge nome oro (Paul Hardin, Jonny Collins, Elliott Rayne)
- **7+ screenshot chat** da Discord, iMessage, Facebook con numeri evidenziati
- **2 screenshot Stripe** dashboard con transazioni cerchiate in rosso
- **Claim escalation:** $3K → $15K → $20K → $35K → $50K → $170K → $400K → "millions"

---

## 5. ✍️ COPY APPROACH

### Headline Formulas
1. **Main promise + guarantee:** "I'LL SHOW YOU HOW TO [result] OR YOUR MONEY BACK"
2. **Counterintuitive hook:** "NEW BOOK REVEALS A COUNTERINTUITIVE METHOD..."
3. **Transformation:** "FROM [pain state] TO [dream state]"
4. **Proof bridge:** "SO LET ME PROVE IT TO YOU..."
5. **Content tease:** "HERE'S A SNEAK PEEK OF WHAT YOU'LL DISCOVER..."
6. **Value stack:** "HERE'S EXACTLY WHAT YOU'RE GETTING FOR JUST $4.99..."
7. **Urgency:** "THIS WON'T LAST LONG..."
8. **Identity:** "PAUL, KRISTEN, JONNY... ARE PART OF A GROUP OF HIGH-LEVEL COACHES"

### Tone of Voice
- **Conversazionale e diretto** — "Cool, right?", "Crazy, right?", "Yes, seriously..."
- **Colloquiale strategico** — "stupid stuff", "where the hell your next client is coming from"
- **Prima persona** — Tutto scritto come lettera personale ("I", "me", "my")
- **Confidenziale** — Parentesi sussurrate: "(Even though their businesses continue to grow...)"
- **Trasparente sul modello** — Spiega apertamente come funziona il business model

### Objection Handling
| Obiezione | Come la gestisce |
|-----------|------------------|
| "Non so scrivere un libro" | AI Book Builder (15 min), ghostwriting (pag 42), 7-Day Masterclass |
| "Ci vuole troppo tempo" | "Write your book in 7 days", "15 minutes" con AI |
| "Non ho soldi per ads" | "50-100 copies for FREE", sistema che si ripaga |
| "È troppo bello per essere vero" | "Now, maybe that sounds too good to be true... SO LET ME PROVE IT" |
| "Perché così economico?" | Sezione "THERE'S NO CATCH!" — spiega strategia loss-leader |
| "Ci saranno costi nascosti?" | "No hidden continuity program" esplicito |
| "E se non funziona?" | Garanzia 365 giorni + "keep everything" |
| "Non ho tempo per leggere" | Audiobook gratuito |

### Power Words Ricorrenti
`counterintuitive`, `finally`, `predictably`, `effortlessly`, `automatically`, `instantly`, `proven`, `system`, `method`, `million-dollar`, `high-ticket`, `dream clients`, `clockwork`, `scale`, `freedom`

### Bullet Point Style ("Fascination Bullets")
- **Formula:** [Curiosità/tease] + [beneficio implicito] + **(page XX)**
- Esempio: "The two numbers that will guarantee the success (or failure) of your funnel – get these right and you'll get more clients than you ever dreamed of... (page 62)"
- Pattern: mai rivela il "cosa", solo il "perché ti serve"
- 24+ bullets con riferimenti pagina da 7 a 111

---

## 6. 🎨 DESIGN PATTERN

### Spaziature
| Elemento | Valore |
|----------|--------|
| Spaziatura tra paragrafi | 20-28px |
| Spaziatura tra sezioni | 48-60px |
| Spaziatura tra bullet items | 20-24px |
| Padding interno card | 30-40px |
| Margini contenuto laterali | ~250px dal bordo pagina |
| Max-width contenuto | 600-680px |
| Altezza CTA button | 70-90px |
| Line-height body | 1.6-1.8 |

### Bordi e Arrotondamenti
- **CTA buttons:** border-radius 8-10px (rounded rect) o 30-40px (pill)
- **Card bonus:** border-radius 8-10px, sfondo dark
- **Pre-headline pill:** border-radius completo (capsule)
- **Form input:** border-radius 6-8px, bordo 1px grigio chiaro
- **Badge prezzo/risparmio:** bordo sottile oro/dark, rounded

### Ombre
- **Product card hero:** Soft drop shadow
- **Screenshot proof:** Subtle rounded corners + light shadow
- **CTA buttons:** Subtle drop shadow per profondità
- **General:** Ombre molto leggere, usate con parsimonia

### Effetti Speciali
- **Hero spotlight:** Raggi diagonali semi-trasparenti su sfondo nero
- **Photo collage:** Foto stile polaroid con bordo bianco e rotazione casuale
- **Hand-drawn arrows:** Frecce nere disegnate a mano che puntano ai numeri chiave
- **Red circles:** Cerchi rossi "fatti a mano" sugli screenshot per evidenziare cifre
- **Dashed curve arrows:** Frecce tratteggiate nere stile sketch nei flowchart
- **Watermark guarantee:** Testo "365-DAY GUARANTEE" gigante a opacità 10-15% come sfondo
- **Speaker icon oro:** Cerchio oro 30-35px con icona speaker bianca sui video

### Background Alternation
```
DARK (#1A1A1A) — Hero, intro
DARK (#1A1A1A) — Sales copy + sidebar
CREAM (#F7F5EF) — Sales letter, story, testimonials
DARK (#1A1A1A) — Bonus cards (inline)
CREAM (#F7F5EF) — Continuazione
DARK (#1A1A1A) — Bonus cards
CREAM (#F7F5EF) — Guarantee, close
DARK (#333333) — Footer
```

### Card Bonus Design
- Sfondo dark `#1A1A1A` con rounded corners
- Mockup prodotto a sinistra (~40%)
- Copy a destra (~60%)
- Footer bar con: 👍 "GET INSTANT ACCESS!" | "VALUE: ~~$XX~~ | **FREE!**"
- "INSTANT" in oro, resto in bianco
- Badge "FREE!" in rettangolo arrotondato oro

### Video Testimonial Design
- **Formato piccolo (sidebar):** Player con speaker icon oro top-right, progress bar, timestamp, quote italic sotto
- **Formato grande (full-width):** Thumbnail video, quote in label bianche ruotate leggermente (effetto "tape"), play button overlay, badge nome oro + "Million-Dollar Book Method Reader"

---

## 7. 🧠 TECNICHE PERSUASIVE

### 1. Price Anchoring (Ancoraggio di prezzo)
- Valore totale dichiarato: **$1,516**
- Prezzo singolo prodotto: ~~$97~~ → **$4.99**
- Risparmio esplicito: "$92 TODAY!"
- Ogni bonus mostra valore barrato → FREE

### 2. Scarcity & Urgency (Scarsità e urgenza)
- "Offer Ending on Nov 7, 2025!" (data specifica)
- "THIS WON'T LAST LONG..."
- "Start Reading in The Next 2 Minutes" (immediacy)
- Prezzo giustificato come temporaneo

### 3. Social Proof (Prova sociale) — MASSIVO
- **Piattaforme multiple:** Discord, iMessage, Facebook, Stripe — impossibile sembrare fake
- **Valute diverse:** USD + GBP = audience internazionale
- **Escalation dei risultati:** $3K → $15K → $50K → $170K → $400K → "millions"
- **Diversità demografica:** Uomini/donne, età diverse, etnie diverse
- **Formato "raw screenshot":** Non polish = autenticità
- **L'autore risponde:** Engagement personale nei chat = mentore presente

### 4. Authority (Autorità)
- **Risultati personali:** 3 business a 7 cifre
- **Lifestyle proof:** Collage foto viaggi, casa pagata in contanti, auto dei sogni
- **Trasparenza del modello:** Mostra dashboard Stripe reali
- **"From The Desk of Ryan Wegner"** — formato lettera autorevole
- **Understatement:** "You probably haven't heard of me. That's by design." (anti-guru positioning)

### 5. Risk Reversal (Inversione del rischio)
- **365 giorni** di garanzia (vs standard 30-60)
- **"Keep everything"** anche se chiedi rimborso
- **"No questions asked"**
- **"No weird hoops to jump through"**
- Rapporto assurdo: 365 giorni garanzia per $4.99

### 6. Reciprocity (Reciprocità)
- 7 bonus gratuiti ($1,419 di "valore") in cambio di $4.99
- Trasparenza totale sul metodo ("I don't hold anything back")
- Community VIP gratuita
- Audiobook incluso

### 7. Contrast/Dichotomy (Contrasto)
- **"Old Way vs New Way"** — 8 step dolorosi vs 3 step semplici
- **"Client Acquisition Spiral of Doom"** vs il metodo
- **Grigio/beige (vecchio)** vs **Nero/oro (nuovo)**
- **Rosso ❌ (problemi)** vs **Verde ✅ (soluzioni)**

### 8. Identity-Based Selling (Vendita basata sull'identità)
- "Dear Coach, Consultant or Service Provider" — auto-selezione
- Nominare i testimonial per nome → "Are you part of this group?"
- "High-level coaches & consultants who are doing things different"
- "Million-Dollar Book Method Reader" (label aspirazionale)

### 9. Future Pacing
- "Imagine getting 50-100 new customers every day..."
- "What life could look like for you, too..."
- "Exactly how your business will look when you get this in place"
- Foto lifestyle come proiezione del futuro del lettore

### 10. Transparency/Anti-Marketing
- Spiega apertamente il modello SLO (self-liquidating offer)
- "I realize this is very inexpensive and I'm practically giving it away"
- Ammette che vuole costruire una relazione per vendere di più in futuro
- Questa trasparenza paradossalmente aumenta la fiducia

### 11. Open Loops & Curiosity
- Ellipsis (...) alla fine di quasi ogni paragrafo
- Fascination bullets che teases senza rivelare
- "But before you do... I'd like to introduce myself"
- Page numbers nei bullets = "devo comprare per scoprire pagina 62"

### 12. Pain-Pleasure Framework
- **Prima:** Elenca tutto il dolore (ads che non funzionano, DM ignorati, no-show)
- **Poi:** Offre il sollievo (automazione, clienti che vengono da te, libertà)
- **Formula:** ❌ Stop doing [pain] → ✅ Start doing [pleasure]

---

## 8. 📋 RIEPILOGO PER REPLICAZIONE

### Struttura Essenziale da Replicare
```
1. HOOK: Pre-headline pill + Hero headline bold serif italic + Sub-headline
2. MEDIA: Video + Product card side-by-side
3. PAIN: Lista pain points con ❌
4. BENEFIT: Lista benefici con ✅
5. COMPARE: Old Way vs New Way (flowchart visuale)
6. PROOF: Video testimonial + Screenshot chat/payment
7. STORY: Origin story dell'autore (vulnerabilità → soluzione)
8. METHOD: Spiegazione del sistema con screenshot proof
9. CONTENT: Fascination bullets con page references
10. VALUE STACK: Prodotto + 7 bonus con prezzo barrato → FREE
11. BONUS CARDS: Card dark con mockup + valore
12. OBJECTION: "There's No Catch!" + spiegazione trasparente
13. GUARANTEE: Badge visuale 365-day + copy dettagliato
14. CTA MULTIPLI: Almeno 4-5 posizionamenti nel page flow
15. FOOTER: Minimale, nessuna distrazione
```

### CTA Ripetuti (Almeno)
1. Hero sidebar
2. Dopo benefits list
3. Dopo value stack
4. Dopo "sneak peek" bullets
5. Dopo guarantee (finale)

### Regole Design Chiave
- **Max 2-3 frasi per paragrafo** — mai muri di testo
- **Bold su frasi chiave** — per chi scansiona
- **Alternare dark/light sections** — ritmo visivo
- **Ogni testimonial = piattaforma diversa** — autenticità
- **Numeri specifici ovunque** — "50-100", "20+", "15 minutes", "7 days"
- **Nessun menu di navigazione** — zero distrazioni, solo conversion
- **Footer minimale** — nessun link di fuga

---

*Analisi completata il 7 Marzo 2026 — Reference per progetti funnel low-ticket.*
