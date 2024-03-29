import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connector";
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import A2FCreatorsNFT from "../contracts/A2FCreators.json";
import config from "../contracts/config.json";

const { active, chainId, account, activate, deactivate, library, connector } =
  useWeb3React();
const connect = async () => {
  try {
    await activate(injected, undefined, true);
  } catch (err) {
    alert(err);
  }
};

const disconnect = async () => {
  try {
    deactivate();
  } catch (err) {
    alert(err);
  }
};

const mint = async () => {
  let web3 = new Web3(library.provider);

  const contract = new web3.eth.Contract(
    A2FCreatorsNFT as any,
    config.contractAddress
  );

  const tx = {
    from: account,
    to: config.contractAddress,
    value: 0,
    data: contract.methods.mintPublic(4).encodeABI(),
  };
  web3.eth.sendTransaction(tx as any);
  console.log(contract);
};
