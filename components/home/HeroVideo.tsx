"use client";

import { useEffect, useRef } from "react";

export interface HeroVideoProps {
  /** Path to the ambient loop, served from public. */
  src: string;
  /** Poster still shown before and instead of playback. */
  poster: string;
}

/*
  HeroVideo is the only client piece of the hero. The heading, copy, and buttons
  stay server rendered in Hero so the largest text paints without waiting on JS.

  Motion policy:
  - The video renders with no autoPlay attribute. Playback is started from an
    effect only when the user has not asked for reduced motion, so reduced motion
    users simply keep the poster frame.
  - It is muted, looped, inline, and decorative, so it is hidden from assistive
    technology and taken out of the tab order.
  - preload is metadata so the poster and first frame arrive quickly without
    pulling the whole file on load.
*/
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      if (!video) {
        return;
      }
      if (motionQuery.matches) {
        // Reduced motion requested: hold on the poster still frame.
        video.pause();
        return;
      }
      if (document.visibilityState !== "visible") {
        // A hidden tab will refuse playback anyway, retry on visibilitychange.
        return;
      }
      // play returns a promise that can reject under autoplay policy or low
      // power mode. Ignore it, the poster stays visible and nothing breaks.
      const attempt = video.play();
      if (attempt !== undefined) {
        attempt.catch(() => {});
      }
    }

    sync();
    motionQuery.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    // Retry once the first frames are decoded, in case the initial attempt ran
    // before the media was ready.
    video.addEventListener("loadeddata", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("loadeddata", sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover object-center"
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
