"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  MessageSquare,
  Image as ImageIcon,
  Lock,
  ChevronRight,
  Info,
  Download,
  Loader2,
  Calendar as CalendarIcon,
  MapPin,
  Award,
  Users,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { TEMPLATES } from "../data/templates";

type Step = {
  category: string;
  question: string;
  instruction: string;
  type: "text" | "textarea" | "file" | "time" | "date" | "number";
  placeholder?: string;
  field: string;
  icon: React.ReactNode;
};

const TEMPLATE_CONFIGS: Record<string, { title: string; steps: Step[] }> = {
  birthday: {
    title: "Birthday Template",
    steps: [
      {
        category: "Personalize",
        question: "Who are we celebrating?",
        instruction:
          "Enter the recipient's name as it should appear on the card.",
        type: "text",
        placeholder: "Recipient's Name",
        field: "name",
        icon: <User className="w-5 h-5" />,
      },
      {
        category: "Personalize",
        question: "Write a heartfelt message",
        instruction: "Choose your words carefully for their special day.",
        type: "textarea",
        placeholder: "Your birthday message...",
        field: "message",
        icon: <MessageSquare className="w-5 h-5" />,
      },
      {
        category: "Personalize",
        question: "Add a special photo",
        instruction: "A picture is worth a thousand heartbeats.",
        type: "file",
        field: "image",
        icon: <ImageIcon className="w-5 h-5" />,
      },
    ],
  },
  kwibuka: {
    title: "Kwibuka Template",
    steps: [
      {
        category: "Commemorate",
        question: "What is the number of years?",
        instruction: "Which year of commemoration is this? (e.g., 31)",
        type: "number",
        placeholder: "Enter number (e.g., 31)",
        field: "years",
        icon: <Award className="w-5 h-5" />,
      },
      {
        category: "Commemorate",
        question: "Date of commemoration",
        instruction: "Enter the date for the event (e.g., 5 May 2026).",
        type: "text",
        placeholder: "e.g., 5 May 2026",
        field: "date",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Commemorate",
        question: "Where is the venue?",
        instruction: "Enter the venue or memorial site address.",
        type: "text",
        placeholder: "e.g., Nyabihu Genocide Memorial Site",
        field: "venue",
        icon: <MapPin className="w-5 h-5" />,
      },
      {
        category: "Message",
        question: "Message of Hope",
        instruction: "Enter a brief message to be displayed at the bottom.",
        type: "textarea",
        placeholder: "Your message of hope...",
        field: "messageOfHope",
        icon: <MessageSquare className="w-5 h-5" />,
      },
    ],
  },
  event: {
    title: "Event Template",
    steps: [
      {
        category: "Celebrate",
        question: "What is the date of the event?",
        instruction: "Enter the date of the celebration (e.g. 12th June 2026).",
        type: "text",
        placeholder: "Event Date",
        field: "eventDate",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Celebrate",
        question: "What day is the event?",
        instruction: "Enter the day of the week (e.g. Friday).",
        type: "text",
        placeholder: "Event Day",
        field: "eventDay",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Celebrate",
        question: "The hosting family",
        instruction: "Who is hosting this special event?",
        type: "text",
        placeholder: "Family name or host",
        field: "hostingFamily",
        icon: <Users className="w-5 h-5" />,
      },
      {
        category: "Location",
        question: "Where is the event?",
        instruction: "Enter the location or venue address.",
        type: "text",
        placeholder: "Event Location",
        field: "location",
        icon: <MapPin className="w-5 h-5" />,
      },
    ],
  },
};

const API_BASE_URL = "https://paper-pop-backend-mruc.onrender.com";
// const API_BASE_URL = "http://localhost:5000";

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("template") || "birthday";
  const config = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS.birthday;
  const steps = config.steps;
  const TOTAL_STEPS = steps.length;

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode, mounted } = useTheme();

  // Reset form when template changes
  useEffect(() => {
    setCurrentStep(1);
    setFormData({});
    setPdfUrl(null);
    setImageUrl(null);
  }, [templateId]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const percentage = Math.round((currentStep / TOTAL_STEPS) * 100);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 400);
    } else {
      generatePdf();
    }
  };

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, templateId }),
      })

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.pdfBase64) {
          console.log("PDF Base64 received, length:", data.pdfBase64.length);
          console.log("PDF Base64 prefix:", data.pdfBase64.substring(0, 50));

          try {
            // Sanitize and decode
            const cleanBase64 = data.pdfBase64.replace(/\s/g, "");
            const binaryString = window.atob(cleanBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
          } catch (atobError) {
            console.error("atob decoding failed:", atobError);
            console.log("First 100 chars of base64:", data.pdfBase64.substring(0, 100));
          }
        } else {
          console.error("Failed to generate PDF: Invalid response data");
        }
      } else {
        console.error("Failed to generate PDF: Server error");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, templateId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.imageBase64) {
          try {
            const cleanBase64 = data.imageBase64.replace(/\s/g, "");
            const binaryString = window.atob(cleanBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "image/png" });
            const url = window.URL.createObjectURL(blob);
            setImageUrl(url);
          } catch (error) {
            console.error("Image decoding failed:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleTemplateChange = (id: string) => {
    setIsDropdownOpen(false);
    router.push(`/form?template=${id}`);
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div
      className={`flex min-h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-[#0d1117] text-white" : "bg-white text-gray-900"}`}
    >
      {/* Sidebar - Hidden on small/medium screens */}
      <aside
        className={`hidden lg:flex w-80 border-r flex-col p-10 z-20 ${isDarkMode ? "bg-[#161b22] border-gray-800" : "bg-[#fafafa] border-gray-100"}`}
      >
        <div className="mb-16">
          <Link
            href="/"
            className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#1C2541]"}`}
          >
            imenapop
          </Link>
        </div>

        {/* Progress Circle */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={isDarkMode ? "#30363d" : "#f1f3f5"}
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={isDarkMode ? "#58a6ff" : "#3A506B"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset: offset,
                  transition:
                    "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <div
                className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                {percentage}{" "}
                <span
                  className={`text-xl font-medium ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  %
                </span>
              </div>
              <div
                className={`text-sm font-bold mt-1 uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-300"}`}
              >
                {currentStep}/{TOTAL_STEPS}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Dynamic */}
        <nav className="flex-1 flex flex-col gap-6">
          {steps.map((step, idx) => (
            <NavItem
              key={idx}
              active={currentStep === idx + 1}
              icon={step.icon}
              label={step.field.charAt(0).toUpperCase() + step.field.slice(1)}
              isDarkMode={isDarkMode}
            />
          ))}
        </nav>

        <div className="mt-auto pt-10 text-center">
          <div
            className={`rounded-2xl p-6 shadow-sm border mb-4 flex items-center justify-center ${isDarkMode ? "bg-[#0d1117] border-gray-800" : "bg-white border-gray-100"}`}
          >
            <Lock
              className={`w-5 h-5 ${isDarkMode ? "text-gray-600" : "text-gray-200"}`}
            />
          </div>
          <p
            className={`text-[10px] font-bold uppercase tracking-widest leading-loose ${isDarkMode ? "text-gray-500" : "text-gray-300"}`}
          >
            SECURE PDF GENERATION
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col relative ${isDarkMode ? "bg-[#0d1117]" : "bg-white"}`}
      >
        {/* Mobile Header & Progress (Visible only on small/medium screens) */}
        <div
          className={`lg:hidden px-6 py-6 border-b ${isDarkMode ? "bg-[#161b22] border-gray-800" : "bg-white border-gray-100"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#1C2541]"}`}
            >
              imenapop
            </Link>
            <div
              className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              Step {currentStep}/{TOTAL_STEPS}
            </div>
          </div>
          {/* Mobile Linear Progress */}
          <div
            className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-[#30363d]" : "bg-gray-100"}`}
          >
            <div
              className={`h-full transition-all duration-500 ease-out ${isDarkMode ? "bg-[#58a6ff]" : "bg-[#3A506B]"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <header className="hidden lg:flex items-center justify-between px-16 py-8 relative z-10">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
            >
              Selected Template:
            </span>
            <span
              className={`font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-[#1C2541]"}`}
            >
              {config.title}
            </span>
            <Info
              className={`w-4 h-4 ml-1 ${isDarkMode ? "text-gray-500" : "text-gray-300"}`}
            />
          </div>

          {/* Template Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-8 py-3 border shadow-sm rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isDarkMode
                ? "bg-[#161b22] border-gray-800 text-gray-300 hover:text-white"
                : "bg-white border-gray-100 text-gray-400 hover:text-gray-900"
                }`}
            >
              Change Template
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border overflow-hidden z-50 ${isDarkMode
                  ? "bg-[#161b22] border-gray-800"
                  : "bg-white border-gray-100"
                  }`}
              >
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center justify-between ${templateId === t.id
                      ? isDarkMode
                        ? "bg-[#1f242d] text-white"
                        : "bg-gray-50 text-[#1C2541]"
                      : isDarkMode
                        ? "text-gray-400 hover:bg-[#1f242d] hover:text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#1C2541]"
                      }`}
                  >
                    {t.title}
                    {templateId === t.id && (
                      <div
                        className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-[#58a6ff]" : "bg-[#3A506B]"}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            {/* Backdrop to close dropdown */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16">
          <div
            className={`max-w-xl w-full text-center mb-10 lg:mb-16 transition-all duration-500 ${isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block ${isDarkMode ? "text-gray-500" : "text-gray-300"}`}
            >
              {currentStepData.category} — Step {currentStep}
            </span>
            <h1
              className={`text-3xl lg:text-5xl font-bold tracking-tight leading-tight mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
            >
              {currentStepData.question}
            </h1>
            <p
              className={`font-medium text-sm lg:text-base ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
            >
              {currentStepData.instruction}
            </p>
          </div>

          <div
            className={`max-w-2xl w-full mb-10 lg:mb-16 transition-all duration-500 delay-75 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            {(currentStepData.type === "text" ||
              currentStepData.type === "number") && (
                <input
                  type={currentStepData.type}
                  name={currentStepData.field}
                  value={formData[currentStepData.field] || ""}
                  onChange={handleInputChange}
                  placeholder={currentStepData.placeholder}
                  className={`w-full bg-transparent border-b-2 py-4 lg:py-6 text-2xl lg:text-3xl font-medium outline-none transition-colors ${isDarkMode
                    ? "border-gray-800 placeholder:text-gray-700 focus:border-[#58a6ff] text-white"
                    : "border-gray-100 placeholder:text-gray-200 focus:border-[#1C2541] text-gray-900"
                    }`}
                  autoFocus
                />
              )}
            {currentStepData.type === "textarea" && (
              <textarea
                name={currentStepData.field}
                value={formData[currentStepData.field] || ""}
                onChange={handleInputChange}
                placeholder={currentStepData.placeholder}
                rows={3}
                className={`w-full bg-transparent border-b-2 py-4 lg:py-6 text-xl lg:text-2xl font-medium outline-none resize-none transition-colors ${isDarkMode
                  ? "border-gray-800 placeholder:text-gray-700 focus:border-[#58a6ff] text-white"
                  : "border-gray-100 placeholder:text-gray-200 focus:border-[#1C2541] text-gray-900"
                  }`}
                autoFocus
              />
            )}
            {currentStepData.type === "file" && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-video border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden ${isDarkMode
                  ? "border-gray-800 hover:border-[#58a6ff] hover:bg-[#161b22]"
                  : "border-gray-200 hover:border-[#1C2541] hover:bg-blue-50/30"
                  }`}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isDarkMode ? "bg-[#161b22]" : "bg-gray-50"
                        }`}
                    >
                      <ImageIcon
                        className={`w-8 h-8 transition-colors ${isDarkMode
                          ? "text-gray-600 group-hover:text-[#58a6ff]"
                          : "text-gray-300 group-hover:text-[#3A506B]"
                          }`}
                      />
                    </div>
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                      Click to upload photo
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="w-full max-w-2xl flex justify-center flex-col items-center gap-8">
            {pdfUrl || imageUrl ? (
              <div className="flex flex-col items-center gap-6 animate-fade-in text-center w-full max-w-lg">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 ${isDarkMode
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-50 text-green-500"
                    }`}
                >
                  <Download className="w-10 h-10" />
                </div>
                <h2
                  className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                >
                  Your Invitation is ready!
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  {pdfUrl ? (
                    <a
                      href={pdfUrl}
                      download={`${templateId}-invitation.pdf`}
                      className={`flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-xl text-white font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all ${isDarkMode
                        ? "bg-[#58a6ff] hover:bg-[#4a8ecc]"
                        : "bg-[#1C2541]"
                        }`}
                    >
                      Download PDF
                    </a>
                  ) : (
                    <button
                      onClick={generatePdf}
                      disabled={isGenerating}
                      className={`flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-xl text-white font-bold uppercase tracking-widest transition-all ${isGenerating
                        ? "bg-gray-200 cursor-not-allowed"
                        : isDarkMode
                          ? "bg-[#58a6ff] hover:bg-[#4a8ecc] hover:shadow-xl hover:scale-105"
                          : "bg-[#1C2541] hover:shadow-xl hover:scale-105"
                        }`}
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                      {isGenerating ? "Generating..." : "Get PDF"}
                    </button>
                  )}

                  {imageUrl ? (
                    <a
                      href={imageUrl}
                      download={`${templateId}-invitation.png`}
                      className={`flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-xl text-white font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all ${isDarkMode
                        ? "bg-[#238636] hover:bg-[#2ea043]"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      Download Image
                    </a>
                  ) : (
                    <button
                      onClick={generateImage}
                      disabled={isGeneratingImage}
                      className={`flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-xl text-white font-bold uppercase tracking-widest transition-all ${isGeneratingImage
                        ? "bg-gray-200 cursor-not-allowed"
                        : isDarkMode
                          ? "bg-[#238636] hover:bg-[#2ea043] hover:shadow-xl hover:scale-105"
                          : "bg-green-600 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                        }`}
                    >
                      {isGeneratingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                      {isGeneratingImage ? "Generating..." : "Get Image"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={handleNext}
                disabled={isGenerating || isGeneratingImage || !formData[currentStepData.field]}
                className={`flex items-center gap-4 px-12 py-5 rounded-xl text-white font-bold uppercase tracking-widest transition-all ${isGenerating || isGeneratingImage
                  ? "bg-gray-200 cursor-not-allowed"
                  : isDarkMode
                    ? "bg-[#238636] hover:bg-[#2ea043] hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-[#1C2541] hover:shadow-xl hover:scale-105 active:scale-95"
                  }`}
              >
                {isGenerating || isGeneratingImage ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === TOTAL_STEPS ? "Create Invitation" : "Next"}
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
  active,
  icon,
  label,
  isDarkMode,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-500 ${active ? "opacity-100 translate-x-2" : "opacity-40"}`}
    >
      <div
        className={`w-10 h-10 rounded-xl shadow-sm border flex items-center justify-center ${active
          ? isDarkMode
            ? "text-[#58a6ff] border-[#1f242d] bg-[#161b22]"
            : "text-[#3A506B] border-blue-100 bg-white"
          : isDarkMode
            ? "text-gray-600 border-gray-800 bg-[#161b22]"
            : "text-gray-400 border-gray-100 bg-white"
          }`}
      >
        {icon}
      </div>
      <span
        className={`font-bold tracking-wide ${active
          ? isDarkMode
            ? "text-[#58a6ff]"
            : "text-[#3A506B]"
          : isDarkMode
            ? "text-gray-600"
            : "text-gray-400"
          }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormContent />
    </Suspense>
  );
}
