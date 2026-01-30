"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { trackVideoPlay, trackVideoComplete, trackShare } from "@/lib/analytics";

interface LaunchVideoProps {
  videoUrl?: string;
  title?: string;
  description?: string;
  className?: string;
  autoplay?: boolean;
  showSocial?: boolean;
}

export function LaunchVideo({
  videoUrl = "/videos/amp-launch.mp4",
  title = "AMP Launch - Destroying the Digital Divide",
  description = "Watch our mission to harness AI and innovation to create digital solutions for all.",
  className,
  autoplay = false,
  showSocial = true,
}: LaunchVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (!hasPlayed) {
        trackVideoPlay("amp-launch-video", title);
        setHasPlayed(true);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      trackVideoComplete("amp-launch-video", title);
    };

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [title, hasPlayed]);

  const handleShare = async (platform?: string) => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    
    trackShare(platform || "native", "launch-video");

    if (platform === "twitter") {
      const text = encodeURIComponent(title);
      const url = encodeURIComponent(shareUrl);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank",
        "width=550,height=420"
      );
    } else if (platform === "facebook") {
      const url = encodeURIComponent(shareUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "width=550,height=420"
      );
    } else if (platform === "linkedin") {
      const url = encodeURIComponent(shareUrl);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
        "width=550,height=420"
      );
    } else if (typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("relative w-full", className)}
    >
      {/* Video Container with Electric Glow */}
      <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.3),0_0_80px_rgba(34,197,94,0.2)] border-2 border-green-400/30 bg-bg">
        {/* Animated Electric Border */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 animate-pulse" />
          
          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-green-400 rounded-tl-xl animate-pulse" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-green-400 rounded-tr-xl animate-pulse" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-green-400 rounded-bl-xl animate-pulse" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-green-400 rounded-br-xl animate-pulse" />
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls
          autoPlay={autoplay}
          playsInline
          preload="metadata"
          poster="/logos/amp-logo.jpeg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Progress Bar */}
        {isPlaying && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-brand2 origin-left"
            style={{ width: "100%" }}
          />
        )}
      </div>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-6 space-y-4"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-brand to-brand2 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="p-lead text-muted">{description}</p>

        {/* Social Share Buttons */}
        {showSocial && (
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare()}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-bg font-semibold shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow"
            >
              Share Video
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare("twitter")}
              className="px-5 py-2.5 rounded-lg bg-glass border border-border text-text font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare("facebook")}
              className="px-5 py-2.5 rounded-lg bg-glass border border-border text-text font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare("linkedin")}
              className="px-5 py-2.5 rounded-lg bg-glass border border-border text-text font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
