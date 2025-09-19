"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Save,
  ArrowRight,
  Sparkles,
  Zap,
  Grid3x3,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function StartPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Since we're using RainbowKit now, we don't need manual wallet checking
    setIsLoading(false);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <div className="w-6 h-6 border-2 border-red-500/50 border-t-red-500 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-red-900/20"></div>
        <div className="absolute inset-0 bg-hexagon-pattern opacity-5"></div>
      </div>

      {/* Dynamic red elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-drift-slow"></div>
        <div
          className="absolute bottom-32 left-16 w-96 h-96 bg-red-600/15 rounded-full blur-2xl animate-drift-reverse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/2 w-48 h-48 bg-red-400/20 rounded-full blur-xl animate-pulse-gentle"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/3 w-16 h-16 border border-red-500/30 rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-red-500/20 transform rotate-12 animate-float-gentle"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0
                ? "w-2 h-2 bg-red-400/40"
                : i % 4 === 1
                ? "w-1.5 h-1.5 bg-red-500/50"
                : i % 4 === 2
                ? "w-1 h-1 bg-red-600/60"
                : "w-0.5 h-0.5 bg-white/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Modern header */}
      <header className="relative z-10 m-8">
        <div className="backdrop-blur-xl bg-black/30 border border-red-500/30 rounded-3xl shadow-2xl">
          <div className="px-8 py-6 flex items-center justify-between">
            {/* Brand section */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-red-500/40 transition-all duration-300">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-red-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent">
                  Somnia Links
                </h1>
                <p className="text-red-400/80 text-sm font-medium">
                  Payment Dashboard
                </p>
              </div>
            </div>

            {/* Wallet connection */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-300 text-sm font-medium">
                  Connected
                </span>
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex min-h-screen flex-col items-center px-8 pb-16">
        {/* Hero section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Grid3x3 className="w-5 h-5 text-red-400" />
            <span className="text-red-200 font-semibold">
              Choose Your Action
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Payment
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage your payments with ease using our advanced AI-powered
            platform
          </p>
        </div>

        {/* Action cards with modern design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Generate Somnia Links Card */}
          <div
            onClick={() => handleNavigation("/save")}
            className="group relative cursor-pointer"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* Main card */}
            <div
              className="relative backdrop-blur-xl bg-gradient-to-br from-black/50 to-red-900/20 border border-red-500/30 rounded-3xl p-10 
                           hover:border-red-500/50 transition-all duration-500 shadow-2xl
                           transform group-hover:scale-105 group-hover:-translate-y-2 h-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-red-500/40 transition-all duration-300">
                    <Save className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-red-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-100 transition-colors">
                  Generate Somnia Links
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Create custom payment links with just a prompt using our
                  AI-powered generation system
                </p>

                {/* Features list */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-red-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Share payment links with anyone
                    </span>
                  </div>
                  <div className="flex items-center text-red-300">
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-sm font-medium">
                      AI-powered customization
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
            </div>
          </div>

          {/* Explore Somnia Links Card */}
          <div
            onClick={() => handleNavigation("/pay")}
            className="group relative cursor-pointer"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* Main card */}
            <div
              className="relative backdrop-blur-xl bg-gradient-to-br from-black/50 to-red-900/20 border border-red-500/30 rounded-3xl p-10 
                           hover:border-red-500/50 transition-all duration-500 shadow-2xl
                           transform group-hover:scale-105 group-hover:-translate-y-2 h-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-red-600/40 transition-all duration-300">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-red-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                    <Grid3x3 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-100 transition-colors">
                  Explore Somnia Links
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Discover and interact with payment links created by other
                  users in our community
                </p>

                {/* Features list */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-red-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium">
                      One-Click Payments
                    </span>
                  </div>
                  <div className="flex items-center text-red-300">
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full mr-3 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-sm font-medium">
                      Browse community links
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Bottom stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="text-center p-6 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">Instant</div>
            <div className="text-red-300 text-sm">Link Generation</div>
          </div>
          <div className="text-center p-6 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">Secure</div>
            <div className="text-red-300 text-sm">Transactions</div>
          </div>
          <div className="text-center p-6 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">AI-Powered</div>
            <div className="text-red-300 text-sm">Customization</div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .bg-hexagon-pattern {
          background-image: radial-gradient(
            circle at 50% 50%,
            rgba(239, 68, 68, 0.1) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes drift-slow {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes drift-reverse {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(-25px, 25px) scale(1.05);
          }
          66% {
            transform: translate(25px, -25px) scale(0.95);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-8px) rotate(15deg);
          }
        }

        .animate-drift-slow {
          animation: drift-slow 15s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 18s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
