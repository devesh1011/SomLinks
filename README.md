# Somnia Links

AI-powered payment link generation platform built on the Somnia Network. Create intelligent payment links with beautiful custom interfaces powered by artificial intelligence.

## Features

### Core Functionality

- **AI-Powered Link Generation**: Create payment links using natural language prompts powered by AI
- **Custom Payment Interfaces**: Generate beautiful, modern payment pages with AI-generated designs
- **One-Click Payments**: Execute transactions seamlessly with connected wallets
- **Payment Management**: Create, manage, and track multiple payment links

### Wallet Integration

- **RainbowKit Support**: Modern wallet connection with multiple wallet support
- **Wagmi Integration**: Full EVM compatibility with React hooks
- **Somnia Network**: Native support for Somnia testnet

## Architecture

### Frontend (Next.js 14)

- **React 18** with TypeScript
- **Tailwind CSS** for modern, responsive styling
- **App Router** with client-side routing
- **RainbowKit** for wallet connections
- **Wagmi** for blockchain interactions

### Backend Services

- **API Routes** for payment link management and payments
- **Supabase** for data persistence and real-time updates
- **AI Integration** for intelligent content generation

### Blockchain Integration

- **Somnia Network** for fast, low-cost transactions
- **EVM Compatibility** for seamless wallet integration
- **Native STT Transfers** with secure transaction handling

## Somnia Network Integration

### Network Configuration

- **Testnet**: Chain ID 50312 (Somnia Testnet)
- **RPC URL**: https://vsf-rpc.somnia.network/
- **Currency**: STT (18 decimals)

### Transaction Features

- **Native SEI Transfers**: Direct cryptocurrency transfers
- **EVM Compatibility**: Full Ethereum Virtual Machine support
- **Fast Confirmations**: Sub-second transaction finality
- **Low Fees**: Cost-effective transaction processing

## Setup Instructions

### Prerequisites

- **Node.js 18+**
- **npm or yarn**
- **Supabase account**
- **WalletConnect Project ID** (for wallet connections)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/Somnia Links
cd Somnia Links
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file with the following variables:

```env
# WalletConnect Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Database Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: AI Integration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Production Build

```bash
npm run build
npm start
```

## Somnia Network Configuration

The application is configured to work with Somnia testnet:

### Testnet

- **Chain ID**: 50312
- **Network**: Somnia Testnet
- **RPC URL**: https://vsf-rpc.somnia.network/
- **Explorer**: https://shannon-explorer.somnia.network

> Note: Mainnet details to be added when available.

## Wallet Integration

### Supported Wallets

- **MetaMask**: Most popular Ethereum wallet
- **WalletConnect**: Multi-wallet support
- **Rainbow**: Modern wallet experience
- **Any EVM-compatible wallet**

### Connection Features

- **Automatic Network Detection**: Seamless Somnia network switching
- **Secure Transactions**: Client-side transaction signing
- **Real-time Updates**: Live wallet state management
- **Transaction History**: Complete payment tracking

## How It Works

### 1. Create Payment Links

- **Describe your payment** using natural language
- **AI generates** custom payment interface
- **Customize details** like title, amount, and description
- **Save and share** your payment link

### 2. Execute Payments

- **Recipients visit** the payment link
- **Connect their wallet** using RainbowKit
- **Review payment details** and confirm
- **Execute transaction** on Somnia Network

### 3. Track & Manage

- **View payment history** for all your links
- **Monitor transaction status** in real-time
- **Access Somnia explorer** for detailed transaction info
