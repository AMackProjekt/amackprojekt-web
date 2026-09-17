import { Navbar } from "@/components/ui/Navbar";
export const metadata = {
  title: "T.O.O.L.S. Referral",
  alternates: { canonical: "/referral/" },
};
export default function Page() {
  return (
    <main id="main-content">
      <Navbar />
      <section className="amp-page-hero amp-wrap">
        <p className="amp-label">T.O.O.L.S. Inc. / Referrals</p>
        <h1>
          Connect with
          <br />
          <em>the right support.</em>
        </h1>
        <p>
          Use the T.O.O.L.S. referral form to begin the conversation. The form
          opens on Microsoft Forms.
        </p>
        <div className="amp-actions">
          <a
            className="amp-button"
            href="https://forms.office.com/r/G0kkRW4F7q"
          >
            Open the referral form ↗
          </a>
          <a className="amp-text-link" href="https://www.sdtoolsinc.org">
            Visit T.O.O.L.S. Inc. ↗
          </a>
        </div>
      </section>
    </main>
  );
}
