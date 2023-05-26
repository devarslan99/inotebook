import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

    const s1 = {
        "name": "arslan",
        "age": 23
    }
    const [state, setstate] = useState(s1);

   const update=()=>{

    setInterval(() => {
          setstate({
            "name": "ayaan",
            "age": 12
          });


    }, 1000);
   }

    return (
        <noteContext.Provider value={{state:state,update:update}}>

            {props.children}

        </noteContext.Provider>
    )
}

export default NoteState
