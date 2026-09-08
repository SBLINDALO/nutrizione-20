'use client'

import { useMemo, useState } from 'react'

type Meal = { time: string; title: string; detail: string; amount?: string; done?: boolean }
type Day = { label: string; date: string; meals: Meal[]; highlight: string }

const days: Day[] = [
  { label: 'Lun', date: '1', highlight: 'Riso, tonno e zucchine', meals: [
    { time: '08:00', title: 'Yogurt greco e kiwi', detail: 'Yogurt Total 0% · Kiwi · Miele', amount: '170g · 200g · 10g' },
    { time: '10:30', title: 'Kiwi', detail: 'Frutta fresca', amount: '200g' },
    { time: '13:00', title: 'Riso, tonno e zucchine', detail: 'Riso brillato · Tonno al naturale · Zucchine', amount: '140g · 170g · 140g' },
    { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane di frumento · Burro d’arachidi · Anguria', amount: '70g · 35g · 350g' },
    { time: '20:00', title: 'Hamburger di pollo ai ferri', detail: 'Hamburger di pollo · Spinaci al vapore · Pane integrale', amount: '240g · 100g · 120g' },
    { time: '22:00', title: 'Gelato al fior di latte', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Mar', date: '2', highlight: 'Pasta fredda e gamberi', meals: [
    { time: '08:00', title: 'Yogurt greco e banana', detail: 'Yogurt Total 0% · Banana · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Banana', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Pasta fredda con zucchine e gamberi', detail: 'Pasta · Zucchine · Gamberi', amount: '140g · 110g · 170g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Pesche', amount: '70g · 35g · 200g' }, { time: '20:00', title: 'Platessa alla pizzaiola', detail: 'Platessa · Melanzane · Pasta all’olio e parmigiano', amount: '350g · 100g · 100g' }, { time: '22:00', title: 'Gelato alla frutta', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Mer', date: '3', highlight: 'Quinoa e mozzarella light', meals: [
    { time: '08:00', title: 'Yogurt greco e melone', detail: 'Yogurt Total 0% · Melone · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Fragole', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Quinoa con mozzarella light', detail: 'Quinoa · Mozzarella light · Pomodorini', amount: '140g · 120g · 100g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Ciliegie', amount: '70g · 35g · 200g' }, { time: '20:00', title: 'Tagliata con rucola', detail: 'Vitello magro · Rucola · Pane integrale', amount: '240g · 145g · 120g' }, { time: '22:00', title: 'Gelato alla frutta', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Gio', date: '4', highlight: 'Riso nero con salmone', meals: [
    { time: '08:00', title: 'Yogurt greco e fichi', detail: 'Yogurt Total 0% · Fichi freschi · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Mela renetta', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Riso nero con salmone', detail: 'Riso Venere · Salmone affumicato · Pomodorini · Mais', amount: '120g · 150g · 150g · 30g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Ananas', amount: '70g · 35g · 200g' }, { time: '20:00', title: 'Listarelle di pollo e funghi', detail: 'Petto di pollo · Funghi · Penne al parmigiano', amount: '240g · 120g · 100g' }, { time: '22:00', title: 'Gelato al fior di latte', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Ven', date: '5', highlight: 'Pasta fredda tonno e pomodoro', meals: [
    { time: '08:00', title: 'Yogurt greco e prugne', detail: 'Yogurt Total 0% · Prugne · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Prugne', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Pasta fredda tonno, zucchine e pomodoro', detail: 'Pasta · Tonno · Zucchine · Pomodori', amount: '140g · 170g · 70g · 70g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Pere', amount: '70g · 35g · 200g' }, { time: '20:00', title: 'Nasello alla pizzaiola', detail: 'Nasello · Spinaci al vapore · Pane integrale', amount: '320g · 100g · 120g' }, { time: '22:00', title: 'Ghiacciolo', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Sab', date: '6', highlight: 'Quinoa e macinato di pollo', meals: [
    { time: '08:00', title: 'Yogurt greco e mela annurca', detail: 'Yogurt Total 0% · Mela annurca · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Mela', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Quinoa con macinato di pollo', detail: 'Quinoa · Pomodorini · Macinato di pollo', amount: '140g · 100g · 150g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Anguria', amount: '70g · 35g · 350g' }, { time: '20:00', title: 'Frittata con zucchine', detail: 'Uova · Zucchine · Insalata di pomodori · Riso', amount: '160g · 160g · 100g · 100g' }, { time: '22:00', title: 'Gelato alla frutta', detail: 'Dolce', amount: '100g' },
  ]},
  { label: 'Dom', date: '7', highlight: 'Insalata di fagioli e mozzarella', meals: [
    { time: '08:00', title: 'Yogurt greco e kiwi', detail: 'Yogurt Total 0% · Kiwi · Miele', amount: '170g · 200g · 10g' }, { time: '10:30', title: 'Kiwi', detail: 'Frutta fresca', amount: '200g' }, { time: '13:00', title: 'Insalata di fagioli e mozzarella', detail: 'Mozzarella light · Lattuga · Fagioli secchi · Rosetta', amount: '85g · 120g · 70g · 70g' }, { time: '16:30', title: 'Toast al burro d’arachidi', detail: 'Pane · Burro d’arachidi · Banana', amount: '70g · 35g · 200g' }, { time: '20:00', title: 'Fettina di manzo e verdure', detail: 'Manzo magro · Cipolle · Zucchine · Pomodori · Pane', amount: '240g · 25g · 120g · 95g · 120g' }, { time: '22:00', title: 'Gelato al fior di latte', detail: 'Dolce', amount: '100g' },
  ]},
]

const shopping = [
  ['Pane e cereali', 'Pane di frumento 490g · Pane integrale 480g · Pasta 480g · Riso 360g · Quinoa 280g'],
  ['Proteine', 'Petto di pollo 390g · Manzo 240g · Vitello 240g · Tonno 340g · Nasello 320g'],
  ['Frutta', 'Kiwi 800g · Banane 600g · Anguria 700g · Prugne 400g · Mele 400g'],
  ['Verdura', 'Zucchine 600g · Pomodorini 350g · Spinaci 200g · Rucola 145g · Funghi 120g'],
  ['Dispensa', 'Olio EVO 235g · Burro d’arachidi 245g · Miele 70g · Parmigiano 40g'],
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = { home: 'M3 10.5 12 3l9 7.5M5 9v10h14V9M9 19v-6h6v6', calendar: 'M5 4h14v16H5zM8 2v4M16 2v4M5 9h14', book: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5zM4 4.5v13', cart: 'M3 4h2l2 11h11l2-8H6M9 20h.01M18 20h.01', droplet: 'M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10z', check: 'm5 12 4 4L19 6', plus: 'M12 5v14M5 12h14', arrow: 'M5 12h14m-6-6 6 6-6 6', leaf: 'M19 3C9 3 5 8 5 15c0 3 2 5 5 5 7 0 10-6 9-17zM4 20c3-5 7-8 12-10' }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.leaf} /></svg>
}

export default function Page() {
  const [activeDay, setActiveDay] = useState(0)
  const [activeTab, setActiveTab] = useState('Piano')
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [water, setWater] = useState(4)
  const day = days[activeDay]
  const doneCount = day.meals.filter((_, i) => completed[`${activeDay}-${i}`]).length
  const progress = Math.round((doneCount / day.meals.length) * 100)
  const greeting = useMemo(() => activeDay === 0 ? 'Buongiorno, Edoardo' : `Giorno ${day.date} del tuo piano`, [activeDay, day.date])

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Icon name="leaf" size={21} /></span><span>nutri<span>mente</span></span></div>
      <nav aria-label="Navigazione principale">
        {['Piano', 'Ricette', 'Spesa'].map((item) => <button key={item} className={`nav-item ${activeTab === item ? 'selected' : ''}`} onClick={() => setActiveTab(item)}><Icon name={item === 'Piano' ? 'home' : item === 'Ricette' ? 'book' : 'cart'} size={19} />{item}</button>)}
      </nav>
      <div className="sidebar-note"><span className="mini-icon"><Icon name="leaf" size={15} /></span><strong>Un passo alla volta.</strong><p>La costanza è la tua superpotenza.</p></div>
      <div className="profile"><div className="avatar">EP</div><div><strong>Edoardo P.</strong><small>Piano personalizzato</small></div><span className="dots">···</span></div>
    </aside>
    <section className="content">
      <header className="topbar"><button className="mobile-brand"><span className="brand-mark"><Icon name="leaf" size={19} /></span>nutrimente</button><div className="top-actions"><span className="date-label">Lunedì, 8 settembre 2026</span><button className="icon-button" aria-label="Profilo"><span className="avatar small">EP</span></button></div></header>
      {activeTab === 'Piano' && <>
        <div className="welcome"><div><p className="eyebrow">IL TUO PIANO ALIMENTARE</p><h1>{greeting}</h1><p className="subhead">Prenditi cura di te, un pasto alla volta.</p></div><div className="week-progress"><div className="progress-ring"><span>{progress}%</span></div><div><strong>La tua giornata</strong><small>{doneCount} di {day.meals.length} pasti completati</small></div></div></div>
        <div className="day-picker" aria-label="Seleziona giorno">{days.map((item, index) => <button key={item.date} className={index === activeDay ? 'active' : ''} onClick={() => setActiveDay(index)}><span>{item.label}</span><strong>{item.date}</strong>{index === activeDay && <i />}</button>)}</div>
        <div className="section-heading"><div><p className="eyebrow">OGGI · GIORNO {day.date}</p><h2>{day.highlight}</h2></div><button className="outline-button"><span>▣</span> Vedi ricetta</button></div>
        <div className="dashboard-grid"><div className="meal-list">{day.meals.map((meal, index) => { const isDone = completed[`${activeDay}-${index}`]; return <article className={`meal-card ${isDone ? 'is-done' : ''}`} key={meal.time}><div className="meal-time">{meal.time}</div><button className={`check-button ${isDone ? 'checked' : ''}`} aria-label={`${isDone ? 'Segna come da fare' : 'Completa'} ${meal.title}`} onClick={() => setCompleted((current) => ({ ...current, [`${activeDay}-${index}`]: !isDone }))}>{isDone && <Icon name="check" size={16} />}</button><div className="meal-copy"><div className="meal-type">{index === 0 ? 'COLAZIONE' : index === 1 || index === 3 || index === 5 ? 'SPUNTINO' : index === 2 ? 'PRANZO' : 'CENA'}</div><h3>{meal.title}</h3><p>{meal.detail}</p><span className="amount">{meal.amount}</span></div><span className="meal-arrow"><Icon name="arrow" size={18} /></span></article> })}</div>
          <aside className="right-rail"><div className="water-card"><div className="card-title"><span className="water-icon"><Icon name="droplet" size={18} /></span><div><strong>Idratazione</strong><small>Obiettivo giornaliero</small></div><span className="water-total">{water}/8</span></div><div className="water-glasses">{Array.from({ length: 8 }).map((_, i) => <button key={i} className={i < water ? 'filled' : ''} aria-label={`Bicchiere ${i + 1}`} onClick={() => setWater(i + 1)}><Icon name="droplet" size={17} /></button>)}</div><p>Ogni bicchiere è un piccolo gesto per te.</p></div><div className="tip-card"><span className="tip-mark"><Icon name="leaf" size={17} /></span><div><strong>Il consiglio di oggi</strong><p>Ricorda di mangiare lentamente e assaporare ogni boccone.</p></div></div></aside>
        </div>
      </>}
      {activeTab === 'Ricette' && <div className="page-section"><p className="eyebrow">DALLA TUA TERAPIA ALIMENTARE</p><h1>Ricette semplici, fatte per te.</h1><p className="subhead">Le preparazioni del tuo piano, con ingredienti e quantità già organizzati.</p><div className="recipe-grid">{days.map((d) => <button key={d.date} className="recipe-card" onClick={() => { setActiveTab('Piano'); setActiveDay(Number(d.date) - 1) }}><span>GIORNO {d.date}</span><h3>{d.highlight}</h3><p>Scopri ingredienti e preparazione</p><Icon name="arrow" size={18} /></button>)}</div></div>}
      {activeTab === 'Spesa' && <div className="page-section"><p className="eyebrow">DAL GIORNO 1 AL GIORNO 7</p><h1>Lista della spesa</h1><p className="subhead">Tutto quello che ti serve, già diviso per categoria.</p><div className="shopping-list">{shopping.map(([title, items]) => <div className="shopping-row" key={title}><button className="check-button" aria-label={`Segna ${title} come completato`}><Icon name="check" size={16} /></button><div><h3>{title}</h3><p>{items}</p></div></div>)}</div></div>}
      <footer>Il tuo piano è stato elaborato dal <strong>Dott. Roberto Vennarucci</strong> · Terapia Alimentare Personalizzata</footer>
    </section>
  </main>
}
