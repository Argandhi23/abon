"use client";

import React, { useRef } from "react";
import { CheckCircle, Shield, ThumbsUp, Heart } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "100% Daging Asli",
      description: "Hanya menggunakan daging pilihan berkualitas tinggi tanpa campuran bahan pengisi."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Tanpa Pengawet",
      description: "Aman dikonsumsi keluarga. Awet alami berkat proses pengolahan tradisional yang tepat."
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-blue-600" />,
      title: "Kualitas Premium",
      description: "Dikemas eksklusif menjaga kesegaran dan cita rasa abon tetap optimal sampai ke tangan Anda."
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Resep Nusantara",
      description: "Bumbu rempah rahasia warisan leluhur yang memberikan rasa gurih manis yang khas."
    }
  ];

  useGSAP(() => {
    // Section title slides in
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      x: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Feature cards stagger
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.2)",
    });

    // Feature cards float on scroll
    const featureCards = gsap.utils.toArray(".feature-card");
    featureCards.forEach((card: any, i: number) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -40 : -20,
        rotation: i % 2 === 0 ? -2 : 2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    // Icon spin on scroll enter
    gsap.utils.toArray(".feature-icon").forEach((icon: any) => {
      gsap.to(icon, {
        scrollTrigger: {
          trigger: icon,
          start: "top 85%",
        },
        rotationY: 360,
        duration: 1,
        ease: "power2.out",
      });
    });
  }, { scope: containerRef });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.03, duration: 0.3, ease: "power2.out", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" });
  };

  return (
    <section id="features" ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-display font-semibold text-slate-900 inline-block">
            Mengapa Pilih Kami
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="feature-card bg-slate-50 rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transform transition-colors will-change-transform"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner" style={{ perspective: "500px" }}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
