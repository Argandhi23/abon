"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const pathname = usePathname();
  const { state } = useCart();
  const containerRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  if (pathname === "/admin") return null;

  const links = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/products" },
    { name: "Tentang", path: "/#about" },
    { name: "Kontak", path: "/#contact" },
  ];

  useGSAP(() => {
    // Entrance animation
    gsap.from(containerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Scroll behavior
    if (navbarRef.current) {
      ScrollTrigger.create({
        start: "top -80px",
        onEnter: () => {
          gsap.to(navbarRef.current, {
            height: 48,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(navbarRef.current, {
            height: 64,
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            duration: 0.3,
          });
        },
      });
    }

    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  // Mobile Menu Animation
  useGSAP(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "block",
      });
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        }
      });
    }
  }, [isMobileMenuOpen]);

  // Hover animations for links
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector(".underline-anim");
    if (underline) {
      gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector(".underline-anim");
    if (underline) {
      gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <header ref={containerRef} className="fixed top-0 left-0 right-0 z-50">
      <div 
        ref={navbarRef}
        className="h-16 px-4 md:px-8 mx-auto flex items-center justify-between transition-colors duration-300"
      >
        <Link href="/" className="flex items-center space-x-1 group">
          <span className="text-2xl font-display italic font-bold text-blue-600 tracking-tight">Abon</span>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">LL</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative text-slate-800 font-medium hover:text-blue-600 transition-colors py-2"
            >
              {link.name}
              <span className="underline-anim absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 scale-x-0 origin-left"></span>
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative p-2 text-slate-800 hover:text-blue-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {state.itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                {state.itemCount}
              </span>
            )}
          </Link>
          
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef} 
        className="md:hidden hidden bg-white shadow-lg overflow-hidden absolute w-full"
      >
        <div className="flex flex-col px-4 pt-2 pb-6 space-y-4">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-slate-800 font-medium hover:text-blue-600 transition-colors py-2 border-b border-slate-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div ref={progressBarRef} className="h-0.5 bg-blue-600 origin-left scale-x-0 absolute bottom-0 left-0 right-0" />
    </header>
  );
}
