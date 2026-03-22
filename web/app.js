let account = null;

async function connectWallet() {
  if (!window.ethereum) {
      alert("Install MetaMask");
          return;
            }

              const accounts = await window.ethereum.request({
                  method: 'eth_requestAccounts'
                    });

                      account = accounts[0];

                        document.getElementById("address").innerText = account;

                          getBalance();
                          }

                          async function getBalance() {
                            const balance = await window.ethereum.request({
                                method: "eth_getBalance",
                                    params: [account, "latest"]
                                      });

                                        // convert wei → TATA
                                          const tata = parseInt(balance) / 1e18;

                                            document.getElementById("balance").innerText = tata + " TATA";
                                            }