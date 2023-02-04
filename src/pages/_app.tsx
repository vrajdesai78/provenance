import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ConnectKitProvider } from "connectkit";

function MyApp({ Component, pageProps }: AppProps) {
  const fireChain = {
    id: 31415,
    name: "Filecoin — Wallaby testnet",
    network: "wallaby",
    nativeCurrency: {
      decimals: 18,
      name: "Testnet Filecoin",
      symbol: "tFil",
    },
    rpcUrls: {
      default: "https://wallaby.node.glif.io/rpc/v0"
        },
    blockExplorers: {
      default: { name: "explorer", url: "https://explorer.glif.io/wallaby" },
    },
    testnet: true,
  };

  const { chains, provider, webSocketProvider } = configureChains(
    [fireChain],
    [
      jsonRpcProvider({
        rpc: (chain:any) => {
          if (chain.id !== fireChain.id) return null;
          return { http: chain.rpcUrls.default };
        },
      }),
    ]
  );

  let client;
  if (typeof window !== "undefined") {
    client = createClient({
      autoConnect: true,
      provider,
      webSocketProvider,
    });
  }

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="retro">
        <ThemeProvider attribute="class">
          <Header />
          <div className="min-h-[calc(100vh-68px)] pt-16 px-2 sm:px-4">
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </div>
          <Footer />
        </ThemeProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
