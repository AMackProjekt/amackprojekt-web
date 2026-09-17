export function Books() {
  return (
    <div className="amp-books">
      <article className="amp-book">
        <div className="amp-book-art">
          <img
            src="/brand/spiritual-warfare.png"
            alt="Navigating Spiritual Warfare book cover"
            width="400"
            height="600"
            loading="lazy"
          />
        </div>
        <div>
          <p className="amp-label">Available on Amazon</p>
          <h3>Navigating Spiritual Warfare</h3>
          <h4>Understanding, Overcoming, and Protecting Oneself</h4>
          <p>
            A practical guide to understanding the battle, overcoming what has
            held you, and protecting your spiritual ground.
          </p>
          <a
            className="amp-button"
            href="https://www.amazon.com/Navigating-Spiritual-Warfare-UNDERSTANDING-OVERCOMING/dp/B0CX5JB7BL"
          >
            Explore the book <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
      <article className="amp-book">
        <div className="amp-book-art">
          <img
            src="/brand/alphakode.jpg"
            alt="AlphaKode: Navigating Workplace Environments book cover"
            width="400"
            height="600"
            loading="lazy"
          />
        </div>
        <div>
          <p className="amp-label">Coming soon</p>
          <h3>AlphaKode</h3>
          <h4>Navigating Workplace Environments</h4>
          <p>
            Strategy. Adaptation. Respect. Execution. The workplace is a
            board—and every move communicates.
          </p>
          <a
            className="amp-text-link"
            href="mailto:hello@mackprojekt.com?subject=AlphaKode%20early%20access"
          >
            Request a first look <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  );
}
