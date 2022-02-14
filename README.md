# web3-demo

The purposes of this demo is to provide an example that shows integratin with wallets compatibile with Casper Network - which is [Signer Chrome Extension](https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce?hl=en) and [Tor.us wallet](https://tor.us/).

### Running

1. Run `make dev-build` in root directory.
2. Run `make dev-start` in root directory. This will start the project.
3. Open `localhost:8080` in the browser.

### Future improvements

- [ ] Currently tor.us wallet throws an Error when trying to create deploy containing `ModuleBytes` (eg. Install CEP47).
- [ ] Add more comments in code for clarification.
- [ ] Add more deploy templates. 
- [ ] Improve UI so it gives deploys preview

