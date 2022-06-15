import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadBlockchain } from "./redux/storageslicer";

const App = ()=>{
    const list = useSelector((e)=>e.metaconnect);
    const dispatch = useDispatch();
    const {contractProvider, contractSigner, accounts} = list;

    const [val, setVal] =useState("dd");
    const metahand = ()=>{
        dispatch(LoadBlockchain());
    }
    const getVal = async ()=>{
        const newval = await contractProvider.greet();
        console.log(newval);
        setVal(newval);
    }
    console.log(accounts);
    return (
        <>
        {val}
        <h1>Shafqat HUssain</h1>
        <button onClick={()=>metahand()}>Connect Metamask</button>
        <button onClick={()=>getVal()}>Get Val</button>
        </>
    )
}

export default App;