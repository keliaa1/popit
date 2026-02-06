"use client";

import Image from "next/image";
import { Zap } from "lucide-react";
import { FadeInOnScroll } from "./AnimationComponents";

interface TeamSectionProps {
  isDarkMode: boolean;
}

export function TeamSection({ isDarkMode }: TeamSectionProps) {
  return (
    <section
      className={`py-16 sm:py-24 md:py-32 px-4 sm:px-8 overflow-hidden relative transition-colors duration-300 ${isDarkMode ? "bg-[#161b22]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInOnScroll>
          <div className="flex flex-col items-center text-center mb-24">
            <span
              className={`font-bold text-sm tracking-wide mb-4 block transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Meet the People Behind the Pixels
            </span>
            <div className="relative">
              <h2
                className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-2 leading-tight transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Our Super Squad of Creatives
              </h2>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-2 bg-orange-100/60 rounded-full blur-[1px]" />
            </div>
          </div>
        </FadeInOnScroll>

        <div className="relative min-h-[500px] flex items-center justify-center">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="absolute w-[600px] h-[600px] border border-gray-100 rounded-full animate-rotate-slow" />
            <div className="absolute w-[450px] h-[450px] border border-gray-100 rounded-full animate-rotate-slow reverse-rotate" />
            <div className="absolute w-[600px] h-[600px] animate-rotate-slow">
              <div className="absolute top-10 left-1/4 w-3 h-3 bg-orange-200 rounded-full" />
              <div className="absolute bottom-10 right-1/4 w-4 h-4 bg-blue-200 rounded-full" />
            </div>
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
            >
              <path
                d="M0,220 C150,120 350,320 500,220 C650,120 850,320 1000,220"
                stroke="#bedaf7"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className="animate-wavy opacity-60"
              />
            </svg>
          </div>

          {/* Team Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative w-full items-center">
            {/* Card 1: Esther Howard */}
            <FadeInOnScroll delay={100}>
              <div className="flex justify-center rotate-[-6deg] hover:rotate-0 transition-all duration-500 hover:scale-110 z-20">
                <div className="bg-white p-8 rounded-[2rem] squad-card-shadow border border-gray-50 text-center w-64 card-hover-lift">
                  <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center p-1 border-4 border-white shadow-sm overflow-hidden relative">
                    <Image
                      src="/team/esther.png"
                      alt="Esther Howard"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Esther Howard
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Designer
                  </p>
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    &ldquo;Working with Imena has been transformative. Their
                    attention to detail is unmatched.&rdquo;
                  </p>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Card 2: Annette Black */}
            <FadeInOnScroll delay={200}>
              <div className="flex justify-center rotate-[-2deg] md:mt-12 hover:rotate-0 transition-all duration-500 hover:scale-110 z-30">
                <div className="bg-white p-8 rounded-[2rem] squad-card-shadow border border-gray-50 text-center w-64 card-hover-lift">
                  <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center p-1 border-4 border-white shadow-sm overflow-hidden relative">
                    <Image
                      src="/team/annette.png"
                      alt="Annette Black"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Annette Black
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Developer
                  </p>
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    &ldquo;The creativity and professionalism here is beyond
                    anything I&apos;ve experienced before.&rdquo;
                  </p>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Card 3: Arlene McCoy */}
            <FadeInOnScroll delay={300}>
              <div className="flex justify-center rotate-[4deg] hover:rotate-0 transition-all duration-500 hover:scale-110 z-20">
                <div className="bg-white p-8 rounded-[2rem] squad-card-shadow border border-gray-50 text-center w-64 card-hover-lift">
                  <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center p-1 border-4 border-white shadow-sm overflow-hidden relative">
                    <Image
                      src="/team/arlene.png"
                      alt="Arlene McCoy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Arlene McCoy
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    SEO Ex.
                  </p>
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    &ldquo;Every project is handled with dedication. Truly a
                    game-changer for our events.&rdquo;
                  </p>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Card 4: Special Card */}
            <FadeInOnScroll delay={400}>
              <div className="flex justify-center rotate-[8deg] md:mt-8 hover:rotate-0 transition-all duration-500 hover:scale-110 z-10">
                <div className="bg-white p-8 rounded-[2rem] squad-card-shadow border border-gray-50 text-left w-64 relative overflow-hidden group card-hover-lift">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-20 h-20 text-blue-600" />
                  </div>
                  <p className="text-[10px] font-bold text-[#1C2541] uppercase tracking-widest mb-2">
                    Dream
                  </p>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    Beginning
                  </h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    — Intelligence
                  </p>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1C2541] animate-pulse-soft" />
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse-soft stagger-1" />
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse-soft stagger-2" />
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
