'use client';

import { useMemo, useState } from 'react';

const categories = ['Wszystko','Elektronika','Dom i ogród','Moda','Motoryzacja','Kolekcje','Sport','Praca','Usługi'];
const listings = [
  {id:1,title:'Konsola PlayStation 5 Slim',price:1499,location:'Kraków',category:'Elektronika',type:'Kup teraz',emoji:'🎮',tag:'Popularne'},
  {id:2,title:'Rower trekkingowy Kross',price:1850,location:'Katowice',category:'Sport',type:'Licytacja',emoji:'🚲',tag:'Aukcja'},
  {id:3,title:'Komplet porcelany vintage 24 el.',price:320,location:'Wrocław',category:'Kolekcje',type:'Kup teraz',emoji:'🏺',tag:'Nowe'},
  {id:4,title:'MacBook Air M2 13” 16/256',price:2999,location:'Warszawa',category:'Elektronika',type:'Licytacja',emoji:'💻',tag:'Aukcja'},
  {id:5,title:'Drewniany stół dębowy',price:890,location:'Poznań',category:'Dom i ogród',type:'Kup teraz',emoji:'🪵',tag:'Polecane'},
  {id:6,title:'Aparat Canon EOS + obiektyw',price:2100,location:'Gdańsk',category:'Elektronika',type:'Licytacja',emoji:'📷',tag:'Aukcja'},
  {id:7,title:'Kurtka skórzana męska',price:450,location:'Łódź',category:'Moda',type:'Kup teraz',emoji:'🧥',tag:'Okazja'},
  {id:8,title:'Fiat 126p — projekt',price:7800,location:'Rzeszów',category:'Motoryzacja',type:'Licytacja',emoji:'🚗',tag:'Aukcja'}
];

export default function Home() {
  const [category,setCategory] = useState('Wszystko');
  const [query,setQuery] = useState('');
  const [favorites,setFavorites] = useState([]);
  const [showSell,setShowSell] = useState(false);
  const [mode,setMode] = useState('all');

  const filtered = useMemo(() => listings.filter(x =>
    (category==='Wszystko'||x.category===category) &&
    (mode==='all'||(mode==='auction'?x.type==='Licytacja':x.type==='Kup teraz')) &&
    (x.title.toLowerCase().includes(query.toLowerCase())||x.category.toLowerCase().includes(query.toLowerCase()))
  ),[category,query,mode]);

  const toggleFav = id => setFavorites(f => f.includes(id)?f.filter(x=>x!==id):[...f,id]);

  return <main>
    <header className="topbar">
      <div className="container nav">
        <div className="brand"><span className="brandMark">H</span><span>handlujemy</span></div>
        <nav><button>Ogłoszenia</button><button onClick={()=>setMode('auction')}>🔨 Aukcje</button><button>Sprzedaj</button><button>Wiadomości</button></nav>
        <div className="account"><button className="ghost">Zaloguj się</button><button className="avatar">K</button></div>
      </div>
    </header>

    <section className="hero">
      <div className="container heroInner">
        <div className="heroCopy"><div className="eyebrow">POLSKA PLATFORMa HANDLOWA</div><h1>Kupuj. Sprzedawaj.<br/><em>Handlujemy.</em></h1><p>Ogłoszenia, aukcje i okazje w jednym miejscu. Wystaw przedmiot raz i zacznij handlować.</p>
          <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Czego szukasz? np. rower, telefon, meble..."/><button onClick={()=>document.getElementById('offers')?.scrollIntoView({behavior:'smooth'})}>Szukaj</button></div>
        </div>
        <div className="heroVisual"><div className="floatingCard c1">🔨 <b>12 ofert</b><small>MacBook Air M2</small></div><div className="showroom">🏠<strong>Twój przedmiot.</strong><span>Twoja sprzedaż.</span></div><div className="floatingCard c2">⚡ <b>NOWA OKAZJA</b><small>Porcelana vintage · 320 zł</small></div></div>
      </div>
    </section>

    <section className="categories"><div className="container"><div className="sectionHead"><div><span className="eyebrow">ODKRYWAJ</span><h2>Kategorie</h2></div><button className="textBtn">Wszystkie kategorie →</button></div><div className="catGrid">{categories.slice(1).map((c,i)=><button className={'cat '+(category===c?'active':'')} key={c} onClick={()=>setCategory(c)}><span>{['📱','🏠','👕','🚗','🕰️','⚽','💼','🛠️'][i]}</span><b>{c}</b><small>{[12840,9650,18200,4230,7890,3410,2190,5760][i].toLocaleString('pl-PL')} ogłoszeń</small></button>)}</div></div></section>

    <section id="offers" className="offers"><div className="container"><div className="sectionHead"><div><span className="eyebrow">DLA CIEBIE</span><h2>Najciekawsze oferty</h2></div><div className="tabs"><button className={mode==='all'?'active':''} onClick={()=>setMode('all')}>Wszystkie</button><button className={mode==='auction'?'active':''} onClick={()=>setMode('auction')}>🔨 Licytacje</button><button className={mode==='buy'?'active':''} onClick={()=>setMode('buy')}>Kup teraz</button></div></div><div className="grid">{filtered.map(item=><article className="product" key={item.id}><div className="photo"><span className="productEmoji">{item.emoji}</span><span className="tag">{item.tag}</span><button className="heart" onClick={()=>toggleFav(item.id)}>{favorites.includes(item.id)?'♥':'♡'}</button></div><div className="productBody"><small>{item.category} · {item.location}</small><h3>{item.title}</h3><div className="priceRow"><strong>{item.price.toLocaleString('pl-PL')} zł</strong><span className={item.type==='Licytacja'?'auction':''}>{item.type==='Licytacja'?'🔨 licytacja':'Kup teraz'}</span></div></div></article>)}</div>{filtered.length===0&&<div className="empty">Nie znaleziono ogłoszeń. Spróbuj innej frazy lub kategorii.</div>}</div></section>

    <section className="sellBanner"><div className="container sellInner"><div><span className="eyebrow">MASZ COŚ NA SPRZEDAŻ?</span><h2>Wystaw przedmiot w kilka minut.</h2><p>Dodaj zdjęcia, cenę i opis. W kolejnej wersji AI przygotuje ogłoszenie za Ciebie.</p></div><button className="primary" onClick={()=>setShowSell(true)}>＋ Dodaj ogłoszenie</button></div></section>

    <section className="showcase"><div className="container showcaseGrid"><div><span className="eyebrow">COŚ WIĘCEJ NIŻ LISTA OGŁOSZEŃ</span><h2>Twój wirtualny showroom.</h2><p>Opcjonalnie pokaż swoje przedmioty w cyfrowym wnętrzu. Klikasz przedmiot → oglądasz → kupujesz.</p><button className="darkBtn">Poznaj showroom →</button></div><div className="room"><div className="roomLabel">TWÓJ SHOWROOM</div><div className="roomObject o1">🕰️</div><div className="roomObject o2">🪑</div><div className="roomObject o3">📻</div><div className="roomObject o4">🖼️</div></div></div></section>

    <footer><div className="container footer"><div className="brand"><span className="brandMark">H</span><span>handlujemy</span></div><span>© 2026 Handlujemy · Pierwsza wersja</span><span>Bezpieczny handel. Prosto.</span></div></footer>

    {showSell&&<div className="modalBack" onClick={()=>setShowSell(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowSell(false)}>×</button><span className="eyebrow">NOWE OGŁOSZENIE</span><h2>Co sprzedajesz?</h2><input placeholder="Np. Rower górski Kross"/><textarea placeholder="Opisz przedmiot..."></textarea><div className="two"><input placeholder="Cena (zł)"/><select><option>Kup teraz</option><option>Licytacja</option></select></div><button className="primary full" onClick={()=>setShowSell(false)}>Dodaj ogłoszenie</button></div></div>}
  </main>
}
