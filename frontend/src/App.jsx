import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDefaultConfig, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Home from "./components/pages/home";
import Staking from "./components/pages/staking";
import CurrencyConverter from "./components/pages/CurrencyConverter";

function App() {
  const config = getDefaultConfig({
    appName: "RainbowKit demo",
    projectId: "YOUR_PROJECT_ID",
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  });

  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={midnightTheme()}>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="staking" element={<Staking />} />
                  <Route path="currency-converter" element={<CurrencyConverter />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <ToastContainer />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
