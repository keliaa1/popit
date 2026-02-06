"use client";

import { useEffect, useState } from "react";
import {
  HeroSection,
  AboutSection,
  TeamSection,
  TemplatesSection,
  FooterSection,
} from "./components";

// Template data
import { TEMPLATES } from "./data/templates";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference on initial render
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    // Save preference to localStorage when it changes
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#fff]" : "bg-[#f8f8f8]"}`}
    >
      {/* Hero Section */}
      <div id="home">
        <HeroSection isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Team Section (Testimonials) */}
      <div id="testimonials">
        <TeamSection isDarkMode={isDarkMode} />
      </div>

      {/* Templates Section */}
      <div id="templates">
        <TemplatesSection isDarkMode={isDarkMode} templates={TEMPLATES} />
      </div>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
