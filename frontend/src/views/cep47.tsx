import { useState, useEffect } from "react";
import { DeployUtil, CLPublicKey, Signer } from "casper-js-sdk";

import { cep47Client } from "../client";
import type { ActiveKeyType, SetDeployFnType } from "../types.d";
import { TextInput } from "../common";

const INSTALL_PAYMENT_AMOUNT = "115000000000";

const InstallView = ({
  setDeploy,
  activeKey,
}: {
  setDeploy: SetDeployFnType;
  activeKey: ActiveKeyType;
}) => {
  const [wasmFile, setWasmFile] = useState<Uint8Array | null>(null);
  const [contractName, setContractName] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenMeta] = useState(new Map([["chainName", "casper"]]));

  const onFileChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const reader = new FileReader();

    reader.onload = (val) => {
      if (reader.result) {
        setWasmFile(new Uint8Array(reader.result as ArrayBuffer));
      }
    };

    reader.readAsArrayBuffer(input.files[0]);
  };

  const createDeploy = () => {
    if (
      !wasmFile ||
      !contractName ||
      !tokenName ||
      !tokenSymbol ||
      !tokenMeta
    ) {
      throw new Error("Missing deploy params");
    }

    const deploy = cep47Client.install(
      wasmFile,
      {
        name: tokenName,
        contractName,
        symbol: tokenSymbol,
        meta: tokenMeta,
      },
      INSTALL_PAYMENT_AMOUNT,
      CLPublicKey.fromHex(activeKey)
    );

    setDeploy(deploy);
  };

  return (
    <div> 
      <h1>Install CEP47</h1>
      <div>
        {wasmFile ? (
          "WASM Uploaded"
        ) : (
          <input type="file" onChange={onFileChange} />
        )}
        <br />
        <TextInput
          value={contractName}
          placeholder="Contarct Name"
          onChange={setContractName}
        />
        <TextInput
          value={tokenName}
          placeholder="Token Name"
          onChange={setTokenName}
        />
        <TextInput
          value={tokenSymbol}
          placeholder="Token Symbol"
          onChange={setTokenSymbol}
        />
        <button onClick={createDeploy}>Create Deploy</button>
      </div>
    </div>
  );
};


const CEP47View = ({
  activeKey,
  setDeploy
}: {
  activeKey: ActiveKeyType;
  setDeploy: SetDeployFnType;
}) => {
  return (
    <div>
      <InstallView setDeploy={setDeploy} activeKey={activeKey} />
    </div>
  );
};

export default CEP47View;
