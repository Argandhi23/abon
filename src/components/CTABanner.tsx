"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function CTABanner() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const borderPathRef = useRef<SVGRectElement>(null);

  useGSAP(() => {
    // Banner entrance
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      scaleX: 0.85,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // SVG border animation
    if (borderPathRef.current) {
      const length = borderPathRef.current.getTotalLength();
      gsap.set(borderPathRef.current, { 
        strokeDasharray: length, 
        strokeDashoffset: length 
      });
      
      gsap.to(borderPathRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2
      });
    }

    // Headline word-by-word stagger
    if (textRef.current && textRef.current.textContent) {
      const words = textRef.current.textContent.trim().split(" ");
      textRef.current.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="inline-block">${w}</span></span>`).join(" ");
      
      gsap.from(textRef.current.querySelectorAll("span > span"), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      });
    }

    // Button elastic bounce
    gsap.from(btnRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
      delay: 0.6
    });

  }, { scope: containerRef });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <article 
        ref={containerRef} 
        className="relative bg-blue-50 rounded-3xl p-8 md:p-16 text-center overflow-hidden"
      >
        {/* Animated SVG Border */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          preserveAspectRatio="none"
        >
          <rect 
            ref={borderPathRef}
            x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 16px)" 
            rx="16" ry="16"
            fill="none" 
            stroke="#2563EB" 
            strokeWidth="2" 
            strokeDasharray="10 10" 
            className="opacity-50"
          />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 ref={textRef} className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Siap Menikmati Kelezatan Abon Nusantara?
          </h2>
          <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Pesan sekarang dan rasakan gurihnya abon sapi dan ayam premium tanpa bahan pengawet.
          </p>
          <Link 
            ref={btnRef}
            href="/products" 
            className="inline-block px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all transform"
          >
            Pesan Sekarang
          </Link>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      </article>
    </section>
  );
}
