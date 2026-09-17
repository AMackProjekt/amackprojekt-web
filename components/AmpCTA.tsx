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
      <Link className="amp-project-action" href="/interest">
        <span className="amp-project-action-copy"><strong>Start a Projekt</strong><small>Bring your vision. Build with AMP.</small></span>
        <span className="amp-project-action-arrow" aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
