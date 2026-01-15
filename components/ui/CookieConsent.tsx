"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  const declineAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-panel/95 backdrop-blur-xl shadow-glow"
        >
          <div className="mx-auto max-w-container px-7 py-6">
            {!showDetails ? (
              // Simple view
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-sm text-text leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    You can customize your preferences or accept all cookies.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-sm font-semibold text-brand hover:text-brand2 transition-colors underline"
                  >
                    Customize
                  </button>
                  <button
                    onClick={declineAll}
                    className="text-sm font-semibold text-muted hover:text-text transition-colors"
                  >
                    Decline All
                  </button>
                  <Button variant="primary" onClick={acceptAll}>
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed view
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-text">Cookie Preferences</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-muted hover:text-text"
                    aria-label="Close cookie preferences"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {/* Essential */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-text">Essential Cookies</div>
                        <p className="text-xs text-muted mt-1">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="ml-4 text-sm font-semibold text-brand">Always On</div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-text">Analytics Cookies</div>
                        <p className="text-xs text-muted mt-1">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                          aria-label="Enable analytics cookies"
                        />
                        <div className="w-11 h-6 bg-panel border border-border rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-text w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-text">Marketing Cookies</div>
                        <p className="text-xs text-muted mt-1">
                          Used to deliver relevant advertisements and track campaign performance.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                          aria-label="Enable marketing cookies"
                        />
                        <div className="w-11 h-6 bg-panel border border-border rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-text w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-text">Functional Cookies</div>
                        <p className="text-xs text-muted mt-1">
                          Enable enhanced functionality and personalization features.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                          className="sr-only peer"
                          aria-label="Enable functional cookies"
                        />
                        <div className="w-11 h-6 bg-panel border border-border rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-text w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <a href="#" className="text-xs text-brand hover:text-brand2 underline">
                    Privacy Policy
                  </a>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={declineAll}
                      className="text-sm font-semibold text-muted hover:text-text transition-colors"
                    >
                      Decline All
                    </button>
                    <Button variant="ghost" onClick={acceptSelected}>
                      Save Preferences
                    </Button>
                    <Button variant="primary" onClick={acceptAll}>
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
