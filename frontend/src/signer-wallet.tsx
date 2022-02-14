import React, { useState, useEffect } from "react";
import { Signer } from "casper-js-sdk";
import type { SignProviderViewParametersType } from "./types.d";

const SignerController = ({
  activeKey,
  setActiveKey,
  setClient
}: SignProviderViewParametersType) => {
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const connected = await Signer.isConnected();
        setConnected(connected);
      } catch (err) {
        console.log(err);
      }
    }, 100);
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const activeKey = await Signer.getActivePublicKey();
        setActiveKey(activeKey);
      } catch (err) {
        console.log(err);
      }
    };
    if (isConnected) {
      asyncFn();
    }

    window.addEventListener("signer:locked", (msg) => {
      setActiveKey("");
    });
    window.addEventListener("signer:unlocked", (msg: any) => {
      if (msg.detail.isConnected) {
        setActiveKey(msg.detail.activeKey);
      }
    });
    window.addEventListener("signer:activeKeyChanged", (msg: any) => {
      if (msg.detail.isConnected) {
        setActiveKey(msg.detail.activeKey);
      }
    });
    window.addEventListener("signer:connected", (msg: any) => {
      setActiveKey(msg.detail.activeKey);
    });
    window.addEventListener("signer:disconnected", (msg) => {
      setActiveKey("");
    });

    // TODO: Remove events listeners after.
  }, [isConnected]);

  if (activeKey) {
    return (
      <div>
        <p>Signer connected. Your public key is: {activeKey}</p>
      </div>
    );
  }

  return (
    <div>
      Signer not connected. Please{" "}
      <button onClick={Signer.sendConnectionRequest}>connect Signer</button>.
    </div>
  );
};

export default SignerController;
