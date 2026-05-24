"use client";

import React, { useRef } from "react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function ScrollingMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    }
  });

  return (
    <section className="overflow-hidden py-24 bg-blue-600 flex items-center">
      <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
        <h2 className="text-8xl font-display font-bold text-blue-100 opacity-90 mx-4">
          ABON NUSANTARA ✦ PREMIUM ARTISAN ✦ ABON NUSANTARA ✦ PREMIUM ARTISAN ✦ ABON NUSANTARA ✦ PREMIUM ARTISAN ✦ ABON NUSANTARA ✦ PREMIUM ARTISAN ✦ 
        </h2>
      </div>
    </section>
  );
}
