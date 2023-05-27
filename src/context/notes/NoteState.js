import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

     const notesinitial=[
        {
          "_id": "646f0d700e793e3bc4a26266a",
          "user": "646df801f05ce815712dcb7f",
          "title": "political crises",
          "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
          "tag": "pk",
          "date": "2023-05-25T07:25:36.469Z",
          "__v": 0
        },
        {
            "_id": "646f0d700e793de3b4ca26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e7c93ed3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e793dce3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e793ced3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
      ];


//add note
   
const addNote=(title,description,tag)=>{

 const note= {
        "_id": "646f0d700e793ced3b4a26266a",
        "user": "646df801f05ce815712dcb7f",
        "title":title,
        "description":description,
        "tag": tag,
        "date": "2023-05-25T07:25:36.469Z",
        "__v": 0
      }
    setnotes(notes.concat(note));
}
///edit note
const editNote=(id)=>{

}
//delete note
const deleteNote=(id)=>{

}

const [notes, setnotes] = useState(notesinitial)
    return (
        <noteContext.Provider value={{notes,addNote,editNote,deleteNote}}>

            {props.children}

        </noteContext.Provider>
    )
}

export default NoteState
