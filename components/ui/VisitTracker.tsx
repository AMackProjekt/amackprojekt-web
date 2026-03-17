"use client";

import { useEffect } from "react";

const ONE_DAY = 60 * 60 * 24;
const ONE_YEAR = ONE_DAY * 365;
const THIRTY_DAYS = ONE_DAY * 30;

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string) {
  const encodedName = `${name}=`;

  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodedName))
    ?.slice(encodedName.length);
}

function getRegionFromLocale(locale: string) {
  const [, region] = locale.split("-");
  return region || "US";
}

export function VisitTracker() {
  useEffect(() => {
    const locale = navigator.language || "en-US";
    const region = getRegionFromLocale(locale);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    const now = new Date().toISOString();

    setCookie("user-country", region, ONE_YEAR);
    setCookie("user-region", timeZone, ONE_YEAR);
    setCookie("user-city", "Unknown", ONE_YEAR);

    if (!getCookie("has-visited")) {
      setCookie("has-visited", "true", ONE_YEAR);
      setCookie("first-visit", now, ONE_YEAR);
    }

    setCookie("last-visit", now, THIRTY_DAYS);
  }, []);

  return null;
}