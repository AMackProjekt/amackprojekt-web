"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

/**
 * Renders a sticky warning banner when the HIPAA-required inactivity timer
 * is about to expire. Gives the user a chance to extend the session.
 * HIPAA §164.312(a)(2)(iii): Automatic Logoff
 */
export function SessionTimeoutBanner() {
  const { sessionWarning, logout } = useAuth();
  const [secondsLeft, setSecondsLeft] = useState(5 * 60); // matches WARNING_BEFORE_MS

  useEffect(() => {
    if (!sessionWarning) {
      setSecondsLeft(5 * 60);
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionWarning]);

  if (!sessionWarning) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-0 inset-x-0 z-[9999] flex items-center justify-between gap-4
                 bg-amber-950/95 border-t border-amber-600/60 px-6 py-4 backdrop-blur-md
                 text-amber-200 text-sm shadow-2xl"
    >
      <span>
        <strong className="text-amber-100">Session expiring soon</strong> — you will be
        automatically logged out in{" "}
        <span className="font-mono font-bold text-amber-100">
          {mins}:{secs}
        </span>{" "}
        due to inactivity. Move the mouse or press any key to stay logged in.
      </span>
      <button
        type="button"
        onClick={logout}
        className="shrink-0 rounded-md border border-amber-600/60 bg-amber-900/60
                   px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-800
                   transition-colors"
      >
        Log out now
      </button>
    </div>
  );
}
