import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-32">
                <Image
                  src="/qc-logo.png"
                  alt="QC Technologies Logo"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted source for premium LED lights and trade toolboxes for
              trucks, 4WDs, caravans, and trailers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/LEDandtoolboxshop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/qctechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-xl font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/led-lights"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  LED Lights
                </Link>
              </li>
              <li>
                <Link
                  href="/products/toolboxes"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Toolboxes
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tail-lights"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Tail Lights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-oswald text-xl font-bold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <a
                  href="tel:0423102488"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  0423 102 488
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <a
                  href="mailto:sales@qctechnologies.com.au"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  sales@qctechnologies.com.au
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-400">
                  Unit 2, 3 Wicks Street
                  <br />
                  Bayswater WA 6053
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <div className="text-gray-400">
                  <div>Mon - Fri: 9:00 - 5:00</div>
                  <div>Sat: 9:00 - 12:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} QC Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

