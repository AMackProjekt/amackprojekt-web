"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface GoogleAdsConversionProps {
  conversionId: string; // Format: AW-XXXXXXXXXX
}

export function GoogleAdsConversion({ conversionId }: GoogleAdsConversionProps) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        const preferences = JSON.parse(consent);
        // Ads require marketing cookies
        setHasConsent(preferences.marketing === true);
      }
    };
    
    checkConsent();
    window.addEventListener("storage", checkConsent);
    return () => window.removeEventListener("storage", checkConsent);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      {/* Google Ads Global Site Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${conversionId}');
          `,
        }}
      />
    </>
  );
}

// Helper function for conversion tracking
export function trackConversion(conversionLabel: string, value?: number) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: conversionLabel,
      value: value || 0,
      currency: "USD",
    });
  }
}

// Predefined conversion events
export const conversions = {
  // Example: Call when user submits contact form
  contactFormSubmit: (conversionId: string) => 
    trackConversion(`${conversionId}/contact_submit`),
  
  // Example: Call when user joins waitlist
  waitlistSignup: (conversionId: string) => 
    trackConversion(`${conversionId}/waitlist_signup`),
  
  // Example: Call when user creates account
  signupComplete: (conversionId: string) => 
    trackConversion(`${conversionId}/signup_complete`),
  
  // Example: Call when user books consultation
  bookingComplete: (conversionId: string, value?: number) => 
    trackConversion(`${conversionId}/booking_complete`, value),
};
