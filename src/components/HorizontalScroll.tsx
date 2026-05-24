"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

const products = [
  { id: "1", name: "Abon Sapi Premium", price: "Rp 85.000", image: "https://picsum.photos/seed/abon1/800/800" },
  { id: "2", name: "Abon Ayam Kampung", price: "Rp 75.000", image: "https://picsum.photos/seed/abon2/800/800" },
  { id: "3", name: "Abon Ikan Tuna", price: "Rp 80.000", image: "https://picsum.photos/seed/abon3/800/800" },
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".h-scroll-item");
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      if (containerRef.current && sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => `+=${containerRef.current!.offsetWidth * sections.length}`,
          }
        });
      }
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-slate-50 md:h-screen flex items-center">
      <div className="md:flex md:w-[300vw] h-full flex-col md:flex-row">
        {products.map((product) => (
          <div key={product.id} className="h-scroll-item w-full md:w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 shrink-0">
            <div className="w-full md:w-3/5 h-[300px] md:h-[70vh] relative rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-0">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={product.id === "1"}
              />
            </div>
            <div className="w-full md:w-2/5 md:pl-16 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-slate-900 mb-4">{product.name}</h2>
              <p className="text-2xl font-sans font-bold text-blue-600 mb-8">{product.price}</p>
              <Link href={`/products/${product.id}`} className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors self-start shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Lihat Detail
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
