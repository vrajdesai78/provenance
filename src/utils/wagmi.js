import { createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const firechain = {
  id: 997,
  name: "5ire",
  network: "5ireChain",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: { http: ["https://chain-node.5ire.network"] }
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [firechain, polygonMumbai],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider
});
