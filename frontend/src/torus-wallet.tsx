import React, { useState, useEffect } from "react";
import Torus from "@toruslabs/casper-embed";
import { NETWORK_NAME } from "./constants";

import type { ActiveKeyType, SignProviderViewParametersType } from "./types.d";

const SUPPORTED_NETWORKS = {
  "cspr": {
    displayName: "Casper Testnet",
    rpcTarget: "https://testnet.casper-node.tor.us",
    // rpcTarget: "/node-rpc/",
    tickerName: "Casper Token",
    networkKey: NETWORK_NAME!,
    blockExplorerUrl: "https://testnet.cspr.live",
    chainId: "0x2",
    ticker: "CSPR",
    logo: "https://testnet.cspr.live/assets/icons/logos/cspr-live-full.svg",
  },
};

const TorusController = ({
  activeKey,
  setActiveKey,
  setClient
}: SignProviderViewParametersType) => {
  const [torusInstance, setTorusInstance] = useState<Torus | null>(null);

  useEffect(() => {
    const asyncFn = async () => {
      const torus = new Torus();
      await torus.init({
        buildEnv: "testing",
        showTorusButton: true,
        network: SUPPORTED_NETWORKS["cspr"],
      });

      setTorusInstance(torus);
      const pk = await torus?.login();
      if (pk.length) {
        setActiveKey(pk[0]);
        setClient(torus.provider);
      }
    };

    if (!activeKey) {
      asyncFn();
    }

    return function cleanup() {
      if (activeKey) {
        setActiveKey("");
        torusInstance?.cleanUp();
      }
    };

    // return clean;
  }, [activeKey]);

  if (activeKey) {
    return (
      <div>
        <p>Torus connected. Your public key is: {activeKey}</p>
      </div>
    );
  }

  return (
    <div>
      <p>Torus not connected.</p>
    </div>
  );
};

export default TorusController;
