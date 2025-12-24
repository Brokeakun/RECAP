"use client";

import { motion } from "framer-motion";

export default function BackgroundAura() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050505]">
      {/* Grain Filter Definition */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{ filter: 'url(#noiseFilter)' }}
      />

      {/* Animated Blobs Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Deep Navy Blob - Anchor */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#1e293b] mix-blend-normal filter blur-[80px] opacity-60"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Vibrant Orange Blob - Accent */}
        <motion.div
          className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-[#ea580c] mix-blend-screen filter blur-[100px] opacity-50"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Muted Cream Blob - Light */}
        <motion.div
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#f5f5dc] mix-blend-normal filter blur-[90px] opacity-30"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.3, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Soft Purple Blob - Dreamy */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#a855f7] mix-blend-screen filter blur-[100px] opacity-40"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      
      {/* Glassmorphism Overlay to blend everything */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
    </div>
  );
}
