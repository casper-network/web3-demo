import React, { useState, useEffect } from "react";
import { Signer, DeployUtil } from "casper-js-sdk";

import { SignProviders } from "./constants";
import CEP47View from "./views/cep47";
import ReadyDeployView from "./views/ready-deploy-view";
import TorusController from "./torus";

import { NODE_URL } from "./constants";
import type { ActiveKeyType, SignProviderViewParametersType } from "./types.d";

type SelectSignFnType = (provider: SignProviders) => void;
type SetActiveKeyFnType = (key: ActiveKeyType) => void;

const SignerController = ({
  activeKey,
  setActiveKey,
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

const SignSelect = ({
  signProvider,
  selectSign,
  activeKey,
  setActiveKey,
}: {
  signProvider: SignProviders;
  selectSign: SelectSignFnType;
  activeKey: ActiveKeyType;
  setActiveKey: SetActiveKeyFnType;
}) => {
  return (
    <div>
      <div>
        <button onClick={() => selectSign(SignProviders.Signer)}>Signer</button>
        <button onClick={() => selectSign(SignProviders.Torus)}>Torus</button>
      </div>
      {signProvider === SignProviders.Signer && (
        <SignerController activeKey={activeKey} setActiveKey={setActiveKey} />
      )}
      {signProvider === SignProviders.Torus && (
        <TorusController activeKey={activeKey} setActiveKey={setActiveKey} />
      )}
    </div>
  );
};

const App = () => {
  const [signProvider, setSignProvider] = useState<SignProviders>(
    SignProviders.Signer
  );

  const selectSign: SelectSignFnType = (signProvider) => {
    setActiveKey("");
    setDeploy(null);
    setSignProvider(signProvider);
  }

  const [activeKey, setActiveKey] = useState<ActiveKeyType>("");
  const [deploy, setDeploy] = useState<DeployUtil.Deploy | null>(null);

  const signAndSendDeploy = async (deploy: DeployUtil.Deploy) => {
    if (signProvider === SignProviders.Signer) {
      const deployJSON = DeployUtil.deployToJson(deploy);
      const signedDeployJSON = await Signer.sign(
        deployJSON,
        activeKey,
        activeKey
      );

      const response = await fetch("http://localhost:3001/put-deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signedDeployJSON),
      }).then((resp) => resp.json());

      const { hash } = response;
    }
    if (signProvider === SignProviders.Torus) {
      console.log("Torus");
    }
  };

  return (
    <div className="bg-dark-gray vh-100">
      <SignSelect
        signProvider={signProvider}
        selectSign={selectSign}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
      <div className="w-50 center bg-white pa3">
        {activeKey && !deploy && (
          <CEP47View activeKey={activeKey} setDeploy={setDeploy} />
        )}
        {activeKey && deploy && (
          <ReadyDeployView
            deploy={deploy!}
            activeKey={activeKey}
            signAndSendDeploy={signAndSendDeploy}
          />
        )}
      </div>
    </div>
  );
};

export default App;
