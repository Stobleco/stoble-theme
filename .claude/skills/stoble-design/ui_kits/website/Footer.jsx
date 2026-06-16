// Footer — site map + brand reinforcement.
function Footer() {
  const cols = [
    { title: "shop", links: ["all coffee", "subscriptions", "merch", "gift cards", "wholesale"] },
    { title: "visit", links: ["the cafe", "workplace", "events", "hosting & rentals"] },
    { title: "about", links: ["our story", "sourcing", "the journal", "careers", "press"] },
    { title: "help", links: ["shipping", "subscription faq", "returns", "contact us"] },
  ];
  return (
    <footer className="sto-footer">
      <div className="sto-footer-top">
        <div className="sto-footer-brand">
          <Wordmark tone="lightgray" height={36} />
          <p className="sto-footer-addr">
            418 broadway street<br />
            chico, california 95928<br />
            <a href="#">hello@stoblecoffee.com</a>
          </p>
          <div className="sto-footer-social">
            <a href="#" aria-label="instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            <a href="#" aria-label="tiktok"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 3v12.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 3 2.5 5 5 5"/></svg></a>
            <a href="#" aria-label="spotify"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M7 10c4-1 8-1 11 1M7.5 13c3-1 6.5-1 9 .5M8 16c2-.7 4.5-.7 6.5.5"/></svg></a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="sto-footer-col">
            <div className="sto-footer-col-title">{c.title}</div>
            <ul>
              {c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="sto-footer-bt">
        <BetterTogether variant="wave" tone="white" height={64} />
      </div>
      <div className="sto-footer-bottom">
        <span>© 2026 stoble coffee co.</span>
        <span>lovingly roasted in chico, california.</span>
        <span><a href="#">privacy</a>  ·  <a href="#">terms</a>  ·  <a href="#">accessibility</a></span>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
