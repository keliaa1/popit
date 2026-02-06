"use client";

import Link from "next/link";
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative">
      {/* Dark Blue Top Section */}
      <div className="bg-[#1C2541] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Left - Logo and Tagline */}
            <div className="text-white">
              <div className="text-4xl font-serif italic mb-3">f.</div>
              <p className="text-gray-400 text-sm max-w-[180px] leading-relaxed">
                Inspire, educate and entertain entrepreneurs.
              </p>
            </div>

            {/* Right - Navigation Links */}
            <div className="flex flex-wrap gap-x-16 gap-y-4 text-sm">
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Channels
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  The Vision
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Gallery
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors underline"
                >
                  Events
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Partners
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Light Background Section with Newsletter Card */}
      <div className="bg-[#f8f8f8] px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Attribution Text */}
          <p className="text-right text-xs text-gray-500 mb-6">
            Website Made by ChronoTask, the best productivity platform in the
            world!
          </p>

          {/* Newsletter Card */}
          <div className="bg-[#faf6f1] rounded-[2rem] p-8 md:p-10 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Left Side - Newsletter Form */}
              <div className="flex-1 max-w-md">
                <div className="text-4xl md:text-5xl font-serif italic text-[#1C2541] mb-4 tracking-tight">
                  chronotask<span className="text-base align-top ml-1">™</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Newsletter
                </h3>
                <div className="flex items-stretch mb-3 max-w-sm">
                  <input
                    type="email"
                    placeholder="email"
                    className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-l-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1C2541] text-sm"
                  />
                  <button className="px-5 py-3 bg-[#1C2541] text-white rounded-r-full hover:bg-[#0f1629] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-[#1C2541]">
                  We promise, no spaaaaaaam{" "}
                  <span className="text-red-500">(f*ck the spammers)</span>
                </p>
              </div>

              {/* Right Side - CTA, Description, and Social */}
              <div className="flex flex-col items-start lg:items-end gap-5">
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-800 rounded-full font-semibold hover:border-[#1C2541] hover:text-[#1C2541] transition-all text-sm">
                  Work together?
                </button>
                <p className="text-xs text-gray-600 max-w-[260px] text-left lg:text-right leading-relaxed">
                  Every week, we share a ton of content to help you grow your
                  business. If you don&apos;t want to miss a thing, drop us your
                  e-mail. <span className="text-red-500">❤</span>
                </p>
                <div className="flex gap-5 items-center">
                  <Instagram className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#1C2541] transition-colors" />
                  <Linkedin className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#1C2541] transition-colors" />
                  <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#1C2541] transition-colors" />
                  <Youtube className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#1C2541] transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
