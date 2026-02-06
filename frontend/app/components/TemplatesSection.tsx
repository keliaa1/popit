"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { FadeInOnScroll } from "./AnimationComponents";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Template {
  id: string;
  title: string;
  category: string;
  price: string;
  code: string;
  image: string;
}

interface TemplatesSectionProps {
  isDarkMode: boolean;
  templates: Template[];
}

export function TemplatesSection({
  isDarkMode,
  templates,
}: TemplatesSectionProps) {
  return (
    <section
      className={`py-16 sm:py-24 md:py-32 px-4 overflow-hidden relative border-t transition-colors duration-300 ${isDarkMode ? "bg-[#0d1117] border-gray-800" : "bg-[#f8f8f8] border-gray-100"}`}
    >
      {/* Background Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.4]"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 600 C 200 400, 600 800, 1540 500"
            stroke={isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100 700 C 300 500, 700 900, 1540 600"
            stroke={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100 300 C 400 100, 900 600, 1540 300"
            stroke={isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        {/* Soft Blobs for depth */}
        <div
          className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${isDarkMode ? "bg-blue-900/20" : "bg-blue-200/40"}`}
        />
        <div
          className={`absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${isDarkMode ? "bg-purple-900/20" : "bg-purple-200/40"}`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <span className="text-[#1C2541] font-bold text-sm tracking-widest uppercase mb-4 block">
              Selected Templates
            </span>
            <h2
              className={`text-2xl sm:text-4xl md:text-6xl font-serif italic max-w-2xl mx-auto leading-tight tracking-tight transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Choose your theme and start creating
            </h2>
          </div>
        </FadeInOnScroll>

        <div className="w-full py-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper !pb-14"
            style={{
              // @ts-expect-error - CSS variables are not typed in React.CSSProperties
              "--swiper-pagination-color": "#1C2541",
              "--swiper-pagination-bullet-inactive-color": "#999",
            }}
          >
            {[
              ...templates,
              ...templates,
              ...templates,
              ...templates,
              ...templates,
              ...templates,
            ].map((template, idx) => (
              <SwiperSlide
                key={idx}
                className="!w-[300px] !h-[450px] sm:!w-[350px] sm:!h-[500px]"
              >
                <div
                  className={`relative w-full h-full group overflow-hidden rounded-[2rem] border-[6px] shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-[#1C2541] border-[#3A506B]" : "bg-white border-white"}`}
                >
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Expandable Bottom Sheet */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-tr-[3rem] px-6 py-5 transform translate-y-[calc(100%-88px)] group-hover:translate-y-0 transition-all duration-500 cubic-bezier(0.23,1,0.32,1) flex flex-col gap-4 shadow-xl ${isDarkMode ? "bg-[#1C2541]" : "bg-white"}`}
                  >
                    {/* Always Visible Header */}
                    <div className="flex flex-col items-start text-left">
                      <h3
                        className={`text-xl font-bold tracking-tight uppercase transition-colors ${isDarkMode ? "text-white" : "text-[#1C2541]"}`}
                      >
                        {template.title}
                      </h3>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                      >
                        {template.category}
                      </p>
                    </div>

                    {/* Hidden Content (Reveals on hover) */}
                    <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <div
                        className={`w-full h-[1px] ${isDarkMode ? "bg-white/10" : "bg-gray-100"}`}
                      />
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 transition-colors ${isDarkMode ? "text-white/80" : "text-gray-500"}`}
                      >
                        Create a stunning {template.title.toLowerCase()}{" "}
                        invitation in seconds. Fully customizable and ready to
                        share.
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${isDarkMode ? "text-white/60" : "text-[#1C2541]/60"}`}
                        >
                          <Zap
                            className={`w-3 h-3 ${isDarkMode ? "text-white" : "text-[#3A506B]"}`}
                          />
                          <span>{template.code}</span>
                        </div>
                        <span
                          className={`font-bold text-sm transition-colors ${isDarkMode ? "text-white" : "text-[#1C2541]"}`}
                        >
                          {template.price}
                        </span>
                      </div>
                      <Link
                        href={`/form?template=${template.id}`}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-colors ${isDarkMode ? "bg-white text-[#1C2541] hover:bg-gray-200" : "bg-[#1C2541] text-white hover:bg-[#3A506B]"}`}
                      >
                        Try Template
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
