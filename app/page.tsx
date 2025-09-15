"use client";

import { useRouter } from "next/navigation";
import { Link, Save, Wallet, Zap, Shield, Sparkles } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/start");
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950/20 via-black to-fuchsia-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Animated Red Orbs - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-16 right-8 sm:bottom-32 sm:right-32 w-32 h-32 sm:w-64 sm:h-64 bg-purple-600/30 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 sm:left-1/3 w-16 h-16 sm:w-32 sm:h-32 bg-pink-400/40 rounded-full blur-xl animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation Header - Fully responsive */}
      <nav className="relative z-50 mx-2 sm:mx-4 lg:mx-8 mt-2 sm:mt-4 lg:mt-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-xl">
        <div className="px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Link className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-lg sm:rounded-xl blur opacity-50"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-pink-200 to-pink-300 bg-clip-text text-transparent">
                Somnia Links
              </h1>
              <p className="text-xs sm:text-xs text-pink-300 hidden sm:block">
                Powered by Somnia Network
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="scale-75 sm:scale-90 lg:scale-100">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero Section - Fully responsive */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Content */}
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full mb-4 sm:mb-6 lg:mb-8 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-400" />
              <span className="text-xs sm:text-sm lg:text-base text-pink-200 font-medium">
                Revolutionary Payment Links
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
              <span className="block text-fuchsia-600 font-pixelated">
                Somnia Links
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 lg:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Create, share, and execute payment links with ease using
              AI-powered technology on the Somnia Network.
            </p>

            {/* Stats Row - Responsive layout */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 px-4">
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                  0.001s
                </div>
                <div className="text-pink-300 text-xs sm:text-sm uppercase tracking-wide">
                  Transaction Speed
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 lg:h-16 bg-fuchsia-500/30 self-center"></div>
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                  $0.0001
                </div>
                <div className="text-pink-300 text-xs sm:text-sm uppercase tracking-wide">
                  Average Fee
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 lg:h-16 bg-fuchsia-500/30 self-center"></div>
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                  100%
                </div>
                <div className="text-pink-300 text-xs sm:text-sm uppercase tracking-wide">
                  Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid - Fully responsive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16 lg:mb-20 px-2 sm:px-0">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-black/50 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Save className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                  Generate Somnia Links
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5 lg:mb-6">
                  Create intelligent payment links powered by AI on the Somnia
                  network with customizable parameters and instant deployment.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Secure
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Customizable
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Instant
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-black/50 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                  Execute Somnia Links
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5 lg:mb-6">
                  Load payment details instantly and execute transactions
                  seamlessly with your connected wallet in one click.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    One-Click
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Fast
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Reliable
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-black/50 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-700 to-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                  AI Customization
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5 lg:mb-6">
                  Tailor your payment links with AI-generated designs and
                  prompts for personalized user experiences.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    AI-Powered
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Custom UI
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Smart
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Responsive */}
          <div className="text-center px-2 sm:px-4">
            <div className="relative max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/20 to-red-500/10 rounded-2xl sm:rounded-3xl blur-2xl"></div>
              <div className="relative bg-black/40 border border-red-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-400" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
                    Ready to revolutionize payments?
                  </h2>
                </div>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xs sm:max-w-xl lg:max-w-2xl mx-auto">
                  Connect your wallet to access all features and start creating
                  secure, AI-powered payment links instantly on the Somnia
                  Network.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-red-300 justify-center sm:justify-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    Generate Sei Actions
                  </div>
                  <div className="flex items-center gap-2 text-red-300 justify-center sm:justify-start">
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    AI-Powered Creation
                  </div>
                  <div className="flex items-center gap-2 text-red-300 justify-center sm:justify-start">
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    Instant Execution
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Animation Section - Responsive */}
      <section className="relative z-10 py-10 sm:py-15 lg:py-20">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
            Experience the Magic of{" "}
            <span className="text-red-400">AI + Payments</span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12">
            Watch as AI transforms your payment needs into instant Sei Actions
          </p>

          {/* Horizontal Animation - Responsive */}
          <div className="relative h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-black via-red-900/20 to-black rounded-xl sm:rounded-2xl border border-red-500/20 overflow-hidden">
            {/* Moving Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8 animate-slide-sequence scale-75 sm:scale-90 lg:scale-100">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm lg:text-base">
                    AI
                  </div>
                  <div className="text-red-300 text-sm sm:text-base lg:text-lg">
                    +
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm sm:text-lg lg:text-xl font-bold">
                    $
                  </div>
                  <div className="text-red-300 text-sm sm:text-base lg:text-lg">
                    =
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-red-500/20 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full border border-red-500/40">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                    <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">
                      SomniaLink Magic!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(239, 68, 68, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
          background-size: 25px 25px;
        }

        @media (min-width: 640px) {
          .bg-grid-pattern {
            background-size: 35px 35px;
          }
        }

        @media (min-width: 1024px) {
          .bg-grid-pattern {
            background-size: 50px 50px;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slide-sequence {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          20% {
            transform: translateX(0);
            opacity: 1;
          }
          80% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-sequence {
          animation: slide-sequence 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
