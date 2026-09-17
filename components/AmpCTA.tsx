import Link from "next/link";
export function AmpCTA() {
  return (
    <section className="amp-contact amp-wrap">
      <div>
        <p className="amp-label">Your next move starts here</p>
        <h2>
          Let’s build something
          <br />
          <em>that matters.</em>
        </h2>
      </div>
      <Link className="amp-button" href="/interest">
        Start a Projekt <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
