import { createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider
});
