import React, { useState, useEffect } from "react";
import Torus from "@toruslabs/casper-embed";

import type { ActiveKeyType, SignProviderViewParametersType } from "./types.d";

// const CHAINS = {
//   CASPER_MAINNET: "casper",
//   CASPER_TESTNET: "casper-test",
// };

// const SUPPORTED_NETWORKS = {
//   [CHAINS.CASPER_MAINNET]: {
//     blockExplorerUrl: "https://cspr.live",
//     chainId: "0x1",
//     displayName: "Casper Mainnet",
//     logo: "https://cspr.live/assets/icons/logos/cspr-live-full.svg",
//     rpcTarget: "https://casper-node.tor.us",
//     ticker: "CSPR",
//     tickerName: "Casper Token",
//     networkKey: CHAINS.CASPER_MAINNET,
//   },
//   [CHAINS.CASPER_TESTNET]: {
//     blockExplorerUrl: "https://testnet.cspr.live",
//     chainId: "0x2",
//     displayName: "Casper Testnet",
//     logo: "https://testnet.cspr.live/assets/icons/logos/cspr-live-full.svg",
//     rpcTarget: "https://testnet.casper-node.tor.us",
//     ticker: "CSPR",
//     tickerName: "Casper Token",
//     networkKey: CHAINS.CASPER_TESTNET,
//   },
// };

const TorusController = ({
  activeKey,
  setActiveKey,
}: SignProviderViewParametersType) => {
  const [torusInstance, setTorusInstance] = useState<Torus | null>(null);

  useEffect(() => {
    const asyncFn = async () => {
      const torus = new Torus();
      // await torus.init({
      //   buildEnv: "testing",
      //   showTorusButton: true,
      //   network: SUPPORTED_NETWORKS[CHAINS.CASPER_TESTNET],
      // });
    };
    asyncFn();
  });

  return <h1>Torus</h1>;
};

export default TorusController;
// export const x = () => {};
