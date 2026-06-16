// Drawer cart - opens from right, shows added items
function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div className={`sto-cart-scrim ${open ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`sto-cart ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <header className="sto-cart-head">
          <h3 className="sto-cart-title">your bag</h3>
          <button className="sto-icon-btn" aria-label="close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </header>
        <div className="sto-cart-body">
          {items.length === 0 && (
            <div className="sto-cart-empty">
              <div className="sto-cart-empty-art">
                <Symbol tone="navy" size={48} />
              </div>
              <p>your bag is empty.</p>
              <p className="sto-cart-empty-sub">go pick out something good →</p>
            </div>
          )}
          {items.map((it) => (
            <div className="sto-cart-row" key={it.id}>
              <div className="sto-cart-thumb"><CoffeeBag roast={it.id} name={it.name + "."} sub={it.kind} size="xs" /></div>
              <div className="sto-cart-info">
                <div className="sto-cart-name">{it.name}</div>
                <div className="sto-cart-kind">{it.kind}</div>
                <div className="sto-cart-qty">
                  <button onClick={() => onDec(it.id)}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => onInc(it.id)}>+</button>
                  <button className="sto-cart-remove" onClick={() => onRemove(it.id)}>remove</button>
                </div>
              </div>
              <div className="sto-cart-price">${it.price * it.qty}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <footer className="sto-cart-foot">
            <div className="sto-cart-totals">
              <div><span>subtotal</span><span>${subtotal}</span></div>
              <div className="sto-cart-fine">shipping &amp; taxes calculated at checkout.</div>
            </div>
            <Button variant="primary" size="lg" arrow>checkout</Button>
            <button className="sto-cart-keep" onClick={onClose}>keep shopping</button>
          </footer>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { CartDrawer });
