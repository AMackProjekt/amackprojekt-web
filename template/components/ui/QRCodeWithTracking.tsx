"use client";

import { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface QRCodeWithTrackingProps {
  url: string;
  size?: number;
  className?: string;
  logoUrl?: string;
  title?: string;
  downloadable?: boolean;
}

export function QRCodeWithTracking({
  url,
  size = 300,
  className,
  logoUrl = "/logos/amp-logo.jpeg",
  title = "Scan to Visit AMP",
  downloadable = true,
}: QRCodeWithTrackingProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  // Track QR code view
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "qr_code_view", {
        event_category: "engagement",
        event_label: url,
      });
    }
  }, [url]);

  const handleShare = async () => {
    // Track share event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "qr_code_share", {
        event_category: "engagement",
        event_label: url,
      });
    }

    if (typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "A MackProjekt - AMP",
          text: "Check out AMP - A MackProjekt!",
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    }
  };

  const handleDownload = () => {
    // Track download event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "qr_code_download", {
        event_category: "engagement",
        event_label: url,
      });
    }

    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "amp-qr-code.png";
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleScan = () => {
    // Track scan event (when user clicks QR to visit)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "qr_code_scan", {
        event_category: "engagement",
        event_label: url,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("relative flex flex-col items-center gap-6", className)}
    >
      {/* QR Code Container with Electric Glow */}
      <div
        ref={qrRef}
        className="relative rounded-2xl bg-white p-6 shadow-[0_0_30px_rgba(34,197,94,0.3),0_0_60px_rgba(34,197,94,0.2)] border-2 border-green-400/30"
      >
        {/* Animated Electric Border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20" />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleScan}
          className="block relative"
        >
          <QRCodeSVG
            value={url}
            size={size}
            level="H"
            includeMargin={true}
            imageSettings={
              logoUrl
                ? {
                    src: logoUrl,
                    height: size * 0.2,
                    width: size * 0.2,
                    excavate: true,
                  }
                : undefined
            }
          />
        </a>

        {/* Electric Corner Accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-green-400 rounded-tl-lg animate-pulse" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-green-400 rounded-tr-lg animate-pulse" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-green-400 rounded-bl-lg animate-pulse" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-400 rounded-br-lg animate-pulse" />
      </div>

      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-center bg-gradient-to-r from-green-400 to-brand2 bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
      )}

      {/* Action Buttons */}
      {downloadable && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-bg font-semibold shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow"
          >
            Download QR
          </motion.button>
          {typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="px-6 py-3 rounded-lg bg-glass border border-border text-text font-semibold hover:bg-white/10 transition-colors"
            >
              Share
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
