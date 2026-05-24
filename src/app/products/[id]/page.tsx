"use client";

import React, { useRef, useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, Star, ShieldCheck, Clock, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    notFound();
  }

  const { dispatch } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const productSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || { weight: product.weight, price: product.price });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");
  
  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
    
  if (relatedProducts.length < 4) {
    const more = products.filter(p => p.category !== product.category).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...more);
  }

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Split reveal
    tl.from(imageRef.current, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(infoRef.current, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8");
    
    // Variant buttons stagger
    gsap.from(".variant-btn", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.5)",
      delay: 0.6
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (productSectionRef.current && imageRef.current) {
        ScrollTrigger.create({
          trigger: productSectionRef.current,
          start: "top 100px",
          end: "bottom bottom",
          pin: imageRef.current,
          pinSpacing: false,
        });

        gsap.to(imageRef.current, {
          scale: 1.06,
          rotation: 2,
          scrollTrigger: {
            trigger: productSectionRef.current,
            start: "top 100px",
            end: "bottom bottom",
            scrub: 2,
          }
        });
      }
    });

    // Related products
    gsap.from(".related-item", {
      scrollTrigger: {
        trigger: ".related-section",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });

  }, { scope: containerRef });

  // Tab switch animation
  const handleTabSwitch = (tab: string) => {
    if (tab === activeTab) return;
    
    gsap.to(tabContentRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(tabContentRef.current, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedVariant.weight}`,
        productId: product.id,
        name: product.name,
        price: selectedVariant.price,
        weight: selectedVariant.weight,
        image: product.images[0],
        quantity: quantity,
      }
    });

    // Button animation
    gsap.fromTo(".add-to-cart-btn", 
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(selectedVariant.price);

  return (
    <div ref={containerRef} className="bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-slate-500 flex items-center space-x-2">
            <span className="hover:text-blue-700 cursor-pointer">Beranda</span>
            <span>/</span>
            <span className="hover:text-blue-700 cursor-pointer">Produk</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
        <div ref={productSectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Images */}
          <div ref={imageRef} className="space-y-4 will-change-transform z-10">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold text-white z-10 
                  ${product.badge === 'Best Seller' ? 'bg-blue-600' : 
                    product.badge === 'New' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.badge}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer
                  ${idx === 0 ? 'border-blue-600' : 'border-slate-200 opacity-60 hover:opacity-100'}`}>
                  <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div ref={infoRef} className="flex flex-col">
            <div className="mb-2 flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center text-blue-600 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-bold">{product.rating}</span>
                <span className="text-slate-400 ml-1">({product.reviewCount} ulasan)</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="text-3xl font-black text-blue-600 mb-6">
              {formattedPrice}
            </div>
            
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              {/* Variants */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Pilih Kemasan</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants?.map((v) => (
                    <button
                      key={v.weight}
                      onClick={() => setSelectedVariant(v)}
                      className={`variant-btn flex items-center px-5 py-3 rounded-xl border-2 font-medium transition-all
                        ${selectedVariant.weight === v.weight 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 text-slate-600 hover:border-blue-400'}`}
                    >
                      {selectedVariant.weight === v.weight && <Check className="w-4 h-4 mr-2 text-blue-600" />}
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Jumlah</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden h-12 w-32">
                    <button 
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <div className="flex-1 text-center font-bold text-slate-900">{quantity}</div>
                    <button 
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                  </div>
                  <div className="text-sm text-slate-500">
                    Sisa stok: <span className="font-bold text-slate-700">{product.stock}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn flex-1 flex items-center justify-center h-14 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                Masukkan Keranjang
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center text-slate-600 text-sm">
                <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                Jaminan Kualitas
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                Tahan hingga 6 bulan
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-20 pt-10 border-t border-slate-200" ref={tabsRef}>
          <div className="flex space-x-8 border-b border-slate-200 mb-8">
            {['deskripsi', 'gizi', 'penyimpanan'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabSwitch(tab)}
                className={`pb-4 text-lg font-bold capitalize transition-colors relative
                  ${activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>

          <div ref={tabContentRef} className="min-h-[200px]">
            {activeTab === 'deskripsi' && (
              <div className="text-slate-600 leading-relaxed max-w-3xl space-y-4">
                <p>{product.description}</p>
                <p>Abon Nusantara diproduksi menggunakan teknologi pengeringan modern yang tetap mempertahankan serat daging asli. Bumbu yang digunakan adalah rempah segar seperti bawang merah, bawang putih, ketumbar, lengkuas, dan gula aren asli yang memberikan cita rasa manis gurih karamel.</p>
                <p>Sangat cocok disajikan sebagai taburan nasi hangat, bubur ayam, isian roti, atau camilan langsung.</p>
              </div>
            )}
            {activeTab === 'gizi' && (
              <div className="text-slate-600 max-w-2xl">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-100"><th className="py-3 font-medium">Kalori</th><td className="py-3">120 kkal / porsi</td></tr>
                    <tr className="border-b border-slate-100"><th className="py-3 font-medium">Protein</th><td className="py-3">15g</td></tr>
                    <tr className="border-b border-slate-100"><th className="py-3 font-medium">Lemak</th><td className="py-3">4g</td></tr>
                    <tr className="border-b border-slate-100"><th className="py-3 font-medium">Karbohidrat</th><td className="py-3">6g</td></tr>
                  </tbody>
                </table>
                <p className="text-sm mt-4 text-slate-400">*Nilai gizi rata-rata per 100g sajian</p>
              </div>
            )}
            {activeTab === 'penyimpanan' && (
              <div className="text-slate-600 leading-relaxed max-w-3xl">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Simpan di tempat yang sejuk dan kering, terhindar dari sinar matahari langsung.</li>
                  <li>Setelah kemasan dibuka, pastikan klip tertutup rapat atau pindahkan ke wadah kedap udara.</li>
                  <li>Abon dapat bertahan hingga 6 bulan pada suhu ruang, dan lebih lama jika disimpan di lemari es.</li>
                  <li>Gunakan sendok kering saat mengambil abon dari kemasan untuk mencegah jamur.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-section mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Mungkin Anda Suka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id} className="related-item">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
