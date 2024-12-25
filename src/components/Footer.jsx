import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#E8F3E8] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-emerald-900 font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-emerald-800 hover:text-emerald-600">About us</a></li>
              <li><a href="/careers" className="text-emerald-800 hover:text-emerald-600">Careers</a></li>
              <li><a href="/terms" className="text-emerald-800 hover:text-emerald-600">Terms</a></li>
              <li><a href="/privacy" className="text-emerald-800 hover:text-emerald-600">Privacy</a></li>
              <li><a href="/ads" className="text-emerald-800 hover:text-emerald-600">Interest Based Ads</a></li>
              <li><a href="/preferences" className="text-emerald-800 hover:text-emerald-600">Ads Preferences</a></li>
              <li><a href="/help" className="text-emerald-800 hover:text-emerald-600">Help</a></li>
            </ul>
          </div>

          {/* Work With Us Section */}
          <div>
            <h3 className="text-emerald-900 font-semibold mb-4">WORK WITH US</h3>
            <ul className="space-y-2">
              <li><a href="/authors" className="text-emerald-800 hover:text-emerald-600">Authors</a></li>
              <li><a href="/advertise" className="text-emerald-800 hover:text-emerald-600">Advertise</a></li>
              <li><a href="/blog" className="text-emerald-800 hover:text-emerald-600">Author & Ads blog</a></li>
              <li><a href="/api" className="text-emerald-800 hover:text-emerald-600">API</a></li>
            </ul>
          </div>

          {/* Contact & Support Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-emerald-900 font-semibold mb-4">CONTACT</h3>
              <div className="flex space-x-4">
                <a href="/facebook" className="text-emerald-800 hover:text-emerald-600">
                  <Facebook size={20} />
                </a>
                <a href="/twitter" className="text-emerald-800 hover:text-emerald-600">
                  <Twitter size={20} />
                </a>
                <a href="/instagram" className="text-emerald-800 hover:text-emerald-600">
                  <Instagram size={20} />
                </a>
                <a href="/linkedin" className="text-emerald-800 hover:text-emerald-600">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-emerald-900 font-semibold mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-emerald-800 hover:text-emerald-600">FAQ</a></li>
                <li><a href="/search-guide" className="text-emerald-800 hover:text-emerald-600">Search Guide</a></li>
              </ul>
            </div>
          </div>

          {/* Logo & Download Section */}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">Logo Name</h2>
            <div className="space-y-4">
              <a href="/ios" className="inline-block">
                <img 
                  src="/api/placeholder/200/60" 
                  alt="Download on App Store" 
                  className="h-10"
                />
              </a>
              <a href="/android" className="inline-block">
                <img 
                  src="/api/placeholder/200/60" 
                  alt="Get it on Google Play" 
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-4 border-t border-emerald-200">
          <p className="text-emerald-800 text-sm">
            Copyright © {currentYear} - {currentYear} Novelistan. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;