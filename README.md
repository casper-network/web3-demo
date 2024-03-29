# web3-demo

The purpose of this demo is to provide an example that shows integrating with wallets compatibile with the Casper Network - which is [Signer Chrome Extension](https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce?hl=en) and [Tor.us wallet](https://tor.us/).

### Running

1. Two env variables are required, so you can create `.env` file with them

```
NODE_URL=http://135.181.208.231:7777/rpc
NETWORK_NAME=casper-test
```

2. Run `make dev-build` in the root directory.
3. Run `make dev-start` in the root directory. This will start the project.
4. Open `localhost:8080` in the browser.

### Future improvements

- [ ] Currently tor.us wallet throws an error when trying to create a deploy containing `ModuleBytes` (eg. Install CEP47).
- [ ] Add more comments in the code for clarification.
- [ ] Add more deploy templates. 
- [ ] Improve the UI so it gives deploys preview.
- [ ] Add a simple backend to show usage of `EventStream`.

