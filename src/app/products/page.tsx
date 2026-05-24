"use client";

import React, { useState, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const categories = ["Semua", "Abon Sapi", "Abon Ayam", "Abon Ikan"];

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useGSAP(() => {
    // Initial entrance animations
    const tl = gsap.timeline();
    
    tl.from(filterRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .from(".product-grid-item", {
      y: 100,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.2");
  }, { scope: containerRef });

  // Handle category change with animation
  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    
    // Animate out current cards
    gsap.to(".product-grid-item", {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      onComplete: () => {
        // Update state
        setActiveCategory(cat);
        const newProducts = cat === "Semua" 
          ? products 
          : products.filter(p => p.category === cat);
        setFilteredProducts(newProducts);
        
        // Wait for next tick so DOM updates
        requestAnimationFrame(() => {
          // Animate in new cards
          gsap.fromTo(".product-grid-item", 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
          );
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAF9] pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Katalog Produk</h1>
          <p className="text-slate-600">Pilih abon favorit Anda dari berbagai varian rasa premium kami.</p>
        </div>

        {/* Filter Bar */}
        <div ref={filterRef} className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-full border border-slate-200 shadow-sm overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-grid-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Tidak ada produk ditemukan untuk kategori ini.</p>
          </div>
        )}

      </div>
    </div>
  );
}
