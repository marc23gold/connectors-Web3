import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ethers } from "ethers";
//connect to metamask
//execute a function

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        let connectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setSigner(connectedProvider.getSigner());
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }

    async function execute() {
      if (typeof window.ethereum !== "undefined") {
        //address
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        //contract ABI
        const abi = [
          {
            inputs: [
              {
                internalType: "string",
                name: "_name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_favoriteNumber",
                type: "uint256",
              },
            ],
            name: "addPerson",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            name: "nameToFavoriteNumber",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            name: "people",
            outputs: [
              {
                internalType: "uint256",
                name: "favoriteNumber",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "retrieve",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_favoriteNumber",
                type: "uint256",
              },
            ],
            name: "store",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];
        //function
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); //will get the connected account
        const contract = new ethers.Contract(contractAddress, abi, signer);
        await contract.store(42);
      }
    }
  }
  return (
    <div className={styles.container}>
      Hello Patrick
      {isConnected ? (
        <>
          "Connected"
          <button onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect! </button>
      )}
    </div>
  );
}
