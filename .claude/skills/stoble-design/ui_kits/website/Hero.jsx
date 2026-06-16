// Hero — full-bleed navy with serif headline, BT tagline.
function Hero({ onShop }) {
  return (
    <section className="sto-hero">
      <div className="sto-hero-inner">
        <div className="sto-hero-text">
          <Eyebrow color="#B6C2C6">est. chico, california · 2019</Eyebrow>
          <h1 className="sto-hero-head">
            a good cup<br />
            of coffee,<br />
            shared <em>better</em>.
          </h1>
          <p className="sto-hero-sub">
            we believe coffee should delight more than just your palate — it should bring people together. lovingly roasted in small batches, here in chico.
          </p>
          <div className="sto-hero-cta">
            <Button variant="cream" size="lg" arrow onClick={onShop}>shop our coffee</Button>
            <Button variant="ghost-light" size="lg" arrow>visit the cafe</Button>
          </div>
        </div>
        <div className="sto-hero-art">
          <CoffeeBag roast="flagship" name="our daily cup." sub="double-origin · washed" />
          <div className="sto-hero-bt">
            <BetterTogether variant="wave" tone="white" height={48} />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
