# BRIEF — The Wealthy SMM Landing Page (Low Ticket Funnel)

## Cliente
**Marinela Marku** — Fondatrice SMM Academy
- Ex cameriera → SMM sottopagata → consulente strategica da 10K+/mese
- Ha seguito 200+ SMM nel riposizionamento premium
- Target: Social Media Manager italiani sottopagati (300-500€/mese per cliente)

## Prodotto
**The Wealthy SMM** — Mini-corso 7 lezioni (~90 min totale)
- **Prezzo:** 7€ (invece di 97€)
- **Promessa:** Passare da SMM sottopagato a consulente strategico da 2.000-5.000€/mese per cliente
- **Metodo:** Riposizionamento in 3 step (da esecutore a consulente strategico che vende risultati)
- **Garanzia:** 30 giorni soddisfatti o rimborsati

## 5 Bonus Inclusi (valore 685€)
1. **Client Magnet Map** (97€) — 7 settori profittevoli, dove trovare clienti premium, red flag
2. **Closing Script Pack** (147€) — Script copia-incolla per obiezioni (costa troppo, ci devo pensare, ecc.)
3. **The SMM Automation Toolkit** (197€) — 10 prompt AI, content calendar, framework caption/reels
4. **The 7-Day Repositioning Sprint** (97€) — Piano d'azione 7 giorni step-by-step
5. **The Premium Proposal Blueprint** (147€) — Template proposta professionale premium

## Upsell
SMM Academy — coaching avanzato (menzionato in FAQ, non spinto nella landing)

## Copy
Il copy COMPLETO è in `COPY.md` — USALO ESATTAMENTE come scritto.
Le sezioni sono:
1. **Hero** — headline + sub-headline + mockup corso + CTA
2. **Cos'è The Wealthy SMM** — spiegazione metodo 3 step
3. **Shortcut story** — storia personale Marinela (cameriera → 10K/mese)
4. **Bonus section** — 5 bonus dettagliati con valore
5. **Chi è Marinela Marku** — bio con bullet points credibilità
6. **Testimonianze** — Sara (800→11K), Luca (quasi mollato), Giulia (genitori ridevano)
7. **Long-form sales letter** — "Caro futuro membro..." (storia completa, pain points, soluzione)
8. **Ruota del Criceto del SMM** — analogia potente
9. **Errore #1** — vendere tempo vs valore
10. **Modello The Wealthy SMM** — da esecutore a consulente
11. **7 Lezioni dettagliate** — breakdown corso
12. **Bullet points "Ecco cos'altro scoprirai"**
13. **Garanzia 30 giorni**
14. **FAQ** — 7 domande frequenti
15. **CTA finale**

## Design Reference (SWIPE FILE)
Le 9 pagine in `reference/page-*.png` sono screenshot della landing "Organic Content Factory" di Felix Tay.

### Elementi chiave da replicare:
- **Alert bar rossa** in alto ("Per Social Media Manager stanchi di...")
- **Hero con video/mockup** prominente + pricing box laterale
- **Sezioni alternate** bianco e colorato (giallo/verde chiaro per highlight)
- **Red headlines** grandi e bold per ogni sezione
- **Testimonial wall** massiccio (video + screenshot + testo)
- **Pricing box** ripetuto più volte nel flusso (sticky o ripetuto)
- **Bonus stack** visivo con checkmark verdi
- **Garanzia con badge** visivo prominente
- **CTA buttons** grandi verdi/gialli ripetuti frequentemente
- **Long-form sales letter** format (storia personale, pain → soluzione)
- **Trust badges** (sicurezza, crittografia, garanzia)
- **Confronto ❌ vs ✅** (vecchio modo vs nuovo modo)

### Palette colori da usare:
- **Background:** Bianco principale, sezioni alternate con #FFF9E6 (crema/giallo chiaro)
- **Headlines:** Rosso #DC2626 o nero bold
- **CTA primario:** Verde #16A34A (bottone grande)
- **CTA secondario:** Giallo/Gold #EAB308
- **Accent:** Blu per link, verde per checkmark
- **Testo:** Nero #1a1a1a, grigio scuro per body
- **Badge garanzia:** Verde/Gold

### Typography:
- Headlines: Bold, grande, impattante (Inter o simile)
- Body: Leggibile, 18-20px, line-height generoso
- Stile: Direct response copywriting — NO design minimale, SÌ emphasize con bold/underline/highlight

## Immagini da Generare
Usa Nano Banana Pro (Gemini) per generare TUTTE le immagini necessarie:

1. **Mockup corso "The Wealthy SMM"** — digital product box/bundle con laptop, phone, documenti. Stile premium, sfondo chiaro. Testo visibile "The Wealthy SMM" sul mockup
2. **Foto Marinela Marku** — donna professionale, ~25-28 anni, origine albanese/est-europa, capelli scuri, look business casual, sorridente, sicura di sé. Ambientazione: ufficio moderno o lifestyle (laptop, caffè). GENERARE PIÙ VARIANTI per diverse sezioni
3. **Lifestyle photos Marinela** — viaggio, laptop in spiaggia/caffetteria, libertà
4. **Mockup bonus** — icone/box per ogni bonus (Client Magnet Map, Closing Script Pack, ecc.)
5. **Screenshot testimonianze** — stile messaggi/chat con risultati (Sara 11K, Luca, Giulia)
6. **Grafica 3 step** — infografica del processo (Riposizionamento → Target Giusto → Vendita Premium)
7. **Badge garanzia** — shield/badge "30 Giorni Soddisfatti o Rimborsati"
8. **Icone ❌ e ✅** — per sezioni confronto

## Stack Tecnico
- **React 18 + Vite + Tailwind CSS v4**
- **Mobile-first** (la maggior parte del traffico sarà da FB Ads mobile)
- **Performance:** Bundle < 200KB gzip, LCP < 2.5s su 3G
- **NO emoji unicode** — solo SVG/Lucide React icons
- **NO librerie pesanti** (no GSAP, no Framer Motion, no Three.js)
- **CSS animations** dove serve (subtle, non invasive)
- `min-h-[100dvh]` mai `h-screen`
- **Vercel deploy**

## Struttura Pagina
Segui ESATTAMENTE la struttura del copy in COPY.md, sezione per sezione.
Il flusso deve essere:
1. Alert bar (urgenza)
2. Hero (headline + mockup + CTA)
3. "Cos'è" section
4. Story section (shortcut)
5. Bonus stack
6. Chi è Marinela
7. Testimonianze
8. Long-form sales letter
9. Confronto vecchio vs nuovo
10. 7 Lezioni breakdown
11. Bullet points "scoprirai"
12. Pricing + CTA
13. Garanzia
14. FAQ
15. CTA finale

## Regole
- Il copy nel doc è in ITALIANO — mantieni tutto in italiano
- Dove dice [MOCKUP], [IMMAGINE], [SCREENSHOT] → genera l'immagine appropriata
- CTA button text: "ACCEDI ADESSO" o "SCARICA ORA A SOLI 27€"
- Prezzo: 27€ (barrato 97€)
- Ripeti CTA almeno 5-6 volte nel flusso della pagina
- La pagina deve essere LUNGA (è una sales letter, non una landing corta)
- Stile direct response — enfasi con **bold**, _underline_, MAIUSCOLO, colori
