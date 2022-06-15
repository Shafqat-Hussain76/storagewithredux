import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
const contractAddress = "0x8288E7231274FE1bEa6825825b65cB5DFf2b9EEA";// Ropsten

const initialState = {
    contractProvider: null,
    contractSigner: null,
    accounts: []
};

export const LoadBlockchain = createAsyncThunk("LoadBlockchain", async (_, thinkAPI)=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        //const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
        const signer = provider.getSigner();
        const contractProvider = new ethers.Contract(contractAddress, Greeter.abi, provider);
        const contractSigner = new ethers.Contract(contractAddress,Greeter.abi, signer);
        const accounts = await signer.getAddress();
        return {
            contractProvider,
            contractSigner,
            accounts,

        }
    }catch(err){
        console.log(err);
    }
})

export const storageslice = createSlice({
    name: "storage",
    initialState,
    reducers:{},
    extraReducers: {
        [LoadBlockchain.fulfilled.toString()]:(state, {payload})=>{
            state.contractProvider= payload?.contractProvider;
            state.contractSigner= payload?.contractSigner;
            state.accounts= payload?.accounts;
        }
    }
})
export const storageReducer = storageslice.reducer;
