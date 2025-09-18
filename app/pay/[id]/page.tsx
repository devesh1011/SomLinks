"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function PayDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [componentHtml, setComponentHtml] = useState<string | undefined>(
    undefined
  );
  const [totals, setTotals] = useState<{
    totalPaid: number;
    paymentsCount: number;
  }>({ totalPaid: 0, paymentsCount: 0 });

  // Use wagmi hook for wallet connection
  const { address: connectedAccount, isConnected } = useAccount();

  // Use wagmi hooks for transaction - using useSendTransaction for native STT transfer
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/links/${id}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Payment link not found");
        const link = data.link;

        console.log("📊 Loaded payment link data:");
        console.log("- ID:", id);
        console.log("- Title:", link.title);
        console.log("- To Account:", link.to_account);
        console.log("- Amount (raw):", link.amount);
        console.log("- Amount (parsed):", Number(link.amount));
        console.log("- Memo:", link.memo);
        console.log("- Full link data:", link);

        setTo(link.to_account);
        setAmount(Number(link.amount));
        setMemo(link.memo || undefined);
        setTitle(link.title);
        setComponentHtml(link.component_code || undefined);
        setTotals({
          totalPaid: Number(link.total_paid || 0),
          paymentsCount: Number(link.payments_count || 0),
        });
      } catch (e: any) {
        setError(e?.message || "Failed to load link");
      }
    })();
  }, [id]);

  const onConnect = (accountId: string) => {
    // This function is no longer needed as wallet connection is handled by wagmi
  };

  const onPay = async () => {
    setError(null);
    setLoading(true);
    try {
      console.log("💳 Starting payment process:");
      console.log("To:", to);
      console.log("Amount:", amount);
      console.log("Memo:", memo);
      console.log("Connected Account:", connectedAccount);
      console.log("Chain ID:", window.ethereum?.chainId);

      if (!isConnected) {
        setError("Please connect your wallet first.");
        setLoading(false);
        return;
      }

      if (!to || !amount || amount <= 0) {
        setError("Invalid payment details.");
        setLoading(false);
        return;
      }

      // Validate address format
      if (!to.startsWith("0x") || to.length !== 42) {
        setError("Invalid recipient address format.");
        setLoading(false);
        return;
      }

      console.log("🚀 Sending transaction...");

      // Send native STT transaction using sendTransaction
      sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(amount.toString()),
      });
    } catch (e: any) {
      console.error("Payment error:", e);
      setError(e?.message || "Payment failed");
      setLoading(false);
    }
  };

  // Handle transaction success
  useEffect(() => {
    if (isSuccess && hash) {
      console.log("✅ Transaction successful, recording payment...");
      setLoading(false);
      setError(null);

      // Record payment to backend
      fetch(`/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkId: id,
          amount,
          payerAccount: connectedAccount,
          memo: memo || null,
          status: "success",
          txId: hash, // FIXED: using correct field name
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("✅ Payment recorded successfully");
            // Refresh totals
            fetch(`/api/links/${id}`, { cache: "no-store" })
              .then((res) => res.json())
              .then((data) => {
                if (data.link) {
                  setTotals({
                    totalPaid: Number(data.link.total_paid || 0),
                    paymentsCount: Number(data.link.payments_count || 0),
                  });
                }
              });
          } else {
            console.error("❌ Failed to record payment");
          }
        })
        .catch((err) => {
          console.error("❌ Error recording payment:", err);
        });
    }
  }, [isSuccess, hash, id, amount, connectedAccount, memo]);

  // Handle transaction errors
  useEffect(() => {
    if (hash && !isPending && !isConfirming && !isSuccess) {
      console.log("❌ Transaction failed or was rejected");
      setLoading(false);
      setError("Transaction failed or was rejected by user");
    }
  }, [hash, isPending, isConfirming, isSuccess]);

  const sanitizeHtml = (html: string) =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/ on[a-z]+="[^"]*"/gi, "")
      .replace(/ on[a-z]+='[^']*'/gi, "");

  // Fallback simple design when no component is stored
  const fallback = `<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#0f0f23,#1a1a2e,#16213e);color:white;">
      <div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);padding:32px 36px;border-radius:24px;max-width:600px;width:94%;border:1px solid rgba(255,255,255,0.1);box-shadow:0 25px 50px rgba(0,0,0,0.3);">
        <div style="font-size:28px;font-weight:700;margin-bottom:12px;text-align:center;">💰 ${
          title || "Payment"
        }</div>
        <div style="opacity:0.9;font-size:18px;text-align:center;margin-bottom:8px;">💳 ${amount} STT → ${to}</div>
        <div style="margin-top:20px;text-align:center;opacity:0.7;font-size:12px;">🔒 Secure Payment with Somnia Network</div>
        <div style="margin-top:10px;text-align:center;opacity:0.6;font-size:11px;">ℹ️ Memo functionality not supported on Somnia EVM</div>
      </div>
    </div>`;

  return (
    <main className="relative min-h-screen">
      {/* Full-screen design from AI */}
      <div className="absolute inset-0 overflow-auto">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(componentHtml || fallback),
          }}
        />
      </div>

      {/* Amount Display Overlay - Positioned prominently on top of AI content */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="group relative">
          {/* Animated background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-orange-500/40 to-red-500/30 rounded-2xl blur-lg animate-pulse opacity-75"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/20 via-orange-400/30 to-red-400/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>

          {/* Main amount card */}
          <div className="relative bg-gradient-to-br from-black/80 via-gray-900/85 to-black/80 border-2 border-yellow-400/60 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
            {/* Amount header */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">💰</span>
              </div>
              <div className="text-yellow-400/90 text-sm font-semibold tracking-wider uppercase">
                Payment Amount
              </div>
            </div>

            {/* Large amount display */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tight">
                {amount}
                <span className="text-2xl md:text-3xl text-yellow-400 ml-2 font-bold">
                  STT
                </span>
              </div>

              {/* Recipient info */}
              <div className="text-gray-300 text-sm font-mono bg-black/30 px-3 py-1 rounded-lg border border-gray-600/30 mt-3">
                To: {to.slice(0, 6)}...{to.slice(-4)}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Floating controls */}
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-16 z-50 mt-10">
        <div className="rounded-2xl shadow-2xl border border-white/30 bg-black/20 backdrop-blur-xl px-6 py-4 flex items-center gap-4">
          <div className="hidden sm:block">
            <div className="text-sm text-white font-semibold drop-shadow-lg">
              {title || "Payment"}
            </div>
          </div>
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <div className="text-xs text-white/90 hidden sm:block font-medium drop-shadow">
              Payer: {connectedAccount}
            </div>
          )}
          <button
            onClick={onPay}
            disabled={isPending || isConfirming || !isConnected || loading}
            className="px-5 py-2.5 rounded-lg bg-green-500/50 hover:bg-green-500/70 border border-green-300/50 text-white text-sm font-semibold backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-green-500/50 shadow-lg"
          >
            {loading
              ? "Preparing..."
              : isPending
              ? "Confirming..."
              : isConfirming
              ? "Processing..."
              : "Pay"}
          </button>
        </div>
        {error && (
          <div className="mt-3 text-sm text-white font-medium bg-red-500/30 border border-red-300/50 backdrop-blur-xl rounded-lg px-4 py-2 shadow-lg drop-shadow">
            {error}
          </div>
        )}
        {isSuccess && hash && (
          <div className="mt-3 text-sm text-white font-medium bg-green-500/30 border border-green-300/50 backdrop-blur-xl rounded-lg px-4 py-2 shadow-lg drop-shadow">
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-emerald-500/40 to-green-600/30 rounded-2xl blur-lg animate-pulse-glow"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 via-emerald-400/30 to-green-500/20 rounded-3xl blur-xl opacity-60 animate-pulse-glow-outer"></div>

              {/* Main container */}
              <div className="relative bg-gradient-to-br from-green-900/40 to-emerald-900/30 border border-green-400/40 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                {/* Success header with animated checkmark */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                      <svg
                        className="w-6 h-6 text-white animate-check-draw"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-60 animate-ping"></div>

                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-sparkle-1"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-300 rounded-full animate-sparkle-2"></div>
                  </div>

                  <div className="flex-1">
                    <div className="text-xl font-bold text-green-100 flex items-center gap-2 mb-1">
                      <span className="animate-text-glow">
                        Payment Successful!
                      </span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-green-200/80 text-sm font-mono">
                      Transaction Hash:
                      <span className="ml-2 px-2 py-1 bg-green-500/20 rounded-md border border-green-400/30 text-green-300 font-semibold tracking-wider">
                        {hash.slice(0, 8)}...{hash.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explorer link with hover effects */}
                <a
                  href={`https://shannon-explorer.somnia.network/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/30 hover:border-green-400/50
                 rounded-xl transition-all duration-300 text-green-200 hover:text-white font-medium
                 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center
                        group-hover/link:rotate-12 transition-transform duration-300"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">View on Somnia Explorer</span>
                  </div>

                  {/* External link icon with animation */}
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 rounded-xl opacity-0 
                      group-hover/link:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
                  ></div>
                </a>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border border-green-400/20 rounded-full animate-spin-slow opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border border-emerald-400/20 rotate-45 animate-pulse opacity-40"></div>

                {/* Success wave animation */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent 
                      animate-wave -translate-x-full"
                  ></div>
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes pulse-glow {
                0%,
                100% {
                  opacity: 0.6;
                  transform: scale(1);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.02);
                }
              }

              @keyframes pulse-glow-outer {
                0%,
                100% {
                  opacity: 0.3;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.6;
                  transform: scale(1.05);
                }
              }

              @keyframes bounce-gentle {
                0%,
                100% {
                  transform: translateY(0) scale(1);
                }
                50% {
                  transform: translateY(-2px) scale(1.05);
                }
              }

              @keyframes check-draw {
                0% {
                  stroke-dasharray: 0 20;
                }
                100% {
                  stroke-dasharray: 20 0;
                }
              }

              @keyframes sparkle-1 {
                0%,
                100% {
                  opacity: 0;
                  transform: scale(0) rotate(0deg);
                }
                50% {
                  opacity: 1;
                  transform: scale(1) rotate(180deg);
                }
              }

              @keyframes sparkle-2 {
                0%,
                100% {
                  opacity: 0;
                  transform: scale(0) rotate(0deg);
                }
                30% {
                  opacity: 1;
                  transform: scale(1) rotate(120deg);
                }
                60% {
                  opacity: 0;
                  transform: scale(0) rotate(240deg);
                }
              }

              @keyframes text-glow {
                0%,
                100% {
                  text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
                }
                50% {
                  text-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
                }
              }

              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              @keyframes wave {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }

              .animate-pulse-glow {
                animation: pulse-glow 3s ease-in-out infinite;
              }

              .animate-pulse-glow-outer {
                animation: pulse-glow-outer 3s ease-in-out infinite 0.5s;
              }

              .animate-bounce-gentle {
                animation: bounce-gentle 2s ease-in-out infinite;
              }

              .animate-check-draw {
                animation: check-draw 0.8s ease-out;
              }

              .animate-sparkle-1 {
                animation: sparkle-1 2s ease-in-out infinite;
              }

              .animate-sparkle-2 {
                animation: sparkle-2 3s ease-in-out infinite 1s;
              }

              .animate-text-glow {
                animation: text-glow 2s ease-in-out infinite;
              }

              .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
              }

              .animate-wave {
                animation: wave 3s ease-in-out infinite 2s;
              }
            `}</style>
          </div>
        )}
      </div>
    </main>
  );
}
