"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Grid3x3,
  Zap,
} from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// DB type
type PaymentLink = {
  id: string;
  title: string;
  to_account: string;
  amount: number;
  memo: string | null;
  description: string | null;
};

export default function PayListPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);

  // Use wagmi hook for wallet connection
  const { address: connectedAccount, isConnected } = useAccount();

  useEffect(() => {
    refreshLinks();
  }, []);

  const refreshLinks = async () => {
    try {
      const res = await fetch("/api/links", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load links");
      setLinks(
        (data.links || []).map((l: any) => ({
          id: l.id,
          title: l.title,
          to_account: l.to_account,
          amount: Number(l.amount),
          memo: l.memo,
          description: l.description,
        }))
      );
    } catch {}
  };

  const onConnect = (accountId: string) => {
    // This function is no longer needed as wallet connection is handled by wagmi
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-950/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Animated Red Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-32 right-32 w-64 h-64 bg-red-600/30 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-red-400/40 rounded-full blur-xl animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        ></div>
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
        <div className="relative overflow-hidden">
          {/* Background gradient with animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-red/60 to-red-800/40 rounded-[2rem]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-600/20 rounded-[2rem] animate-pulse"></div>

          {/* Animated border glow */}

          {/* Main header content */}
          <div className="relative px-10 py-5 flex items-center justify-between">
            {/* Left side - Brand with new design */}
            <div className="flex items-center gap-6">
              {/* Animated logo container */}
              <div className="relative group">
                {/* Outer ring */}
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-all duration-500 animate-spin-slow"></div>

                {/* Main logo */}

                {/* Floating dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-300 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Brand text with new layout */}
              <div className="relative">
                {/* Main title with gradient text */}
                <Link href="/">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent mb-1">
                    Somnia Links
                  </h1>
                </Link>
                {/* Subtitle with animated underline */}
                <div className="flex items-center gap-3">
                  <p className="text-red-300/90 text-sm font-medium tracking-wide">
                    Choose Payment Link
                  </p>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-red-400 to-transparent rounded-full animate-pulse"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/50 via-red-400/30 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Right side - Wallet connection with new styling */}
            <div className="flex items-center gap-6">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <span className="text-red-200 text-sm font-medium">
                  Ready to Pay
                </span>
              </div>

              {/* Connect button */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-xl blur-md opacity-60"></div>
                <ConnectButton />
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 flex min-h-screen flex-col items-center px-8 pb-16">
        {/* Hero section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Grid3x3 className="w-5 h-5 text-red-400" />
            <span className="text-red-200 font-semibold">Available Links</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Discover
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-pixel">
              Somnia Links
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Browse and execute payment links created by our community
          </p>
        </div>

        {/* Create New Link Card */}
        <div className="w-full max-w-5xl mb-12">
          <div className="group relative cursor-pointer">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* Main card */}
            <Link href="/save">
              <div
                className="relative backdrop-blur-xl bg-gradient-to-br from-black/50 to-red-900/20 border border-red-500/30 rounded-3xl p-10 
                             hover:border-red-500/50 transition-all duration-500 shadow-2xl
                             transform group-hover:scale-105 group-hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-red-500/40 transition-all duration-300">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-red-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-100 transition-colors">
                    Create New Somnia Links
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Generate your own AI-powered payment link with just a
                    description
                  </p>

                  {/* Features list */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center text-red-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-sm font-medium">
                        AI-powered generation
                      </span>
                    </div>
                    <div className="flex items-center text-red-300">
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <span className="text-sm font-medium">
                        Customizable parameters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Payment Links Grid */}
        <div className="w-full max-w-6xl">
          {links.length === 0 ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

              <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/50 to-red-900/20 border border-red-500/30 rounded-3xl p-12 shadow-2xl text-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-400/30 to-red-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                      <Plus className="w-12 h-12 text-red-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 to-red-600/30 rounded-3xl blur opacity-50"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white text-2xl font-bold">
                      No payment links found
                    </div>
                    <div className="text-red-300 text-lg">
                      Create your first payment link to get started
                    </div>
                  </div>
                  <Link
                    href="/save"
                    className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white font-bold text-lg
                               hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300
                               shadow-2xl hover:shadow-red-500/30 flex items-center gap-3"
                  >
                    <Plus className="w-5 h-5" />
                    Go to Save page
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-50 -z-10 group-hover:opacity-75 transition-opacity"></div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {links.map((l) => (
                <div key={l.id} className="group relative cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                  {/* Main card */}
                  <Link href={`/pay/${l.id}`}>
                    <div
                      className="relative backdrop-blur-xl bg-gradient-to-br from-black/50 to-red-900/20 border border-red-500/30 rounded-3xl p-8 
                                   hover:border-red-500/50 transition-all duration-500 shadow-2xl
                                   transform group-hover:scale-105 group-hover:-translate-y-2 h-full"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-red-600/40 transition-all duration-300">
                            <CreditCard className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute inset-0 bg-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-100 transition-colors line-clamp-2">
                          {l.title}
                        </h3>

                        {/* Payment details */}
                        <div className="backdrop-blur-sm bg-white/5 border border-red-500/20 rounded-2xl p-4">
                          <div className="text-red-200 text-sm flex items-center gap-3">
                            <span className="font-bold text-xl text-white">
                              {l.amount} STT
                            </span>
                            <ArrowRight className="w-4 h-4 text-red-400" />
                            <span className="font-mono text-xs bg-black/20 px-3 py-1 rounded-lg">
                              {l.to_account}
                            </span>
                          </div>
                        </div>

                        {l.memo && (
                          <div className="text-red-300 text-sm">
                            <span className="text-red-400 font-medium">
                              Memo:
                            </span>{" "}
                            {l.memo}
                          </div>
                        )}

                        {l.description && (
                          <div className="text-red-200 text-sm leading-relaxed line-clamp-3">
                            {l.description}
                          </div>
                        )}

                        {/* Link ID */}
                        <div className="text-red-300 text-xs font-mono bg-black/20 px-3 py-2 rounded-lg">
                          /pay/{l.id}
                        </div>
                      </div>

                      {/* Bottom decoration */}
                      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(239, 68, 68, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
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

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
