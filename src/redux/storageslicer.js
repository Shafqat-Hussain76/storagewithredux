import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
const contractAddress = "0x2675FAbBaD05A107b1C52C9Dc49B410eA04b58d4";// Ropsten

const initialState = {
    contractProvider: null,
    contractSigner: null,
    accounts: [],
    history : {
        record : [
            {
                saveval: null,
                address:null,
            }
        ]
    }
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
    reducers:{
        added : (state, action)=>{
            state.history.record.push(action.payload);
        }
    },
    extraReducers: {
        [LoadBlockchain.fulfilled.toString()]:(state, {payload})=>{
            state.contractProvider= payload?.contractProvider;
            state.contractSigner= payload?.contractSigner;
            state.accounts= payload?.accounts;
        }
    }
})
export const storageReducer = storageslice.reducer;
export const { added } = storageslice.actions;
