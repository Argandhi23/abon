"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Get top 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  useGSAP(() => {
    // Heading clip-path reveal
    gsap.fromTo(headingRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        }
      }
    );

    // Product cards staggered entrance
    gsap.from(".product-card-wrapper", {
      scrollTrigger: {
        trigger: ".products-grid",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      rotation: 3,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });

    // Subtle image zoom out parallax on scroll
    gsap.utils.toArray(".product-img").forEach((img: any) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.15,
        ease: "none"
      });
    });

    // Badge pulsing animation loop
    gsap.to(".badge", {
      scale: 1.08,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut"
    });
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div ref={headingRef} className="max-w-2xl overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pilihan Favorit Pelanggan
            </h2>
            <p className="text-slate-600 text-lg">
              Koleksi abon terbaik kami yang paling banyak dicari. Rasakan sensasi gurih dan nikmat di setiap suapan.
            </p>
          </div>
          <Link href="/products" className="group hidden md:flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors mt-6 md:mt-0">
            Lihat Semua Produk
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Link href="/products" className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            Lihat Semua Produk
          </Link>
        </div>

      </div>
    </section>
  );
}
