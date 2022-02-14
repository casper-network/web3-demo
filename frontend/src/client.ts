import { CEP47Client } from "casper-cep47-js-client";

import { NODE_URL, NETWORK_NAME } from "./constants";

export const cep47Client = new CEP47Client(NODE_URL!, NETWORK_NAME!);
