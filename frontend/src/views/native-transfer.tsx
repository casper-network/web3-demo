import { useState, useEffect } from "react";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";

import { TextInput } from "../common";
import { NETWORK_NAME } from "../constants";
import type { ActiveKeyType, SetDeployFnType } from "../types.d";

const randomNumericId = () => Math.floor(Math.random() * 1000000000);
const DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER = 100000;

const NativeTransfer = ({
  setDeploy,
  activeKey,
}: {
  setDeploy: SetDeployFnType;
  activeKey: ActiveKeyType;
}) => {
  const [amount, setAmount] = useState("2500000000");
  const [recepient, setRecepient] = useState<string>("");

  const createDeploy = () => {
    const receiverClPubKey = CLPublicKey.fromHex(
      "02036d0a481019747b6a761651fa907cc62c0d0ebd53f4152e9f965945811aed2ba8"
    );
    const senderKey = CLPublicKey.fromHex(activeKey);
    const deploy = DeployUtil.makeDeploy(
      new DeployUtil.DeployParams(senderKey, NETWORK_NAME!, 1, 1800000),
      DeployUtil.ExecutableDeployItem.newTransfer(
        amount,
        receiverClPubKey,
        null,
        randomNumericId()
      ),
      DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
    );

    setDeploy(deploy);
  };

  return (
    <div>
      <h1>Native Transfer</h1>
        <TextInput
          value={amount} 
          placeholder="Amount"
          onChange={setAmount}
        />
        <TextInput
          value={recepient}
          placeholder="Recepient PublicKey"
          onChange={setRecepient}
        />
        <button onClick={createDeploy}>Create Deploy</button>
    </div>
  );
};

export default NativeTransfer;
