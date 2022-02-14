export type ActiveKeyType = string; 
export type SetDeployFnType = (passedDeploy: DeployUtil.Deploy) => void;
export type SignProviderViewParametersType = {
  activeKey: ActiveKeyType;
  setActiveKey: SetActiveKeyFnType;
};

