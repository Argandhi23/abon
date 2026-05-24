import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer, MotionPathPlugin, useGSAP);
  
  // Default ScrollTrigger settings
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    start: "top 85%",
  });
}

export default gsap;
export { ScrollTrigger, Observer, useGSAP };
