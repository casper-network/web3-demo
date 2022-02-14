const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser")
const { config } = require("dotenv");

config({ path: "../frontend/.env" });

const NODE_URL = process.env.REACT_APP_NODE_URL;

const casperSDK = require("casper-js-sdk");
const { DeployUtil } = casperSDK;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))

app.post("/put-deploy", async (req, res) => {
  // read query parameters
  //
  console.log(req.body);
  const deploy = DeployUtil.deployFromJson(req.body).unwrap();
  const hash = await deploy.send(NODE_URL);

  console.log(hash);

  res.json({ hash });

  // make request to IEX API and forward response
  // request(url).pipe(res);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
