import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadBlockchain } from "./redux/storageslicer";
import { added } from "./redux/storageslicer";

const App = ()=>{
    const list = useSelector((e)=>e.metaconnect);
    const oldval = useSelector((e)=>e.metaconnect.history.record);
    console.log(oldval);
    const dispatch = useDispatch();
    const {contractProvider, contractSigner, accounts} = list;

    const [val, setVal] =useState("dd");
    const [newVal, setNewVal] = useState("Blockchain value")
    const metahand = ()=>{
        dispatch(LoadBlockchain());
    }
    const getVal = async ()=>{
        const newval = await contractProvider.greet();
        console.log(newval);
        setVal(newval);
    }
    const changeVal = async (value)=>{
        try {
            const newval = await contractSigner.setGreeting(value);
            await newval.wait();
            const payload = {
                saveval: newVal,
                address:accounts,
            }
            dispatch(added(payload));

        }catch(err){
            console.log(err);
        }
    }
    console.log(accounts);
    return (
        <>
        
        <h1>Change the value of greeting variable on Blockchain</h1>
        <h2> First connect with metamask, network is Ropsten</h2>
        <button onClick={()=>metahand()}>Connect Metamask</button>
        
        <h2>Change the variable value</h2>
        <input value={newVal} onChange= {(e)=>setNewVal(e.target.value)}/>
        <button onClick={()=>changeVal(newVal)}>Change Value</button> <br /> <br />
        <button onClick={()=>getVal()}>Get current value of variable</button>

        <h1> The value stored of variable greeting is :- {val}</h1>
        <h1>HISTORY</h1>
        {
            oldval.map((item)=>{
                return(
                    <h6>"The address" {item.address} "changed the value to" {item.saveval}</h6>
                )
            })
        }
        </>
    )
}

export default App;