"use client";

import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import HorizontalScroll from "@/components/HorizontalScroll";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const shapes = [
      { ref: shape1Ref, yPercent: 30, xPercent: -15 },
      { ref: shape2Ref, yPercent: -25, xPercent: 20 },
      { ref: shape3Ref, yPercent: 20, xPercent: 10 },
    ];

    shapes.forEach(({ ref, yPercent, xPercent }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          yPercent,
          xPercent,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          }
        });
      }
    });
  });

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div ref={shape1Ref} className="absolute w-96 h-96 rounded-full bg-blue-200 opacity-30 blur-3xl top-20 left-10 will-change-transform"></div>
        <div ref={shape2Ref} className="absolute w-80 h-80 rounded-full bg-sky-200 opacity-25 blur-3xl top-1/2 right-0 will-change-transform"></div>
        <div ref={shape3Ref} className="absolute w-64 h-64 rounded-full bg-indigo-200 opacity-20 blur-3xl bottom-1/3 left-1/3 will-change-transform"></div>
      </div>
      <HeroSection />
      <InfoSection />
      <FeaturesSection />
      <HorizontalScroll />
      <FeaturedProducts />
      <Testimonials />
      <CTABanner />
    </>
  );
}
