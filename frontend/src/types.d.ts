export type ActiveKeyType = string; 
export type SetDeployFnType = (passedDeploy: DeployUtil.Deploy) => void;
export type SetClientFnType = (provider: any) => void;

export type SignProviderViewParametersType = {
  activeKey: ActiveKeyType;
  setActiveKey: SetActiveKeyFnType;
  setClient: SetClientFnType;
};

