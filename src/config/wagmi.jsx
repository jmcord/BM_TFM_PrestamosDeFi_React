import { createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],


    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    // Required App Info
    appName: "Your App Name",

 
  }),
);
