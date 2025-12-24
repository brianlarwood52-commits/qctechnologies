"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Play, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Background type: 'slideshow' | 'video' | 'animated' (current)
type BackgroundType = 'slideshow' | 'video' | 'animated';

// Hero images for slideshow (downloaded from live site)
const heroImages = [
  {
    src: "/hero/hero-1.jpg",
    alt: "LED Lights on Truck",
  },
  {
    src: "/hero/hero-2.jpg",
    alt: "New Range LED Tail Lights",
  },
  {
    src: "/hero/hero-3.jpg",
    alt: "OAR800 Series LED Trailer Lights",
  },
  {
    src: "/hero/hero-4.jpg",
    alt: "OARW300 Series LED Truck Tail Lights",
  },
  {
    src: "/hero/hero-5.jpg",
    alt: "OARW258 Series Truck Trailer Ute Tail Lights",
  },
];

// Video source (optional - add your video to public/hero/)
const heroVideo = "/hero/hero-video.mp4";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('slideshow'); // 'slideshow' | 'video' | 'animated'

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slideshow auto-advance - DISABLED (static image)
  // useEffect(() => {
  //   if (backgroundType === 'slideshow') {
  //     const interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  //     }, 5000); // Change slide every 5 seconds
  //     return () => clearInterval(interval);
  //   }
  // }, [backgroundType]);

  // Video controls
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background - Slideshow */}
      {backgroundType === 'slideshow' && (
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
                onError={(e) => {
                  // Fallback to animated background if image fails
                  console.warn(`Hero image ${image.src} failed to load, falling back to animated background`);
                  if (index === 0) setBackgroundType('animated');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/70 to-black/80"></div>
            </div>
          ))}
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-red-500' : 'w-2 bg-gray-500/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Background - Video */}
      {backgroundType === 'video' && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => {
              console.warn('Hero video failed to load, falling back to animated background');
              setBackgroundType('animated');
            }}
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/70 via-gray-900/60 to-black/70"></div>
          {/* Video controls */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
          >
            {isVideoPlaying ? (
              <Pause className="text-white" size={24} />
            ) : (
              <Play className="text-white" size={24} />
            )}
          </button>
        </div>
      )}

      {/* Background - Animated (Default) */}
      {backgroundType === 'animated' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>
          {/* Floating Particles - Only render on client to avoid hydration mismatch */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-0">
          {/* QC Logo and Technologies */}
          <div className="flex flex-col items-center justify-center mb-20">
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 -mb-5">
              <Image
                src="/QC-Technologies-Logo good.png"
                alt="QC Technologies Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                priority
              />
            </div>
            <div className="font-inter text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-lg tracking-wide">
              <span className="font-bold">QC</span> TECHNOLOGIES
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-0">
            <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-white mb-0">THE LED LIGHT</span>
              <span className="block text-gradient mb-0">AND TOOLBOX</span>
              <span className="block text-white">STORE</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light -mt-1">
              FOR TRUCKS, 4WDs, CARAVANS & TRAILERS
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/products/led-lights"
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold text-white overflow-hidden transition-all hover:scale-105 glow-effect"
            >
              <span className="relative z-10">Explore LED Lights</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="/products/toolboxes"
              className="px-8 py-4 border-2 border-red-600 rounded-lg font-semibold text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              View Toolboxes
            </Link>
          </div>

          {/* Premium Tagline */}
          <div className="mt-8">
            <p className="text-sm sm:text-base text-gray-400 font-medium">
              PREMIUM AUTOMOTIVE LIGHTING & TOOLBOXES
            </p>
          </div>

          {/* Location & Contact */}
          <div className="mt-12 space-y-2 text-gray-400">
            <p className="text-lg">Unit 2, 3 Wicks Street, Bayswater WA 6053</p>
            <a
              href="tel:0423102488"
              className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors text-xl font-semibold"
            >
              <span>Call: 0423 102 488</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-gray-500" size={24} />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
