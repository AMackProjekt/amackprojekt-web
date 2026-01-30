"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { GlowCard } from "./GlowCard";

export function Web3Connect() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    // Mock wallet connection (replace with actual Web3 provider like ethers.js or wagmi)
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      // Demo mode - simulate connection
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
      setAddress(mockAddress);
      setConnected(true);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    setConnected(false);
  };

  return (
    <GlowCard className="p-8 text-center">
      <div className="mb-6">
        <div className="text-4xl mb-4">🔐</div>
        <h3 className="text-2xl font-bold text-text mb-2">
          Web3 Login <span className="text-xs text-brand ml-2">BETA</span>
        </h3>
        <p className="text-muted text-sm">
          Connect your wallet for decentralized identity and exclusive Web3 features
        </p>
      </div>

      {!connected ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="primary"
            onClick={handleConnect}
            className="w-full max-w-xs mx-auto"
            aria-label="Connect your Web3 wallet"
          >
            Connect Wallet
          </Button>
          <p className="text-xs text-muted mt-4">
            Supports MetaMask, WalletConnect, Coinbase Wallet
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="glass rounded-lg p-4">
            <div className="text-xs text-muted mb-1">Connected Address</div>
            <code className="text-sm text-brand font-mono break-all">
              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted">Network</div>
              <div className="font-semibold text-text">Ethereum</div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-muted">Status</div>
              <div className="font-semibold text-green-400">Connected</div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted mb-3">
              🎉 You now have access to exclusive Web3 features
            </p>
            <div className="flex gap-3">
              <Button variant="primary" href="/portal/dashboard" className="flex-1">
                Access Platform
              </Button>
              <Button variant="ghost" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted">
          <strong>Why Web3?</strong> Decentralized identity means you own your data. 
          No passwords to remember, no centralized database to hack.
        </p>
      </div>
    </GlowCard>
  );
}
