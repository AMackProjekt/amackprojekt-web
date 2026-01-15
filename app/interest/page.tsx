import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

export default function InterestPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <div className="text-center">
          <div className="mb-3 text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
            Connect With Us
          </div>
          <h1 className="h1">Interest Form</h1>
        </div>

        <div className="mx-auto mt-12 max-w-[900px]">
          {/* QR Code Section */}
          <div className="mb-8 text-center">
            <GlowCard className="inline-block p-6">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                {/* QR Code placeholder - replace with actual QR code image */}
                <div className="flex h-48 w-48 items-center justify-center bg-white text-gray-800">
                  <div className="text-center text-sm font-semibold">
                    QR Code
                    <div className="mt-2 text-xs font-normal">Scan to access form</div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">
                Scan to fill out the Interest Form
              </p>
            </GlowCard>
          </div>

          <GlowCard className="p-8 md:p-10">
            {/* Important Notice */}
            <div className="mb-8 rounded-lg border border-brand/30 bg-brand/5 p-6">
              <p className="text-sm text-text leading-relaxed">
                If filling this form out for a loved one, friend or family member please be sure to put all information 
                so that contact can be made. If the individual is currently incarcerated please fill out this form with 
                your contact information and someone will reach out to you within <span className="font-semibold">48 hours</span>.
              </p>
              <p className="mt-3 text-sm font-semibold text-brand2">
                Thank You for Your Support!
              </p>
            </div>

            {/* Embedded Form */}
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://forms.cloud.microsoft/r/G0kkRW4F7q"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="bg-white"
                title="T.O.O.L.S Inc Interest Form"
              >
                Loading form...
              </iframe>
            </div>

            {/* Alternative Access */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted mb-3">
                Form not displaying? Open in a new window:
              </p>
              <a
                href="https://forms.cloud.microsoft/r/G0kkRW4F7q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost">
                  Open Form in New Tab
                </Button>
              </a>
            </div>
          </GlowCard>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted">
              Need immediate assistance? <a href="/#contact" className="text-brand hover:text-brand2 transition-colors">Contact us directly</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-container px-7 py-8 text-center">
        <div className="text-xs text-muted">
          © {new Date().getFullYear()} T.O.O.L.S Inc · Empowering individuals to start over and unlock their full potential
        </div>
      </footer>
    </main>
  );
}
