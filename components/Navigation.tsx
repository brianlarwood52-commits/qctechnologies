"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/products/led-lights",
      label: "LED Lights",
      subcategories: [
        { href: "/products/led-lights/work-lights", label: "Work Lights" },
        { href: "/products/led-lights/emergency-lights", label: "Emergency Lights" },
        { href: "/products/led-lights/signal-lights", label: "Signal Lights" },
        { href: "/products/led-lights/bike-lights", label: "Bike Lights" },
      ],
    },
    {
      href: "/products/toolboxes",
      label: "Toolboxes",
      subcategories: [
        { href: "/products/toolboxes/canopy", label: "Canopy Toolboxes" },
        { href: "/products/toolboxes/dog-boxes", label: "Dog Boxes" },
        { href: "/products/toolboxes/mine-service", label: "Mine Service" },
      ],
    },
    { href: "/products/tail-lights", label: "Tail Lights" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src="/qc-logo.png"
                alt="QC Technologies Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, 56px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-oswald text-xl font-bold text-white">
                QC TECHNOLOGIES
              </div>
              <div className="text-xs text-gray-400 font-normal">
                LED Lights & Toolboxes
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.subcategories) {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => {
                      // Clear any pending timeout
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                        setDropdownTimeout(null);
                      }
                      setOpenDropdown(link.href);
                    }}
                    onMouseLeave={() => {
                      // Add a small delay before closing to allow mouse movement
                      const timeout = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 150);
                      setDropdownTimeout(timeout);
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-red-500 transition-colors font-medium relative flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                    </Link>
                    {openDropdown === link.href && (
                      <div 
                        className="absolute top-full left-0 pt-2 w-56 z-50"
                        onMouseEnter={() => {
                          // Keep open when hovering over dropdown
                          if (dropdownTimeout) {
                            clearTimeout(dropdownTimeout);
                            setDropdownTimeout(null);
                          }
                        }}
                        onMouseLeave={() => {
                          // Close when leaving dropdown
                          const timeout = setTimeout(() => {
                            setOpenDropdown(null);
                          }, 150);
                          setDropdownTimeout(timeout);
                        }}
                      >
                        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                        {link.subcategories.map((subcat) => (
                          <Link
                            key={subcat.href}
                            href={subcat.href}
                            prefetch={true}
                            className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-red-500 transition-colors border-b border-gray-800 last:border-b-0"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subcat.label}
                          </Link>
                        ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                </Link>
              );
            })}
            <a
              href="tel:0423102488"
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors glow-effect"
            >
              <Phone size={18} />
              <span className="font-semibold">0423 102 488</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-red-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-950/98 backdrop-blur-md">
          {navLinks.map((link) => {
            if (link.subcategories) {
              return (
                <div key={link.href} className="border-b border-gray-800">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-gray-300 hover:text-red-500 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                      <div className="pl-4 pb-2 space-y-1">
                        {link.subcategories.map((subcat) => (
                          <Link
                            key={subcat.href}
                            href={subcat.href}
                            prefetch={true}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                          >
                            {subcat.label}
                          </Link>
                        ))}
                      </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-300 hover:text-red-500 transition-colors border-b border-gray-800"
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="tel:0423102488"
            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors mt-4"
          >
            <Phone size={18} />
            <span className="font-semibold">0423 102 488</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

