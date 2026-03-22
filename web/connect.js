async function addNetwork() {
      if (!window.ethereum) {
          alert("MetaMask not installed");
              return;
                }

                  try {
                      await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                                  params: [{
                                          chainId: '0x7EA', // 2026 in HEX ✅
                                                  chainName: 'Tata Service',
                                                          nativeCurrency: {
                                                                    name: 'Tata Service',
                                                                              symbol: 'TATA',
                                                                                        decimals: 18
                                                                                                },
                                                                                                        rpcUrls: ['https://tata-service-chain--dinobandhu8158.replit.app']
                                                                                                              }]
                                                                                                                  });

                                                                                                                      console.log("Tata Service Network Added ✅");

                                                                                                                        } catch (error) {
                                                                                                                            console.error("Error:", error);
                                                                                                                              }
                                                                                                                              }
