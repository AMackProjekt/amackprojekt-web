"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";

export default function JoinWaitlistPage() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Automatically open email client on page load
    const mailtoLink = `mailto:dmack@sdtoolsinc.org?subject=Join%20AMP%20Waitlist&body=Hi!%0A%0AI'd%20like%20to%20join%20the%20AMP%20waitlist.%0A%0AName:%20[Your%20Full%20Name]%0AEmail:%20[Your%20Email%20Address]%0AOrganization:%20[Your%20Organization%20(Optional)]%0A%0AThank%20you!`;
    
    window.location.href = mailtoLink;
    setOpened(true);
  }, []);

  const handleManualClick = () => {
    const mailtoLink = `mailto:dmack@sdtoolsinc.org?subject=Join%20AMP%20Waitlist&body=Hi!%0A%0AI'd%20like%20to%20join%20the%20AMP%20waitlist.%0A%0AName:%20[Your%20Full%20Name]%0AEmail:%20[Your%20Email%20Address]%0AOrganization:%20[Your%20Organization%20(Optional)]%0A%0AThank%20you!`;
    
    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="h1 mb-6">
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              {opened ? "Check Your Email!" : "Opening Email Client..."}
            </span>
          </h1>

          <p className="mx-auto max-w-[760px] p-lead mb-8">
            {opened
              ? "Your default email client should have opened with a pre-filled message to dmack@sdtoolsinc.org. Simply fill in your details and send!"
              : "Your email client is opening now. You can use any email provider to send your message."}
          </p>

          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="rounded-lg bg-panel border border-border p-6 max-w-md mx-auto">
                <p className="text-sm text-muted mb-4">
                  The email should be addressed to:
                </p>
                <p className="text-lg font-semibold text-brand break-all">
                  dmack@sdtoolsinc.org
                </p>
              </div>

              <Button
                onClick={handleManualClick}
                variant="ghost"
                className="mx-auto"
              >
                Open Email Again
              </Button>

              <p className="text-xs text-muted mt-6">
                If your email client didn't open, you can reply directly to:{" "}
                <a
                  href="mailto:dmack@sdtoolsinc.org?subject=Join%20AMP%20Waitlist"
                  className="text-brand hover:text-brand2 font-semibold transition"
                >
                  dmack@sdtoolsinc.org
                </a>
              </p>
            </motion.div>
          )}

          {!opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand border-t-transparent" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
