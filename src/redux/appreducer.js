import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
const contractAddress = "0xDCd8bC11f5572F84C6c1908Aa44bb748e5F2546f"; //Ganache/STORAGEWITHREDUX

const initialState = {
    contractProvider: null,
    contractSigner:null,
    accounts: [],
    web3LoadingErrorMessage: null,
}

export const LoadBlockcahin = createAsyncThunk("LoadBlockcahin", async(_, thunkAPI)=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractProvider = new ethers.Contract(contractAddress, Greeter.abi, provider);
        const contractSigner = new ethers.Contract(contractAddress, Greeter.abi, signer);
        const accounts = await signer.getAddress();
        
       
        return {
            contractProvider,
            contractSigner,
            accounts,

        }
    }catch(err) {
        console.log(err);
    }
})

const storageSlice = createSlice({
    name: "storage",
    initialState,
    reducers: {},
    extraReducers:{
        [LoadBlockcahin.fulfilled.toString()]: (state, {payload})=>{
            state.accounts = payload?.accounts;
            state.contractProvider= payload?.contractProvider;
            state.contractSigner=payload?.contractSigner;
        },
        
    }
})
export const storageReducer = storageSlice.reducer;