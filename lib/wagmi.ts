import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, seiDevnet } from "wagmi/chains";

// Somnia testnet configuration
export const somniaTestnet = {
  id: 50312,
  name: "Somnia Testnet",
  network: "somnia-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Somnia Test Token",
    symbol: "STT",
  },
  rpcUrls: {
    default: { http: ["https://dream-rpc.somnia.network"] },
    public: { http: ["https://dream-rpc.somnia.network"] },
  },
  blockExplorers: {
    default: {
      name: "Somnia Testnet Explorer",
      url: "https://shannon-explorer.somnia.network",
    },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: "Somnia Links",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [somniaTestnet],
  ssr: true,
});
