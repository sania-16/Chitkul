
/*
import MetaMaskOnboarding from '@metamask/onboarding';
const onboarding = new MetaMaskOnboarding();

const player = document.querySelector(".success-anim");

const btn = document.querySelector(".onboard");
const statusText = document.querySelector("h1");
const statusDesc = document.querySelector(".desc");
const loader = document.querySelector(".loader");
const upArrow = document.querySelector(".up");
const confetti = document.querySelector(".confetti");

const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    loader.style.display = 'block';
  }

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      statusText.innerText = "You need to Install a Wallet";
      statusDesc.innerText = "We recommend the MetaMask wallet.";
      btn.innerText = "Install MetaMask";
      btn.onclick = onClickInstallMetaMask;
    } else {
      connectWallet().then((accounts) => {
        if (accounts && accounts[0] > 0) {
          showAddress(accounts);
        } else {
          statusText.innerHTML = "Connect your wallet";
          statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`;
          btn.innerText = "Connect MetaMask";
          upArrow.style.display = "block";
        }
      });
    }
  };

  let connected = (accounts) => {
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = accounts[0];
    btn.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
    statusDesc.classList.add("account");
  }

  async function connectWallet() {
    return await ethereum.request({ method: "eth_accounts" });
  }
  
  let showAddress = (accounts) => {
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = accounts[0];
    btn.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
    statusDesc.classList.add("account");
  };

  btn.addEventListener("click", async () => {
    btn.style.backgroundColor = "#cccccc";
    loader.style.display = "block";
  
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      connected(accounts);
    } catch (error) {
      console.error(error);
    }
  });
  */

  import MetaMaskOnboarding from '@metamask/onboarding';
const onboarding = new MetaMaskOnboarding();

const player = document.querySelector(".success-anim");
const btn = document.querySelector(".onboard");
const statusText = document.querySelector("h1");
const statusDesc = document.querySelector(".desc");
const loader = document.querySelector(".loader");
const upArrow = document.querySelector(".up");
const confetti = document.querySelector(".confetti");

const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    loader.style.display = 'block';
}

const connectWallet = async () => {
    try {
        return await ethereum.request({ method: "eth_accounts" });
    } catch (error) {
        console.error("Error connecting wallet:", error);
        throw error; // Re-throw the error for error handling in the caller
    }
};

const connected = (accounts) => {
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = accounts[0];
    btn.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
    statusDesc.classList.add("account");
};

const MetaMaskClientCheck = async () => {
    if (!isMetaMaskInstalled()) {
        statusText.innerText = "You need to Install a Wallet";
        statusDesc.innerText = "We recommend the MetaMask wallet.";
        btn.innerText = "Install MetaMask";
        btn.onclick = onClickInstallMetaMask;
    } else {
        try {
            const accounts = await connectWallet();
            if (accounts && accounts[0]) {
                connected(accounts);
            } else {
                statusText.innerHTML = "Connect your wallet";
                statusDesc.innerHTML = "To begin, please connect your MetaMask wallet.";
                btn.innerText = "Connect MetaMask";
                upArrow.style.display = "block";
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }
};

btn.addEventListener("click", async () => {
    btn.style.backgroundColor = "#cccccc";
    loader.style.display = "block";

    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        connected(accounts);
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
});

MetaMaskClientCheck();


  
  