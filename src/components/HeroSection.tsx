"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {

      // Scroll-linked parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      tl.to(imageRef.current, { y: -120, scale: 1.05 }, 0);
      tl.to(titleRef.current, { y: -80, opacity: 0.3 }, 0);
      tl.to(subtitleRef.current, { y: -50 }, 0);

      if (particlesRef.current) {
        const particles = Array.from(particlesRef.current.children);
        particles.forEach((particle) => {
          tl.to(particle, {
            y: gsap.utils.random(-200, -60),
            x: gsap.utils.random(-80, 80),
            rotation: gsap.utils.random(-180, 180),
            opacity: 0,
          }, 0);
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile parallax if any, or just empty
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFF] via-[#EFF6FF] to-[#DBEAFE] pt-16">
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-sm opacity-50"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-sky-200 rounded-full mix-blend-multiply filter blur-sm opacity-60"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-sm opacity-40"></div>
        <div className="absolute bottom-20 right-1/3 w-10 h-10 bg-indigo-200 rounded-full mix-blend-multiply filter blur-sm opacity-50"></div>
        <div className="absolute top-1/3 left-1/2 w-14 h-14 bg-blue-100 rounded-full mix-blend-multiply filter blur-sm opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-left pt-10 md:pt-0">
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6" style={{ perspective: "1000px" }}>
              Abon Premium, Dibuat dengan Cinta
            </h1>
            <p ref={subtitleRef} className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Nikmati kelezatan abon asli dengan resep tradisional warisan nusantara. Tanpa pengawet, tinggi protein, dan pastinya bikin ketagihan.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Beli Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#features" className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-blue-600 font-bold rounded-full hover:bg-blue-50 border-2 border-blue-600 transition-colors shadow-sm">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative h-[400px] md:h-[600px] w-full mt-8 md:mt-0">
            <div className="absolute inset-0 bg-blue-200 rounded-3xl rotate-3 transform origin-bottom-left opacity-30"></div>
            <div className="absolute inset-0 bg-sky-200 rounded-3xl -rotate-2 transform origin-bottom-right opacity-30"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="https://picsum.photos/seed/abonhero/800/1000" 
                alt="Abon Nusantara Premium" 
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
