import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadBlockcahin } from "./redux/appreducer";


function App() {
  const dispatch = useDispatch();
  const {contractProvider, contractSigner, accounts} = useSelector((e)=>e.storage);
  const [val, setVal] = useState("d");
  
  
  const getval = async ()=>{
    try {
      let str = await contractProvider.greet();
      console.log(await contractProvider.greet())
      setVal(str);

    }catch(err){
      console.log(err);
    }
 
  }
  
  return (
    <div className="App">
      <h1>Shafqat</h1>
    
      <button onClick={()=>dispatch(LoadBlockcahin())}>Metamask</button>
      <button onClick={()=>getval}>Values</button>
      {val}
    </div>
  );
}

export default App;
