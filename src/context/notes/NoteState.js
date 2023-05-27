import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

     const notesinitial=[
        {
          "_id": "646f0d700e793e3b4a26266a",
          "user": "646df801f05ce815712dcb7f",
          "title": "political crises",
          "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
          "tag": "pk",
          "date": "2023-05-25T07:25:36.469Z",
          "__v": 0
        },
        {
            "_id": "646f0d700e793e3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e793e3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e793e3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
          {
            "_id": "646f0d700e793e3b4a26266a",
            "user": "646df801f05ce815712dcb7f",
            "title": "political crises",
            "description": "ik arrested and banned to jail beajj ksdjhsue jjdsjdksdsdsdddd",
            "tag": "pk",
            "date": "2023-05-25T07:25:36.469Z",
            "__v": 0
          },
      ];

const [notes, setnotes] = useState(notesinitial)
    return (
        <noteContext.Provider value={{notes,setnotes}}>

            {props.children}

        </noteContext.Provider>
    )
}

export default NoteState
