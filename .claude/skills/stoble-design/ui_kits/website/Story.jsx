// Story — split section about the brand + values.
function StoryBlock() {
  return (
    <section className="sto-section sto-story">
      <div className="sto-story-grid">
        <div className="sto-story-text">
          <Eyebrow>our story</Eyebrow>
          <h2 className="sto-story-head">
            we’re a small roastery in chico, with a simple idea — coffee is better when it’s shared.
          </h2>
          <p className="sto-story-body">
            we started stoble in 2019 because we couldn’t find a coffee shop in town that felt like home. so we made one. we roast every bag ourselves, we know the farmers we buy from by name, and we pay them what their coffee is actually worth.
          </p>
          <p className="sto-story-body">
            you don’t have to be a coffee nerd to enjoy our coffee. you just have to be thirsty.
          </p>
          <div className="sto-story-cta">
            <Button variant="primary" arrow>read our story</Button>
            <Button variant="secondary" arrow>meet the team</Button>
          </div>
        </div>
        <div className="sto-story-art">
          <div className="sto-story-tile sto-story-tile-1">
            <BetterTogether variant="boomerang" tone="white" height={120} />
          </div>
          <div className="sto-story-tile sto-story-tile-2">
            <div className="sto-story-fact">
              <div className="sto-fact-num">2019</div>
              <div className="sto-fact-label">founded in chico, ca</div>
            </div>
            <div className="sto-story-fact">
              <div className="sto-fact-num">14</div>
              <div className="sto-fact-label">producer partners</div>
            </div>
            <div className="sto-story-fact">
              <div className="sto-fact-num">$5.40</div>
              <div className="sto-fact-label">avg. green price / lb<br/>(3x fairtrade min.)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StoryBlock });
