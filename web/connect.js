// 🔗 Add Tata Service Network to MetaMask
async function addNetwork() {
  if (!window.ethereum) {
    alert("MetaMask not installed ❌");
    return;
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0x7EA", // 2026 in HEX
        chainName: "Tata Service",
        nativeCurrency: {
          name: "Tata Service",
          symbol: "TATA",
          decimals: 18
        },
        rpcUrls: ["https://16.171.110.210:8545"],
        blockExplorerUrls: []
      }]
    });

    console.log("✅ Network Added");

  } catch (error) {
    console.error("❌ Add Network Error:", error);
  }
}

// 🔗 Connect Wallet
async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask ❌");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const account = accounts[0];

    document.getElementById("address").innerText = account;

    console.log("✅ Connected:", account);

    // Save globally
    window.userAccount = account;

    // Load balance
    getBalance();

  } catch (error) {
    console.error("❌ Connect Error:", error);
  }
}

// 🔄 Auto detect account change
if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts.length > 0) {
      document.getElementById("address").innerText = accounts[0];
      window.userAccount = accounts[0];
      getBalance();
    }
  });
}
