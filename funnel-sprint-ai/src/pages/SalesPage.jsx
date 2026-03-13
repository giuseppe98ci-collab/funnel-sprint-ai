import CtaButton from '../components/CtaButton'
import Testimonial from '../components/Testimonial'
import FaqItem from '../components/FaqItem'
import {
  Search, BarChart3, FileText, PenTool, Megaphone, Target,
  Mail, Send, Layout, Monitor, Palette, Image,
  Check, CheckCircle, X, XCircle, DollarSign, TrendingUp,
  Shield, ShieldCheck, Clock, Timer, Star,
  ClipboardList, Bot, RefreshCw, Zap, Lock
} from 'lucide-react'

const Section = ({ bg = 'bg-bg-primary', children, className = '' }) => (
  <section className={`${bg} px-5 py-16 md:py-24 ${className}`}>
    <div className="max-w-[800px] mx-auto">{children}</div>
  </section>
)

const faqs = [
  {
    q: '"Non sono un esperto di AI. Riesco a usare i bot?"',
    a: 'Sì. Se sai usare WhatsApp, sai usare i bot. Ogni modulo ha un tutorial passo-passo con screen recording. Copi il prompt, lo incolli, e il bot fa il resto. Non serve nessuna competenza tecnica.',
  },
  {
    q: '"Funziona nel mio settore?"',
    a: 'Il sistema funziona per qualsiasi business che ha bisogno di marketing: infobusiness, e-commerce, servizi, consulenza, coaching, SaaS, agenzia. Il Business DNA è progettato per adattarsi a QUALSIASI nicchia — perché sei TU a personalizzarlo con le informazioni del tuo business.',
  },
  {
    q: '"Ma ChatGPT non scrive già copy gratis?"',
    a: 'Certo. E il risultato è copy generico che suona come tutti gli altri. La differenza è che i bot di Funnel Sprint AI sono specializzati, alimentati con i TUOI dati e strutturati con framework di copywriting professionali (RMBC, PASTOR, Value Equation). È la differenza tra chiedere a un passante di cucinarti la cena e avere uno chef personale.',
  },
  {
    q: '"€17 è troppo bello per essere vero. Dov\'è la fregatura?"',
    a: 'Nessuna fregatura. Il prezzo basso è una scelta strategica: voglio che il maggior numero possibile di imprenditori italiani acceda a questo sistema. Il mio business non si regge sui €17 — si regge sulla fiducia che costruisco con te oggi e sui servizi premium che offro a chi vuole andare più in profondità.',
  },
  {
    q: '"Quanto tempo serve per configurare tutto?"',
    a: 'Il Business DNA richiede 30-45 minuti. Ogni bot si configura in 10-15 minuti. In un weekend hai tutto pronto e puoi iniziare a generare materiale marketing. Totale: 3-4 ore di lavoro per un sistema che usi per sempre.',
  },
  {
    q: '"Devo pagare anche Poe, ChatGPT o Claude?"',
    a: 'I bot funzionano con i piani gratuiti di tutte e tre le piattaforme. Per un uso intenso, un piano a pagamento (€20/mese circa) ti dà accesso illimitato — ma non è obbligatorio per iniziare.',
  },
  {
    q: '"E se non funziona per me?"',
    a: 'Hai 30 giorni di garanzia completa. Se non sei soddisfatto per qualsiasi motivo, ti rimborso tutto. Nessuna domanda, nessuna procedura. Il rischio è zero.',
  },
  {
    q: '"In cosa è diverso dai mille corsi di marketing che esistono?"',
    a: 'I corsi ti insegnano la teoria. Funnel Sprint AI ti dà gli STRUMENTI per fare. Non impari a scrivere copy — hai un bot che lo scrive per te. Non studi le ads — hai un bot che le genera. E soprattutto: il sistema migliora con l\'uso grazie al feedback loop. Nessun corso fa questo.',
  },
]

/* Bot card with mockup image */
function BotCard({ icon: Icon, name, desc, mockup }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {mockup && (
          <div className="md:w-2/5 shrink-0 bg-bg-secondary flex items-center justify-center p-4">
            <img src={mockup} alt={name} className="w-full max-w-[240px] rounded-xl" />
          </div>
        )}
        <div className="flex-1 p-5 md:p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-bg-accent flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-bold text-text-primary">{name}</p>
            <p className="text-sm text-text-secondary mt-1">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Stack item card with optional mockup */
function StackCard({ icon: Icon, title, desc, value, mockup }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {mockup && (
          <div className="md:w-2/5 shrink-0 bg-bg-secondary flex items-center justify-center p-4">
            <img src={mockup} alt={title} className="w-full max-w-[240px] rounded-xl" />
          </div>
        )}
        <div className="flex-1 p-5 md:p-6 flex gap-4 items-start text-left">
          <div className="w-10 h-10 rounded-lg bg-bg-accent flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-text-primary mb-1">{title}</p>
            <p className="text-sm text-text-secondary">{desc}</p>
          </div>
          <span className="font-bold text-accent shrink-0">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default function SalesPage() {
  return (
    <main className="min-h-screen">
      {/* SEZIONE 1 — HERO */}
      <Section bg="bg-bg-accent">
        <p className="text-text-secondary text-base md:text-lg mb-4 text-center">
          Per marketer e imprenditori digitali che sono stanchi di pagare corsi, agenzie e freelancer... senza risultati.
        </p>
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-text-primary">
          Crea il Tuo Team di 5 Bot AI Che Scrivono Ads, Landing Page, Email e VSL al Posto Tuo — E Che Diventano Più Bravi Ogni Volta Che Li Usi
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed text-center">
          Non devi diventare copywriter. Non devi studiare marketing per 6 mesi. Ti basta compilare UN documento sul tuo business — e i 5 bot fanno tutto il resto. Per sempre. A €17.
        </p>

        {/* Hero mockup */}
        <div className="flex justify-center mb-8">
          <img src="/mockup-main.png" alt="Funnel Sprint AI" className="w-full max-w-[480px] rounded-2xl shadow-lg" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base text-text-secondary mb-8">
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-accent" /> Setup in un weekend</span>
          <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-accent" /> Si auto-migliorano con i tuoi risultati</span>
          <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-accent" /> Meno di una pizza e una birra</span>
        </div>
        <CtaButton
          text="SÌ, VOGLIO I MIEI 5 BOT AI A €17"
          subtext="Garanzia 30 giorni soddisfatto o rimborsato — zero rischi."
        />
      </Section>

      {/* SEZIONE 2 — SOCIAL PROOF BAR */}
      <section className="bg-white border-y border-gray-200 px-5 py-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="font-bold mb-3 flex items-center justify-center gap-1.5">
            <span className="flex gap-0.5 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </span>
            <span className="text-text-primary ml-2">4.8/5</span> <span className="text-text-secondary font-normal">da 127+ recensioni</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-accent" /> Oltre 340 bot creati</span>
            <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-accent" /> 100% in italiano</span>
            <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-accent" /> Sistema auto-migliorante</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> Setup in 1 weekend</span>
          </div>
        </div>
      </section>

      {/* SEZIONE 3 — IL PROBLEMA */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Fermati un secondo. Quante di queste frasi ti suonano familiari?</h2>
        <div className="space-y-4 text-left mb-8">
          {[
            '"Ho speso €500 in ads e non ho venduto neanche un caffè."',
            '"So che dovrei fare una VSL ma non ho idea da dove cominciare."',
            '"Ho pagato un corso da €997 e la mia landing page è ancora vuota."',
            '"Non sono un copywriter. Non so scrivere copy che converte."',
            '"Devo fare TUTTO da solo e non ho tempo neanche per respirare."',
          ].map((t, i) => (
            <p key={i} className="text-danger font-medium text-lg flex items-start gap-2">
              <XCircle className="w-5 h-5 shrink-0 mt-1" /> <em>{t}</em>
            </p>
          ))}
        </div>
        <p className="text-lg mb-4">Se ti sei riconosciuto in anche solo UNA di queste...</p>
        <p className="text-xl font-bold mb-8">Non è colpa tua.</p>

        <hr className="border-gray-200 my-8" />

        <p className="text-lg mb-6">Il mercato ti ha venduto una bugia enorme:</p>
        <blockquote className="border-l-4 border-accent pl-6 py-2 mb-6 text-text-secondary italic text-lg">
          "Impara il copywriting. Impara il media buying. Impara a fare landing page. Impara la SEO. Impara l'email marketing. Impara, impara, impara..."
        </blockquote>
        <p className="text-lg mb-4">E tu ci hai creduto.</p>
        <p className="text-lg mb-4">Hai comprato il corso di marketing. Hai studiato le lezioni. Hai preso appunti.</p>
        <p className="text-lg mb-4">E poi?</p>
        <p className="text-xl font-bold mb-4">Poi ti sei seduto davanti allo schermo bianco.</p>
        <p className="text-lg mb-8">E lì sei rimasto.</p>
        <p className="text-lg mb-8">
          Perché c'è una differenza ENORME tra <strong>sapere come si fa</strong> e <strong>farlo davvero</strong>.
        </p>

        <hr className="border-gray-200 my-8" />

        <p className="text-lg mb-3">Un copywriter professionista costa <strong>€2.000 al mese</strong> (minimo).</p>
        <p className="text-lg mb-3">Un media buyer? Altri <strong>€1.500 al mese</strong>.</p>
        <p className="text-lg mb-3">Un designer per le ads? <strong>€1.000 al mese</strong>.</p>
        <p className="text-xl font-bold my-6">Totale: €4.500 al mese per avere un team marketing.</p>
        <p className="text-lg mb-4">E se non hai quei soldi? Devi fare tutto da solo.</p>
        <p className="text-lg">O almeno... era così. Fino ad oggi.</p>
      </Section>

      {/* SEZIONE 4 — LA STORIA */}
      <Section bg="bg-bg-secondary">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Mi chiamo Giuseppe. E 18 mesi fa ero esattamente dove sei tu adesso.</h2>
        <div className="text-left space-y-4 text-lg leading-relaxed">
          <p>Avevo un business digitale. Sapevo che il marketing era tutto. Ma ogni volta che dovevo scrivere un'ad, creare una landing page o buttare giù una sequenza email...</p>
          <p>...mi bloccavo.</p>
          <p>Ho speso <strong>€4.347 in corsi di copywriting e marketing</strong> in un anno. Alcuni ottimi. La teoria la sapevo.</p>
          <p>Ma la pagina rimaneva vuota.</p>
          <p>Poi è successo qualcosa.</p>
          <p>Ho iniziato a usare l'AI — ChatGPT, Claude, Poe — non come un giocattolo, ma come uno <strong>strumento di lavoro serio</strong>.</p>
          <p>Non chiedevo "scrivimi un ad". Quello lo fanno tutti e i risultati fanno schifo.</p>
          <p>Ho fatto qualcosa di diverso.</p>
          <p>Ho creato <strong>5 bot specializzati</strong>, ognuno con un compito preciso. E li ho alimentati con le informazioni del MIO business — il mio target, i miei competitor, il mio posizionamento.</p>
          <p className="font-bold text-xl">Il risultato?</p>
          <p>In un weekend avevo:</p>
          <ul className="space-y-2 ml-2">
            <li className="text-success flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" /> Una ricerca di mercato completa</li>
            <li className="text-success flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" /> 10 varianti di ads pronte</li>
            <li className="text-success flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" /> Il copy della landing page</li>
            <li className="text-success flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" /> Una sequenza email di 5 messaggi</li>
            <li className="text-success flex items-center gap-2"><CheckCircle className="w-5 h-5 shrink-0" /> Lo script per la VSL</li>
          </ul>
          <p>Materiale che un'agenzia mi avrebbe fatto pagare <strong>€3.000-5.000</strong>.</p>
          <p>Ma la vera svolta non è stata questa.</p>
          <p>La vera svolta è stata quando ho scoperto il <strong>feedback loop</strong>.</p>
        </div>
      </Section>

      {/* SEZIONE 5 — LA SOLUZIONE */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ecco cosa rende Funnel Sprint AI diverso da QUALSIASI corso, tool o prompt pack sul mercato.</h2>
        <div className="text-left space-y-4 text-lg leading-relaxed mb-8">
          <p>Non è un corso che guardi e dimentichi.</p>
          <p>Non è un pacchetto di prompt generici.</p>
          <p>Non è un template che copi e incolli.</p>
          <p><strong>È un sistema di 5 bot AI specializzati che lavorano insieme — e che diventano più bravi ogni volta che li usi.</strong></p>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-8">Come funziona (in 3 step):</h3>

        {/* Step 1 */}
        <div className="bg-bg-accent rounded-2xl p-6 md:p-8 mb-6 text-left">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3">
            <ClipboardList className="w-5 h-5 text-accent" />
          </div>
          <h4 className="font-bold text-xl mb-3">STEP 1: Compili il Business DNA</h4>
          <p className="text-text-secondary mb-2">Un documento guidato dove inserisci tutto ciò che i bot devono sapere sul tuo business: chi sei, cosa vendi, chi è il tuo cliente ideale, quali problemi risolvi.</p>
          <p className="text-sm text-text-secondary italic">Tempo: 30-45 minuti. Lo fai una volta.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-bg-accent rounded-2xl p-6 md:p-8 mb-6 text-left">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <h4 className="font-bold text-xl mb-4">STEP 2: Attivi i 5 Bot</h4>
          <p className="text-text-secondary mb-4">Ogni bot è specializzato in UNA funzione marketing:</p>
          <div className="space-y-4">
            <BotCard icon={Search} name="Bot Analisi Mercato" desc="Inserisci la nicchia → ricevi ricerca completa: avatar, competitor, angoli di vendita, parole esatte del tuo target" mockup="/mockup-analisi-mercato.png" />
            <BotCard icon={FileText} name="Bot VSL Writer" desc="Dagli le info → scrive lo script VSL completo (struttura Paganelli/Georgi)" mockup="/mockup-vsl-writer.png" />
            <BotCard icon={Megaphone} name="Bot Ads Creator" desc="Genera 5-10 varianti di copy ads per Facebook e Instagram — hook, body, headline, description" mockup="/mockup-ads-creator.png" />
            <BotCard icon={Mail} name="Bot Email Sequences" desc="Scrive sequenze email complete: welcome, nurture, vendita, post-acquisto" mockup="/mockup-email-sequences.png" />
            <BotCard icon={Layout} name="Bot Landing Page" desc="Genera il copy completo della landing/sales page — dall'hero alla chiusura" mockup="/mockup-landing-copy.png" />
          </div>
          <p className="mt-4 text-text-secondary">
            Ogni bot alimenta il successivo. Come <strong>scatole cinesi</strong>: la ricerca di mercato diventa il fondamento del copy. Il copy delle ads riflette la landing. Le email riprendono la VSL.
          </p>
          <p className="mt-2 font-bold">Tutto è coerente. Tutto è allineato. Tutto parla la stessa lingua.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-bg-accent rounded-2xl p-6 md:p-8 mb-8 text-left">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3">
            <RefreshCw className="w-5 h-5 text-accent" />
          </div>
          <h4 className="font-bold text-xl mb-3">STEP 3: Il Feedback Loop (La Magia)</h4>
          <p className="text-text-secondary mb-4">Ecco dove il sistema diventa <strong>imbattibile</strong>.</p>
          <p className="text-text-secondary mb-2">Lanci le ads. Qualcosa funziona — un hook, un'email, un angolo.</p>
          <p className="text-text-secondary mb-4">Lo salvi come <strong>file di riferimento</strong> nel bot.</p>
          <p className="text-text-secondary mb-4">Da quel momento, il bot genera output <strong>basato su ciò che ha DAVVERO funzionato</strong> nel tuo business.</p>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-sm text-text-secondary font-mono mb-4">
            Usi i bot → Lanci → Raccogli risultati →<br />
            Salvi ciò che funziona come reference →<br />
            I bot generano output ANCORA migliore →<br />
            Loop infinito di miglioramento
          </div>
          <blockquote className="border-l-4 border-accent pl-4 py-2 font-bold text-text-primary">
            Non stai comprando un corso. Stai comprando un sistema che diventa più intelligente ogni volta che lo usi.
          </blockquote>
        </div>

        <div className="text-left space-y-4 text-lg leading-relaxed mb-8">
          <p>Nessun corso in Italia offre questo. Nessuno.</p>
          <p>I corsi invecchiano. I template si esauriscono. I prompt generici danno risultati generici.</p>
          <p><strong>Il tuo sistema cresce con te.</strong></p>
        </div>

        <div className="bg-bg-secondary rounded-2xl p-6 text-left">
          <h4 className="font-bold text-lg mb-4">Funziona su 3 piattaforme (scegli tu):</h4>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Poe.com</strong> — Bot dedicati, pronti all'uso</li>
            <li><strong>ChatGPT</strong> — Progetti con file di riferimento</li>
            <li><strong>Claude</strong> — Progetti con knowledge base</li>
          </ul>
          <p className="mt-4 text-text-secondary">Il valore non è nella piattaforma. È nel <strong>metodo + i prompt + il feedback loop</strong>. Tu scegli dove lavorare.</p>
        </div>
      </Section>

      {/* SEZIONE 6 — TABELLA CONFRONTO */}
      <Section bg="bg-bg-secondary">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Il Metodo Vecchio vs Funnel Sprint AI</h2>
        <div className="overflow-x-auto">
          <div className="md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0">
            {/* Colonna Vecchio */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-danger font-bold text-xl mb-4 flex items-center justify-center gap-2"><XCircle className="w-6 h-6" /> Come Facevi Prima</h3>
              <ul className="space-y-3 text-left text-text-secondary">
                <li>Fissi lo schermo vuoto per ore</li>
                <li>Copi le ads degli altri (che non funzionano per te)</li>
                <li>Cerchi su Google per giorni</li>
                <li>Non scrivi email. Punto.</li>
                <li>€2.000-4.500/mese per un team</li>
                <li>Settimane o mesi per avere tutto</li>
                <li>Il corso invecchia, il template si esaurisce</li>
                <li>Devi diventare un esperto</li>
              </ul>
            </div>
            {/* Colonna Nuovo */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-success font-bold text-xl mb-4 flex items-center justify-center gap-2"><CheckCircle className="w-6 h-6" /> Con Funnel Sprint AI</h3>
              <ul className="space-y-3 text-left text-text-secondary">
                <li>Il bot scrive in 3 minuti</li>
                <li>Il bot crea varianti personalizzate sul TUO business</li>
                <li>Il bot analizza mercato, competitor e avatar in 5 minuti</li>
                <li>Il bot genera sequenze complete pronte da inviare</li>
                <li>€17 una volta. Per sempre.</li>
                <li>Un weekend.</li>
                <li>Il sistema migliora con i TUOI risultati</li>
                <li>Devi solo compilare il Business DNA</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* SEZIONE 7 — STACK OFFERTA */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ecco tutto quello che ricevi oggi con Funnel Sprint AI:</h2>

        {/* Main mockup in offer section */}
        <div className="flex justify-center mb-10">
          <img src="/mockup-main.png" alt="Funnel Sprint AI — Il sistema completo" className="w-full max-w-[480px] rounded-2xl shadow-lg" />
        </div>

        <div className="space-y-4 mb-10">
          <StackCard icon={Search} title="MODULO 1 — Bot Analisi Mercato" desc="Setup completo + prompt + tutorial. Inserisci la nicchia, ricevi: avatar dettagliato, mappa competitor, angoli di vendita, linguaggio esatto del target." value="€97" mockup="/mockup-analisi-mercato.png" />
          <StackCard icon={FileText} title="MODULO 2 — Bot VSL Writer" desc="Crea script VSL completi con struttura professionale (8 blocchi). Basta dargli il Business DNA e la ricerca di mercato." value="€147" mockup="/mockup-vsl-writer.png" />
          <StackCard icon={Megaphone} title="MODULO 3 — Bot Ads Creator" desc="Genera 5-10 varianti di copy ads per Facebook e Instagram. Hook, body, headline, description. Pronti da lanciare." value="€127" mockup="/mockup-ads-creator.png" />
          <StackCard icon={Mail} title="MODULO 4 — Bot Email Sequences" desc="Scrive sequenze email complete: welcome, soap opera, vendita, post-acquisto. Con subject line, preview text e timing." value="€97" mockup="/mockup-email-sequences.png" />
          <StackCard icon={Layout} title="MODULO 5 — Bot Landing Page Copy" desc="Genera il copy completo della sales page o landing page. Dall'headline alla chiusura, incluse FAQ e garanzia." value="€127" mockup="/mockup-landing-copy.png" />
          <StackCard icon={ClipboardList} title="BONUS — Il Business DNA (Template Guidato)" desc="Il documento fondamentale che alimenta TUTTI i bot. Compilalo una volta, usalo per sempre. Include domande guidate per estrarre il posizionamento unico del tuo business." value="€47" />
          <StackCard icon={RefreshCw} title="BONUS — Il Metodo Feedback Loop" desc="La guida step-by-step per trasformare i tuoi bot in un sistema auto-migliorante. Come salvare i file vincenti, come aggiornare le reference, come far crescere il sistema nel tempo." value="€67" />
          <StackCard icon={Monitor} title="BONUS — Setup Multi-Piattaforma" desc="Tutorial per configurare i bot su Poe, ChatGPT E Claude. Scegli la piattaforma che preferisci — o usale tutte e tre." value="€47" />
        </div>

        {/* Totale */}
        <div className="bg-bg-secondary rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center text-lg mb-2">
            <span>5 Moduli Bot Marketing</span><span className="font-bold">€595</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Business DNA Template</span><span className="font-bold">€47</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Metodo Feedback Loop</span><span className="font-bold">€67</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Setup Multi-Piattaforma</span><span className="font-bold">€47</span>
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Valore Totale</span><span>€756</span>
          </div>
        </div>

        <div className="text-center space-y-4 text-lg mb-8">
          <p className="font-bold text-xl">Ma non pagherai €756.</p>
          <p>Non pagherai neanche €297.</p>
          <p>Non pagherai neanche €97.</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg mb-4">Oggi accedi a TUTTO per soli:</p>
          <div className="inline-block bg-price-badge rounded-2xl px-8 py-6">
            <span className="text-danger line-through text-2xl font-bold">€97</span>
            <span className="text-4xl md:text-6xl font-black text-text-primary ml-4">€17</span>
          </div>
          <p className="mt-4 text-lg">Sì, <strong>diciassette euro</strong>.</p>
          <p className="text-text-secondary">Meno di una pizza e una birra.</p>
          <p className="text-text-secondary">Meno di un mese di Netflix.</p>
          <p className="text-text-secondary">Meno di un SINGOLO caffè al giorno per un mese.</p>
          <p className="font-bold text-lg mt-4">Per un sistema di marketing completo che usi per sempre.</p>
        </div>

        <CtaButton
          text="SÌ, VOGLIO FUNNEL SPRINT AI A €17"
          subtext="Pagamento sicuro con Stripe · Accesso immediato · Garanzia 30 giorni"
        />
      </Section>

      {/* SEZIONE 8 — COSA SARAI IN GRADO DI FARE */}
      <Section bg="bg-bg-accent">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Dopo questo weekend, tu sarai in grado di:</h2>
        <div className="space-y-4 text-left text-lg">
          {[
            <><strong>Lanciare ads su Facebook e Instagram</strong> con copy scritto professionalmente — senza aver mai studiato copywriting</>,
            <><strong>Creare una sales page completa</strong> che converte visitatori in clienti — in 30 minuti invece che in 3 settimane</>,
            <><strong>Scrivere sequenze email</strong> che vendono in automatico — senza fissare lo schermo vuoto</>,
            <><strong>Fare ricerche di mercato</strong> che ti dicono ESATTAMENTE cosa vuole il tuo target, con quali parole, e perché compra — in 5 minuti</>,
            <><strong>Scrivere script VSL</strong> con struttura professionale — anche se non hai mai fatto un video in vita tua</>,
            <><strong>Avere un sistema che migliora da solo</strong> — più lo usi, più i bot capiscono il tuo business e producono output migliore</>,
            <><strong>Risparmiare €2.000-4.500 al mese</strong> che spenderesti per un team marketing</>,
            <><strong>Smettere di procrastinare</strong> — perché il bot elimina il blocco dello "schermo vuoto"</>,
            <><strong>Lanciare in un weekend</strong> quello che prima ti avrebbe richiesto settimane o mesi</>,
          ].map((item, i) => (
            <p key={i} className="text-success flex items-start gap-2"><CheckCircle className="w-5 h-5 shrink-0 mt-1" /> {item}</p>
          ))}
        </div>
      </Section>

      {/* SEZIONE 9 — TESTIMONIANZE */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Cosa dicono chi ha già usato il sistema:</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Testimonial
            title="Ho lanciato le mie prime ads profittevoli in 3 giorni"
            quote="Ero bloccato da mesi. Avevo il corso, avevo la teoria, ma non riuscivo a scrivere UNA riga di copy. Con i bot di Giuseppe ho creato 8 varianti di ads in un pomeriggio. Le prime 3 che ho lanciato mi hanno portato 12 vendite in 72 ore. Il ROAS? 3.2x. Con ads scritte dall'AI. Assurdo."
            name="Marco T."
            role="Infobusiness, Torino"
          />
          <Testimonial
            title="€2.847 nel primo mese — e non so scrivere neanche un'email"
            quote="Io faccio il consulente, non il marketer. Non sapevo da che parte si teneva un funnel. Ho compilato il Business DNA di sabato mattina, creato i 5 bot nel weekend, e lunedì avevo tutto: landing, ads, email. In 30 giorni ho fatturato €2.847 con un investimento in ads di €340. Giuseppe, sei un genio."
            name="Alessandra R."
            role="Consulente HR, Milano"
          />
          <Testimonial
            title="Il feedback loop è la cosa più intelligente che abbia mai visto"
            quote="Ho usato ChatGPT per mesi per scrivere post. Risultati? Meh. Poi ho provato il sistema di Giuseppe. La differenza? Il Business DNA. E soprattutto il feedback loop. Dopo 2 settimane i miei bot generavano copy che sembrava scritto da un copywriter da €3.000/mese. Perché avevano IMPARATO dai miei risultati. Questo vale 100 volte il prezzo."
            name="Davide M."
            role="E-commerce, Roma"
          />
          <Testimonial
            title="Ho cancellato il contratto con l'agenzia"
            quote="Pagavo €1.800/mese un'agenzia che mi mandava report bellissimi e risultati mediocri. Ho provato Funnel Sprint AI per un mese in parallelo. I bot hanno generato ads con CTR più alto del 40% rispetto a quelle dell'agenzia. Ho cancellato il contratto. Risparmio €21.600 l'anno. Per 17 euro."
            name="Luca P."
            role="SaaS B2B, Bologna"
          />
        </div>
      </Section>

      {/* SEZIONE 10 — BUMP OFFER */}
      <Section bg="bg-bg-secondary">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">AGGIUNGI: Bot Creativo Gemini + Reference Pack (+ €40)</h2>
        <p className="text-lg font-bold mb-6 text-center">Hai i bot per il copy. Ora aggiungi il bot per la GRAFICA.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 shrink-0 bg-bg-accent flex items-center justify-center p-4">
              <img src="/mockup-creativo-gemini.png" alt="Bot Creativo Gemini" className="w-full max-w-[240px] rounded-xl" />
            </div>
            <div className="flex-1 p-6 md:p-8 text-left">
              <p className="text-lg mb-4">Con il Bot Creativo Gemini puoi:</p>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2"><Palette className="w-5 h-5 shrink-0 mt-0.5 text-accent" /> Creare <strong>statiche ads professionali</strong> in 2 minuti (senza Canva, senza designer)</li>
                <li className="flex items-start gap-2"><Image className="w-5 h-5 shrink-0 mt-0.5 text-accent" /> Usare <strong>10-20 reference di design reali</strong> come esempi per Gemini</li>
                <li className="flex items-start gap-2"><PenTool className="w-5 h-5 shrink-0 mt-0.5 text-accent" /> Avere <strong>copy per le statiche</strong> — headline, CTA, layout per ogni formato</li>
                <li className="flex items-start gap-2"><Layout className="w-5 h-5 shrink-0 mt-0.5 text-accent" /> Ricevere <strong>template formati</strong> — dimensioni, colori, layout ottimizzati per IG e FB</li>
              </ul>
              <blockquote className="border-l-4 border-accent pl-4 py-2 mt-6 text-text-secondary italic">
                "Il 90% delle ads che vedi su Facebook sono brutte. Con questo bot, le tue sembreranno fatte da un designer professionista. In 2 minuti."
              </blockquote>
            </div>
          </div>
        </div>
        <label className="flex items-center gap-3 bg-price-badge border-2 border-yellow-400 rounded-xl p-5 cursor-pointer text-left">
          <input type="checkbox" className="w-5 h-5 accent-cta-primary" />
          <span className="font-bold text-text-primary">Sì, aggiungi il Bot Creativo Gemini + Reference Pack per soli €40</span>
        </label>
      </Section>

      {/* SEZIONE 11 — PREZZO + CTA */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">La domanda non è "posso permettermelo?"</h2>
        <p className="text-xl font-bold mb-8 text-center">La domanda è: <em>"Posso permettermi di NON averlo?"</em></p>

        <p className="text-lg mb-4">Pensa a quanto stai spendendo ADESSO:</p>
        <div className="bg-bg-secondary rounded-2xl p-6 mb-8 text-left">
          {[
            { cosa: 'Tempo perso a fissare lo schermo vuoto', costo: 'Incalcolabile' },
            { cosa: 'Ads che non convertono', costo: '€500-2.000 buttati' },
            { cosa: 'Corsi che non implementi', costo: '€497-2.997' },
            { cosa: 'Agenzia mediocre', costo: '€1.500-4.500/mese' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
              <span className="text-text-secondary">{row.cosa}</span>
              <span className="font-bold text-danger">{row.costo}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4 text-lg font-bold">
            <span>Costo del NON agire</span>
            <span className="text-danger">€10.000+ all'anno</span>
          </div>
        </div>

        <p className="text-lg mb-6">Oppure...</p>

        <div className="text-center mb-8">
          <div className="inline-block bg-price-badge rounded-2xl px-8 py-6 mb-4">
            <span className="text-danger line-through text-2xl font-bold">€97</span>
            <span className="text-4xl md:text-6xl font-black text-text-primary ml-4">€17</span>
          </div>
          <p className="text-lg">Cinque bot AI. Un weekend. Un sistema che cresce con te.</p>
          <p className="text-xl font-bold mt-2">Per sempre.</p>
        </div>

        <CtaButton
          text="VOGLIO IL MIO TEAM AI A €17 — ACCESSO IMMEDIATO"
          subtext="Pagamento sicuro · Accesso istantaneo · Garanzia 30 giorni · Nessun abbonamento"
        />
      </Section>

      {/* SEZIONE 12 — CHI È GIUSEPPE */}
      <Section bg="bg-bg-secondary">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Chi c'è dietro Funnel Sprint AI?</h2>
        <div className="text-left space-y-4 text-lg leading-relaxed">
          <p>Mi chiamo <strong>Giuseppe</strong>. Non sono un guru. Non ho un jet privato. Non ti mostrerò screenshot di Stripe.</p>
          <p>Quello che faccio è semplice: <strong>costruisco sistemi di marketing che funzionano.</strong></p>
          <p>Ho lavorato con decine di imprenditori italiani — dal freelancer che fattura €2.000 al mese all'azienda che ne fattura €200.000.</p>
          <p>E ho notato una cosa: <strong>il problema non è mai la strategia. Il problema è l'esecuzione.</strong></p>
          <p>Tutti sanno che servono ads, landing page, email. Nessuno riesce a FARLE.</p>
          <p>Funnel Sprint AI è nato per risolvere esattamente questo problema. Non ti insegno teoria. Ti do gli strumenti per FARE.</p>
          <p>In un weekend.</p>
        </div>
      </Section>

      {/* SEZIONE 13 — GARANZIA */}
      <Section>
        <div className="bg-white border-2 border-green-300 rounded-2xl p-8 md:p-10">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Garanzia "Zero Scuse" — 30 Giorni</h2>
          <div className="text-left space-y-4 text-lg leading-relaxed">
            <p>Ecco il deal:</p>
            <p>Prova Funnel Sprint AI per <strong>30 giorni interi</strong>.</p>
            <p>Crea i bot. Compila il Business DNA. Genera il tuo materiale marketing.</p>
            <p>Se per QUALSIASI motivo non sei soddisfatto — anche se semplicemente hai cambiato idea — ti rimborso <strong>ogni singolo centesimo</strong>.</p>
            <p>Nessuna domanda. Nessuna procedura complicata. Nessuna scusa.</p>
            <p>Ti basta scrivere una email e ricevi il rimborso entro 48 ore.</p>
            <p><strong>Il rischio è ZERO. È tutto sulle mie spalle.</strong></p>
            <p>Se non funziona per te, non meriti di pagare. Punto.</p>
          </div>
          <div className="mt-8">
            <CtaButton text="SÌ, VOGLIO PROVARE SENZA RISCHI A €17" />
          </div>
        </div>
      </Section>

      {/* SEZIONE 14 — CHIUSURA EMOTIVA */}
      <Section bg="bg-bg-secondary">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">La scelta è tua.</h2>
        <div className="text-left space-y-4 text-lg leading-relaxed mb-8">
          <p>Puoi continuare come stai facendo adesso.</p>
          <p>Comprare un altro corso da €997 che finirai nella cartella "da guardare".</p>
          <p>Spendere altri €500 in ads che non convertono perché il copy è stato scritto "a sentimento".</p>
          <p>Passare un altro weekend a fissare lo schermo vuoto, chiedendoti perché tutti gli altri sembrano riuscirci tranne te.</p>
        </div>

        <hr className="border-gray-300 my-8" />

        <div className="text-left space-y-4 text-lg leading-relaxed mb-8">
          <p>Oppure.</p>
          <p>Puoi investire €17 — meno di una pizza — e avere in un weekend quello che un'agenzia ti farebbe pagare €3.000.</p>
          <p>Un team di 5 bot AI che lavorano PER TE.</p>
          <p>Che migliorano OGNI VOLTA che li usi.</p>
          <p>Che non vanno in ferie. Non chiedono aumenti. Non consegnano in ritardo.</p>
          <p><strong>E che sono tuoi. Per sempre.</strong></p>
        </div>

        <hr className="border-gray-300 my-8" />

        <div className="text-left space-y-4 text-lg leading-relaxed mb-8">
          <p>Fra 30 giorni sarai in uno di questi due posti:</p>
          <p><strong>Posto A:</strong> Esattamente dove sei adesso. Stesso schermo vuoto. Stesse ads che non convertono. Stessa frustrazione.</p>
          <p><strong>Posto B:</strong> Con un sistema di marketing funzionante. Ads che girano. Email che vendono. Una landing page che converte. E bot che diventano più bravi ogni giorno.</p>
          <p>La differenza tra i due posti?</p>
          <p className="text-xl font-bold">€17 e un weekend.</p>
        </div>

        <CtaButton
          text="SCELGO IL POSTO B — DAMMI I MIEI 5 BOT AI"
          subtext="€97 → €17 · Accesso immediato · Garanzia 30 giorni · Zero rischi"
        />
      </Section>

      {/* SEZIONE 15 — FAQ */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Domande Frequenti</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </Section>

      {/* SEZIONE 16 — CTA FINALE */}
      <Section bg="bg-bg-accent">
        <CtaButton
          text="INIZIA ORA — €17 · ACCESSO IMMEDIATO"
          subtext=""
        />
        <p className="mt-6 text-sm text-text-secondary italic text-center">
          Funnel Sprint AI — Il primo sistema AI italiano che ti dà un team marketing completo in 5 bot.
        </p>
        <p className="mt-2 text-xs text-text-secondary text-center">© 2026 — Tutti i diritti riservati.</p>
      </Section>
    </main>
  )
}
