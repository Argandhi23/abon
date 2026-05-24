"use client";

import React, { useRef } from "react";
import { Star } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

const testimonials = [
  {
    id: 1,
    name: "Siti Rahmawati",
    role: "Ibu Rumah Tangga",
    content: "Anak saya yang biasanya susah makan, sekarang selalu minta tambah kalau lauknya pakai Abon Sapi Manis Legit dari Abon Nusantara. Rasanya pas banget di lidah!",
    rating: 5
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Karyawan Swasta",
    content: "Abon Sapi Pedasnya juara! Tekstur dagingnya masih kerasa banget, nggak kayak abon murah yang cuma kerasa tepung. Pedasnya juga nendang, cocok buat stok di kosan.",
    rating: 5
  },
  {
    id: 3,
    name: "Rina Marlina",
    role: "Pengusaha Kuliner",
    content: "Saya jadikan abon ini sebagai pelengkap hidangan nasi kuning di katering saya. Banyak klien yang nanya beli abonnya dimana. Kualitasnya memang premium.",
    rating: 5
  },
  {
    id: 4,
    name: "Andi Wijaya",
    role: "Mahasiswa",
    content: "Varian ikan tunanya unik banget. Nggak amis sama sekali, malah gurih dan bikin nagih. Harganya sangat worth it untuk kualitas yang didapat.",
    rating: 4
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Background parallax
    gsap.to(bgRef.current, {
      backgroundPositionY: "50%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: alternating slide in and scroll drift
      gsap.utils.toArray(".testimonial-card").forEach((card: any, i) => {
        const isEven = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          x: isEven ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // Drift on scroll
        gsap.to(card, {
          y: (i - 1) * -30,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // Staggered stars
        gsap.from(card.querySelectorAll(".star-icon"), {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          scale: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(2)",
          delay: 0.4
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: marquee animation
      if (marqueeRef.current) {
        // Clone for infinite scroll
        const clone = marqueeRef.current.innerHTML;
        marqueeRef.current.innerHTML += clone;

        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });

        // Staggered stars
        gsap.utils.toArray(".testimonial-card").forEach((card: any) => {
          gsap.from(card.querySelectorAll(".star-icon"), {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            opacity: 0,
            scale: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(2)",
          });
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-slate-900">
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/abonbg/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center 0%",
          filter: "grayscale(100%)"
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ratusan pelanggan telah membuktikan kelezatan Abon Nusantara. Ini cerita mereka.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={t.id} 
              className={`testimonial-card bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl relative ${idx % 2 !== 0 ? 'md:mt-12' : ''} will-change-transform`}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`star-icon w-5 h-5 ${i < t.rating ? 'text-blue-500 fill-blue-500' : 'text-slate-600'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-300 text-lg italic mb-6 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <h4 className="text-white font-bold text-lg">{t.name}</h4>
                <p className="text-slate-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout (Marquee) */}
        <div className="md:hidden flex overflow-hidden">
          <div ref={marqueeRef} className="flex gap-6 w-[200%]">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card w-[300px] flex-shrink-0 bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`star-icon w-5 h-5 ${i < t.rating ? 'text-blue-500 fill-blue-500' : 'text-slate-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6 text-sm leading-relaxed">
                  "{t.content}"
                </p>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
