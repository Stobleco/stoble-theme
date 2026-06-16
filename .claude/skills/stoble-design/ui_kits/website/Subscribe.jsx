// Subscription band — encourage subscribe before footer.
function SubscribeBand({ onSubscribe }) {
  return (
    <section className="sto-subband">
      <div className="sto-subband-inner">
        <div className="sto-subband-text">
          <Eyebrow color="#B6C2C6">subscription</Eyebrow>
          <h2 className="sto-subband-head">
            fresh coffee, on your<br />
            schedule — never on autopilot.
          </h2>
          <p className="sto-subband-sub">
            tell us how much you drink and we'll keep you stocked. pause, skip, or change roasts any time, in two clicks.
          </p>
          <div className="sto-subband-cta">
            <Button variant="cream" size="lg" arrow onClick={onSubscribe}>start a subscription</Button>
            <span className="sto-subband-fine">free shipping over $30 · cancel any time</span>
          </div>
        </div>
        <div className="sto-subband-art">
          <BetterTogether variant="braid" tone="white" height={260} />
        </div>
      </div>
    </section>
  );
}

// Cafe — visit-us block.
function CafeBlock() {
  return (
    <section className="sto-section sto-cafe">
      <div className="sto-cafe-grid">
        <div className="sto-cafe-card">
          <div className="sto-cafe-img" />
          <div className="sto-cafe-body">
            <Eyebrow>downtown chico</Eyebrow>
            <h3 className="sto-cafe-name">418 broadway</h3>
            <div className="sto-cafe-hours">
              <div><span>mon — fri</span><span>6:30a — 5p</span></div>
              <div><span>sat — sun</span><span>7a — 5p</span></div>
            </div>
            <Button variant="secondary" size="sm" arrow>get directions</Button>
          </div>
        </div>
        <div className="sto-cafe-card">
          <div className="sto-cafe-img sto-cafe-img-2" />
          <div className="sto-cafe-body">
            <Eyebrow>workplace · coworking</Eyebrow>
            <h3 className="sto-cafe-name">stoble workplace</h3>
            <div className="sto-cafe-hours">
              <div><span>mon — fri</span><span>7a — 7p</span></div>
              <div><span>day pass</span><span>$22</span></div>
            </div>
            <Button variant="secondary" size="sm" arrow>book a desk</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SubscribeBand, CafeBlock });
