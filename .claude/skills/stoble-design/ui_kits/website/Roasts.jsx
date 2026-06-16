// RoastsGrid — six product cards for each roast.
const ROASTS = [
  { id: "flagship", name: "flagship", price: 19, kind: "double-origin · washed", notes: "milk chocolate, dried cherry, brown sugar", desc: "our everyday cup. balanced, bright, the one we put in our own pour-overs." },
  { id: "dark", name: "dark", price: 19, kind: "double-origin · washed", notes: "dark chocolate, toasted nut, molasses", desc: "for the deep-roast lovers — bold, but never bitter or burnt." },
  { id: "decaf", name: "decaf", price: 20, kind: "double-origin · washed", notes: "caramel, baked apple, almond", desc: "all the flavor, none of the jitters. swiss-water processed." },
  { id: "africa", name: "africa", price: 22, kind: "single-origin · natural", notes: "blueberry, jasmine, grapefruit zest", desc: "ethiopia guji — jammy, floral, wild like a sunny morning." },
  { id: "south", name: "south america", price: 21, kind: "single-origin · washed", notes: "honey, pear, milk chocolate", desc: "colombia huila — smooth, clean, easy-drinking. monday-morning approved." },
  { id: "central", name: "central america", price: 21, kind: "single-origin · washed", notes: "stone fruit, brown sugar, cocoa nib", desc: "guatemala antigua — soft body, sweet finish. a quiet showstopper." },
];

function RoastCard({ roast, onAdd }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      className="sto-roast-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="sto-roast-art">
        <CoffeeBag roast={roast.id} name={roast.name + "."} sub={roast.kind} size="sm" />
      </div>
      <div className="sto-roast-body">
        <div className="sto-roast-head">
          <h3 className="sto-roast-name">{roast.name}</h3>
          <div className="sto-roast-price">${roast.price}</div>
        </div>
        <div className="sto-roast-kind">{roast.kind}</div>
        <p className="sto-roast-desc">{roast.desc}</p>
        <div className="sto-roast-notes">
          <span className="sto-roast-notes-label">notes  ↓</span>
          <span className="sto-roast-notes-text">{roast.notes}</span>
        </div>
        <Button variant="primary" size="sm" arrow onClick={() => onAdd(roast)}>
          {hover ? "add to bag" : "add to bag"}
        </Button>
      </div>
    </article>
  );
}

function RoastsGrid({ onAdd }) {
  return (
    <section className="sto-section sto-roasts">
      <div className="sto-section-head">
        <Eyebrow>our coffee</Eyebrow>
        <h2 className="sto-section-title">six roasts. one promise — <em>good coffee, honestly told.</em></h2>
        <p className="sto-section-sub">we tell you exactly what's in the bag and who grew it. that's it.</p>
      </div>
      <div className="sto-roast-grid">
        {ROASTS.map((r) => <RoastCard key={r.id} roast={r} onAdd={onAdd} />)}
      </div>
    </section>
  );
}

Object.assign(window, { ROASTS, RoastCard, RoastsGrid });
