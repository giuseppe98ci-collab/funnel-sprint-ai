import { useEffect } from 'react'
import Header from '../components/Header'
import CountdownTimer from '../components/CountdownTimer'

export default function OtoPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Confetti / Success */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#22C55E] to-[#4ADE80] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-headline text-3xl md:text-5xl gold-text mb-4">
              Congratulazioni, ce l'hai fatta!
            </h1>
            <p className="text-[#B0B0B0] text-lg max-w-xl mx-auto">
              Hai appena fatto la mossa più intelligente che potessi fare…
            </p>
            <p className="text-[#B0B0B0] text-base max-w-xl mx-auto mt-2">
              E probabilmente non te ne rendi neanche conto.
            </p>
          </div>

          {/* Timer */}
          <div className="mb-10">
            <p className="text-[#C4A95B] text-sm uppercase tracking-widest mb-3">Questa offerta scade tra</p>
            <CountdownTimer />
          </div>

          {/* OTO Offer */}
          <div className="glass-card p-8 md:p-10 text-left border-[rgba(196,169,91,0.4)] mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C4A95B]/20 text-[#C4A95B] mb-4">
              OFFERTA ESCLUSIVA — SOLO PER TE
            </span>
            
            <h2 className="font-headline text-2xl md:text-3xl gold-text mb-6">
              Cerebro Room Exclusive
            </h2>

            <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed mb-8">
              <p>Fermati un secondo e guarda cosa è appena successo.</p>
              <p>Sei arrivato qui che forse non sapevi da dove iniziare con il trading…</p>
              <p>E adesso hai tra le mani i segnali operativi sull'oro di uno dei maggiori esperti di geopolitica e trading in Italia, con 17 milioni gestiti e 3 anni di risultati verificati.</p>
              <p>Sei arrivato qui che forse avevi paura di bruciare il conto — e adesso hai il Zero Risk Protocol che ti copre le spalle.</p>
              <p>Sei arrivato qui convinto forse di non avere abbastanza soldi per fare trading — e adesso sai che puoi partire anche con 100€ in tasca.</p>
              <p><strong className="text-white">La tua situazione finanziaria sta per cambiare…</strong></p>
              <p>Già dalla prossima settimana potrai svegliarti la mattina, prendere il caffè, aprire il telefono, copiare un segnale in 2 minuti... e vedere il saldo del conto che sale.</p>
              <p>Giorno dopo giorno.</p>
              <p><strong className="text-white">50€ adesso, 100€ domani, 200€ dopodomani.</strong></p>
              <p>Mentre sei in ufficio, mentre sei in macchina, mentre sei al mare — il segnale arriva, lo copi, incassi, e vai avanti con la tua giornata.</p>
              <p>Finalmente potrai smettere di tirare la cinghia ogni fine mese.</p>
              <p>Finalmente potrai comprarti qualcosa di bello senza sentirti in colpa.</p>
              <p>Finalmente potrai aprire l'app della banca e sorridere, invece di avere quel nodo allo stomaco che ti porti dietro da anni.</p>
              <p><strong className="text-white">Tutto questo sta per diventare la tua realtà.</strong></p>
              <p>...O forse no.</p>
              <p>Forse niente di tutto questo succederà.</p>
              <p>Forse continuerai a guadagnare poco o nulla.</p>
              <p>Forse continuerai a scrollare i social vedendo gente che si paga la vita col trading mentre tu sei ancora a chiederti "come fa?".</p>
              <p>Forse tra sei mesi sarai ancora punto e a capo.</p>
              <p>E non perché il Gold Profit System non funziona — quello è già dimostrato da più di mille persone che lo usano ogni giorno e che ci guadagnano.</p>
              <p><strong className="text-white">Il problema è un altro, ed è molto più subdolo di quello che pensi.</strong></p>
              <p><strong className="text-white">Il problema potresti essere tu.</strong></p>
              <p>Non perché non sei capace, non perché sei stupido, non perché non ce la puoi fare.</p>
              <p>Ma perché stai operando su <strong className="text-white">UN solo mercato</strong>.</p>
              <p>E l'oro, per quanto sia un mercato fantastico, resta un mercato solo.</p>
              <p>Ci sono giorni in cui l'oro si muove poco, lateralizza, non dà segnali forti — e in quei giorni tu stai lì fermo, aspetti, non guadagni niente.</p>
              <p>Lo so perché l'ho visto succedere centinaia di volte con i miei occhi.</p>
              <p>Gente che parte carica a mille, riceve i primi segnali sull'oro, fa i primi profitti…</p>
              <p>Ma poi arriva quella settimana dove l'oro si muove poco ed i segnali rallentano…</p>
              <p>E sai cosa succede?</p>
              <p>Si smontano.</p>
              <p>Perdono il ritmo.</p>
              <p>Smettono di controllare il telefono.</p>
              <p>E piano piano mollano.</p>
              <p>Non perché il sistema ha smesso di funzionare — ma perché non avevano abbastanza opportunità per restare nel gioco tutti i giorni.</p>
              <p>Ho visto questa cosa succedere troppe volte.</p>
              <p>E a un certo punto mi sono detto…</p>
              <p><strong className="text-white">Basta, non posso permettere che succeda anche ai miei nuovi membri.</strong></p>
              <p>Quindi ho creato la <strong className="text-white">Cerebro Room Exclusive</strong>.</p>
              <p><strong className="text-white">La Cerebro Room Exclusive elimina questo problema alla radice.</strong></p>
              <p>Perché dentro non ricevi solo i segnali sull'oro — ricevi i miei segnali operativi su <strong className="text-white">TUTTO</strong>.</p>
              <p>Forex, coppie valutarie come EUR/USD, GBP/USD, USD/JPY…</p>
              <p>Mercati che si muovono ventiquattr'ore su ventiquattro, cinque giorni su sette…</p>
              <p>Più segnali Gold aggiuntivi che nella sala base non mando.</p>
              <p>Questo vuol dire che anche quando l'oro è fermo, tu stai incassando da un'altra parte.</p>
              <p><strong className="text-white">Ogni giorno hai segnali.</strong></p>
              <p><strong className="text-white">Ogni giorno hai opportunità.</strong></p>
              <p><strong className="text-white">Ogni giorno hai un motivo per aprire il telefono e portarti a casa qualcosa.</strong></p>
              <p>È come avere un rubinetto aperto contro averne cinque — l'acqua è la stessa, ma quello che ti entra in tasca è tutta un'altra storia.</p>
              <p>Con il Gold Profit System da solo puoi portarti a casa 50, 100€ al giorno…</p>
              <p>E già così è tantissimo.</p>
              <p>Ma con la Cerebro Room Exclusive parliamo di <strong className="text-white">150, 200, anche 300€ al giorno</strong>…</p>
              <p>Perché stai pescando da più mercati contemporaneamente.</p>
              <p>Non lavori di più.</p>
              <p>Non studi di più.</p>
              <p>Non passi più tempo al telefono.</p>
              <p><strong className="text-white">Semplicemente ricevi più segnali.</strong></p>
              <p>E ogni segnale in più è un'altra occasione di mettere soldi in tasca.</p>
              <p>E poi c'è un'altra cosa che per me è ancora più importante.</p>
              <p>Chi è dentro la Cerebro Room Exclusive non è un semplice "iscritto".</p>
              <p><strong className="text-white">Fa parte di una cerchia ristretta.</strong></p>
              <p>Sono le persone più serie della mia community.</p>
              <p>Quelle che come te hanno deciso di non accontentarsi.</p>
              <p>E il livello di attenzione che dedico a quel gruppo è un altro pianeta…</p>
              <p>…Analisi più profonde, ragionamenti che condivido solo lì dentro, operazioni che nella sala base non vedrai mai… è il posto dove do il massimo…</p>
              <p>Dove sono più presente e dove chi è dentro ottiene i risultati migliori.</p>
              <p>Non perché la sala base non funzioni — funziona eccome. Ma perché nella Cerebro Room Exclusive hai accesso a tutto quello che faccio. Non a una fetta. <strong className="text-white">A tutto.</strong></p>
              <p>Ora, la Cerebro Room Exclusive normalmente costa <span className="price-old">197 euro</span>…</p>
              <p>Ma non ti chiederò questa cifra…</p>
              <p>E neanche la metà, ovvero circa 100 euro…</p>
              <p>Che già sarebbe un affare…</p>
              <p>Perché ho creato questa sala proprio per far sì che i miei membri non mollino e ottengano il massimo — e siccome tu hai appena dimostrato di essere una persona che agisce prendendo il Gold Profit System…</p>
              <p>Ho deciso di fare una cosa che non faccio praticamente mai.</p>
              <p>Darti modo di accedere investendo una cifra simbolica…</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <p className="font-headline text-5xl md:text-6xl gold-text">…Soli 67 euro!</p>
              <p className="text-[#B0B0B0] mt-3">…67 euro - unico pagamento, niente abbonamenti….</p>
              <p className="text-[#B0B0B0] mt-1">…67 euro per avere accesso a tutti i miei segnali, su tutti i mercati su cui opero…</p>
              <p className="text-[#B0B0B0] mt-1">…Ogni giorno.</p>
            </div>

            <div className="space-y-4 text-[#B0B0B0] text-base leading-relaxed mb-8 text-left">
              <p>Se ci pensi sono poco più di due euro al giorno per un mese — meno di un caffè al bar.</p>
              <p>Solo che invece di regalare quei due euro al barista sotto casa…</p>
              <p><strong className="text-white">Li stai mettendo su di te e sul tuo futuro.</strong></p>
              <p>E ovviamente sei coperto dalla stessa Garanzia Soddisfatto o Rimborsato di 30 giorni.</p>
              <p>Provalo.</p>
              <p>Ricevi i segnali.</p>
              <p>Copia le operazioni.</p>
              <p>E se per qualsiasi motivo non sei soddisfatto…</p>
              <p>Scrivimi e ti ridò tutto indietro senza farti una sola domanda.</p>
              <p><strong className="text-white">Ma sono sicuro al 100% che non succederà.</strong></p>
              <p>Attenzione però…</p>
              <p><strong className="text-white">Questa offerta speciale è disponibile solo su questa pagina e solo adesso…</strong></p>
              <p>Perché hai appena preso il Gold Profit System.</p>
              <p>Se chiudi questa pagina il prezzo torna a 197 euro e non c'è verso di tornare indietro.</p>
              <p>Non puoi scrivere al supporto, non puoi mandare un'email, non funziona così.</p>
              <p><strong className="text-white">Quindi agisci ora… o perderi per sempre l'opportunità.</strong></p>
              <p>A questo punto hai 2 strade davanti….</p>
              <p>Puoi continuare a operare solo sull'oro e incrociare le dita che ogni giorno ti dia segnali buoni — sapendo che non sarà sempre così…</p>
              <p>Sicuramente otterrai buoni risultati, ma niente in confronto a chi è dentro la Cerebro Room.</p>
              <p>Oppure puoi investire appena 67 euro in più – si tratta veramente di una cena in più al ristorante – sbloccare tutti i miei segnali su tutti i mercati…</p>
              <p>E a assicurarti di avere ogni giorno l'occasione di portarti a casa qualcosa.</p>
              <p>Quindi assicurarti di ottenere risultati fuori dal comune…</p>
              <p>Parliamo di <strong className="text-white">3.000, 4.000, anche 5.000€ al mese</strong> — ogni mese…</p>
              <p>Semplicemente copiando i segnali che ti mando io.</p>
              <p>Soldi che puoi usare per toglierti qualche sfizio, per mettere qualcosa da parte, per portare la tua famiglia in vacanza senza guardare il prezzo…</p>
              <p>O semplicemente per risparmiare di più a fine mese senza fare sacrifici.</p>
              <p><strong className="text-white">Se sei una persona sveglia, non c'è neanche da pensarci.</strong></p>
              <p><strong className="text-white">Sai già cosa fare.</strong></p>
              <p>Clicca il pulsante qui sotto e aggiungi la Cerebro Room Exclusive al tuo ordine.</p>
              <p><strong className="text-white">Ci vediamo dall'altra parte.</strong></p>
            </div>

            {/* CTA */}
            <button className="cta-btn cta-pulse w-full text-xl py-5 mb-4">
              AGGIUNGI CEREBRO ROOM — 67€ →
            </button>
          </div>

          {/* Skip */}
          <a href="#" className="text-[#777] text-sm underline hover:text-[#999] transition">
            No grazie, preferisco operare solo sull'oro →
          </a>
        </div>
      </div>
    </div>
  )
}
