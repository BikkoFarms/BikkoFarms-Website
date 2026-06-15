'use client';

import * as React from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';

export function Ambient3DBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Parallax spring animations for smooth mouse lag
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  // Cocoa pod parallax setup (moves slower for depth contrast)
  const podMouseX = useMotionValue(0);
  const podMouseY = useMotionValue(0);
  const podTranslateX = useSpring(podMouseX, springConfig);
  const podTranslateY = useSpring(podMouseY, springConfig);

  React.useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset percentage from screen center
      const x = (e.clientX / window.innerWidth - 0.5) * 45;
      const y = (e.clientY / window.innerHeight - 0.5) * 45;
      mouseX.set(x);
      mouseY.set(y);
      
      // Slower, opposing depth motion for cocoa pod
      podMouseX.set(x * -0.5);
      podMouseY.set(y * -0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, podMouseX, podMouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      
      {/* 3D Perspective Grid Background (Bottom scrolling terrain) */}
      <div className="absolute inset-x-0 bottom-0 top-[40%] perspective-container opacity-[0.8] dark:opacity-[0.6] transition-opacity duration-500">
        <div className="w-full h-[200%] perspective-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-bg via-neutral-bg/70 to-transparent pointer-events-none" />
      </div>

      {/* Floating 3D Specular Shapes Layer */}
      <div className="absolute inset-0 w-full h-full">

        {/* 1. Emerald Crop Seed (Top Left Area) */}
        <motion.div
          style={{ x: translateX, y: translateY }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[18%] left-[8%] w-48 h-48 opacity-[0.75] dark:opacity-[0.6] filter drop-shadow-[0_20px_40px_rgba(22,163,74,0.12)] dark:drop-shadow-[0_20px_40px_rgba(22,163,74,0.25)]"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="seedGrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-seed-start)" />
                <stop offset="50%" stopColor="var(--3d-seed-mid)" />
                <stop offset="100%" stopColor="var(--3d-seed-end)" />
              </linearGradient>
              <radialGradient id="seedHighlight" cx="35" cy="30" r="25" fx="35" fy="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-specular-white)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--3d-specular-white)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="glassReflection" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Primary Seed Shape */}
            <path
              d="M50,15 C75,35 80,65 50,85 C20,65 25,35 50,15 Z"
              fill="url(#seedGrad)"
              stroke="var(--3d-seed-stroke)"
              strokeWidth="0.75"
              strokeDasharray="4,2"
            />
            {/* Glass Shimmer Overlay */}
            <path
              d="M50,15 C75,35 80,65 50,85 C20,65 25,35 50,15 Z"
              fill="url(#glassReflection)"
              style={{ mixBlendMode: 'overlay' }}
            />
            {/* 3D Wireframe Ribs for Depth */}
            <path d="M50,15 C58,35 60,65 50,85" stroke="var(--3d-rib-color)" strokeWidth="0.5" strokeOpacity="0.6" />
            <path d="M50,15 C42,35 40,65 50,85" stroke="var(--3d-rib-color)" strokeWidth="0.5" strokeOpacity="0.6" />
            <path d="M50,15 Q50,50 50,85" stroke="var(--3d-rib-color)" strokeWidth="0.5" strokeOpacity="0.4" />
            {/* Specular Glow Highlight */}
            <ellipse cx="38" cy="35" rx="8" ry="14" transform="rotate(-20 38 35)" fill="url(#seedHighlight)" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            x: podTranslateX,
            y: podTranslateY,
          }}
          // Update values programmatically to add slight offset relative to standard coordinates
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[45%] right-[6%] w-56 h-56 opacity-[0.7] dark:opacity-[0.5] filter drop-shadow-[0_25px_50px_rgba(180,83,9,0.12)] dark:drop-shadow-[0_25px_50px_rgba(180,83,9,0.25)]"
        >
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="podGrad" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-pod-start)" />
                <stop offset="60%" stopColor="var(--3d-pod-mid)" />
                <stop offset="100%" stopColor="var(--3d-pod-end)" />
              </linearGradient>
              <radialGradient id="podHighlight" cx="45" cy="40" r="30" fx="45" fy="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-specular-white)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--3d-specular-white)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="glassReflectionPod" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {/* Cocoa Pod Geometric Shape */}
            <path
              d="M60,15 C85,35 95,65 80,95 C65,105 55,105 40,95 C25,65 35,35 60,15 Z"
              fill="url(#podGrad)"
              stroke="var(--3d-pod-stroke)"
              strokeWidth="0.75"
            />
            {/* Glass Shimmer Overlay */}
            <path
              d="M60,15 C85,35 95,65 80,95 C65,105 55,105 40,95 C25,65 35,35 60,15 Z"
              fill="url(#glassReflectionPod)"
              style={{ mixBlendMode: 'overlay' }}
            />
            {/* Pod Ribs */}
            <path d="M60,15 C68,40 78,70 65,98" stroke="var(--3d-rib-amber)" strokeWidth="0.5" strokeOpacity="0.7" />
            <path d="M60,15 C52,40 42,70 55,98" stroke="var(--3d-rib-amber)" strokeWidth="0.5" strokeOpacity="0.7" />
            <path d="M60,15 C75,40 85,70 73,96" stroke="var(--3d-rib-amber)" strokeWidth="0.4" strokeOpacity="0.4" />
            <path d="M60,15 C45,40 35,70 47,96" stroke="var(--3d-rib-amber)" strokeWidth="0.4" strokeOpacity="0.4" />
            {/* Glare Highlight */}
            <ellipse cx="45" cy="38" rx="7" ry="12" transform="rotate(-15 45 38)" fill="url(#podHighlight)" />
          </svg>
        </motion.div>

        {/* 3. Lisk Blockchain Gem (Bottom Left Area) */}
        <motion.div
          style={{ x: translateX, y: translateY }}
          animate={{
            y: [0, -22, 0],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
            rotateY: { duration: 24, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute bottom-[15%] left-[12%] w-40 h-40 opacity-[0.7] dark:opacity-[0.5] filter drop-shadow-[0_20px_40px_rgba(14,165,233,0.12)] dark:drop-shadow-[0_20px_40px_rgba(14,165,233,0.25)]"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="liskGradTop" x1="50" y1="10" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-lisk-start)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--3d-lisk-mid)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="liskGradBottom" x1="50" y1="50" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--3d-lisk-mid)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--3d-lisk-end)" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="glassReflectionLisk" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Isometric Glass Octahedron Facets */}
            {/* Top Pyramid */}
            <path d="M50,15 L80,50 L50,55 Z" fill="url(#liskGradTop)" stroke="var(--3d-lisk-stroke)" strokeWidth="0.5" />
            <path d="M50,15 L20,50 L50,55 Z" fill="url(#liskGradTop)" fillOpacity="0.9" stroke="var(--3d-lisk-stroke)" strokeWidth="0.5" />
            {/* Glass Face Overlay */}
            <path d="M50,15 L80,50 L50,55 Z" fill="url(#glassReflectionLisk)" style={{ mixBlendMode: 'overlay' }} />
            <path d="M50,15 L80,50 L20,50 Z" fill="var(--3d-specular-white)" fillOpacity="0.05" />
            {/* Bottom Pyramid */}
            <path d="M50,85 L80,50 L50,55 Z" fill="url(#liskGradBottom)" stroke="var(--3d-lisk-stroke)" strokeWidth="0.5" />
            <path d="M50,85 L20,50 L50,55 Z" fill="url(#liskGradBottom)" fillOpacity="0.9" stroke="var(--3d-lisk-stroke)" strokeWidth="0.5" />
            {/* Highlight Line */}
            <line x1="50" y1="15" x2="50" y2="85" stroke="var(--3d-specular-white)" strokeWidth="0.75" strokeOpacity="0.5" />
          </svg>
        </motion.div>

        {/* 4. Ambient Organic Sage Blob (Far Right Top Area) */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[8%] right-[15%] w-72 h-72 rounded-full bg-brand-green-500/5 dark:bg-brand-green-500/10 glow-blur opacity-[0.5] dark:opacity-[0.3]"
        />

      </div>
    </div>
  );
}
