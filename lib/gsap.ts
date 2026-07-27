"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Matches --ease-out-quart / --ease-out-expo in globals.css: crisp
  // deceleration, no overshoot — keep scripted and CSS motion in one voice.
  gsap.defaults({ ease: "power3.out", duration: 0.6 });
}

export { gsap, ScrollTrigger, SplitText };
export { useGSAP } from "@gsap/react";
