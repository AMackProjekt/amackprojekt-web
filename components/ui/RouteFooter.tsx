"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function RouteFooter() {
  const pathname = usePathname();
  return pathname === "/" ? null : <Footer />;
}
