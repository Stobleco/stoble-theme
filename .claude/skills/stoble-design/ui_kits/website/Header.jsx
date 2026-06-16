// Header — sticky top nav for the website.
const { useState: useStateHeader } = React;

function Header({ cartCount = 0, onCart, onLogin, onNav, current = "shop" }) {
  const items = [
    { id: "shop", label: "shop" },
    { id: "subscriptions", label: "subscriptions" },
    { id: "our-coffee", label: "our coffee" },
    { id: "cafe", label: "cafe" },
    { id: "journal", label: "journal" },
  ];
  return (
    <header className="sto-header">
      <div className="sto-header-inner">
        <a className="sto-header-logo" href="#" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); }}>
          <Wordmark tone="navy" height={26} />
        </a>
        <nav className="sto-header-nav">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              className={`sto-header-link ${current === it.id ? "is-current" : ""}`}
              onClick={(e) => { e.preventDefault(); onNav && onNav(it.id); }}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="sto-header-tools">
          <button className="sto-icon-btn" aria-label="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
          <button className="sto-icon-btn" aria-label="account" onClick={onLogin}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
          </button>
          <button className="sto-icon-btn sto-cart-btn" aria-label="cart" onClick={onCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5h3l2.5 11h11l2-8H7"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
            {cartCount > 0 && <span className="sto-cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
