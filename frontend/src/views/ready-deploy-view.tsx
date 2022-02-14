import { useState, useEffect } from "react";
import { DeployUtil, CLPublicKey, Signer } from "casper-js-sdk";

import type { ActiveKeyType } from "../types.d";

const ReadyDeployView = ({
  deploy,
  activeKey,
  signAndSendDeploy,
}: {
  deploy: DeployUtil.Deploy;
  activeKey: ActiveKeyType;
  signAndSendDeploy: (deploy: DeployUtil.Deploy) => void;
}) => {

  return (
    <div>
      Deploy ready to be signed and send.
      <button onClick={() => signAndSendDeploy(deploy)}>Sign and send</button>
      {/*
        <pre>
          {JSON.stringify(deployJSON, null, 2)}
        </pre>
      */}
    </div>
  );
};

export default ReadyDeployView;
