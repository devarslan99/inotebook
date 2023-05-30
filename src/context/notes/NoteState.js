import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

  const host = "http://localhost:5000";

  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial)


  // Get all Notes
  const getNote = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZGY4MDFmMDVjZTgxNTcxMmRjYjdmIn0sImlhdCI6MTY4NDk5MDg4NX0.fSw62UABJrZ4ZZX-4u34w61VFeaL2rTCBtuzwa9p6Mo"
      }
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }




  //add note

  const addNote = async (title, description, tag) => {

    /////////api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZGY4MDFmMDVjZTgxNTcxMmRjYjdmIn0sImlhdCI6MTY4NDk5MDg4NX0.fSw62UABJrZ4ZZX-4u34w61VFeaL2rTCBtuzwa9p6Mo"
      },
      body: JSON.stringify({ title, description, tag })
    });

const json=await response.json();
console.log(json);

    ////////////logic
    const note = {
      "_id": "646f0d700e793ced3b4a26266a",
      "user": "646df801f05ce815712dcb7f",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-25T07:25:36.469Z",
      "__v": 0
    }
    setnotes(notes.concat(note));
  }



  ///edit note
  const editNote = async (id, title, description, tag) => {


    /////////api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZGY4MDFmMDVjZTgxNTcxMmRjYjdmIn0sImlhdCI6MTY4NDk5MDg4NX0.fSw62UABJrZ4ZZX-4u34w61VFeaL2rTCBtuzwa9p6Mo"
      },
      body: JSON.stringify({ title, description, tag })
    });


    const json=await response.json();
    console.log(json);


let newnotess=JSON.parse(JSON.stringify(notes));
    //////////////logic
    for (let index = 0; index < newnotess.length; index++) {

      const element = newnotess[index];
      if (element._id === id) {
        newnotess[index].title = title;
        newnotess[index].description = description;
        newnotess[index].tag = tag
        break;
      }


    }
    setnotes(newnotess);
  }




  //delete note
  const deleteNote = async (id) => {
    console.log("Deleting the note with id" + id);

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2ZGY4MDFmMDVjZTgxNTcxMmRjYjdmIn0sImlhdCI6MTY4NDk5MDg4NX0.fSw62UABJrZ4ZZX-4u34w61VFeaL2rTCBtuzwa9p6Mo"
      }
    });
    const json = await response.json()
    console.log(json)
    const newnotes = notes.filter((note) => { return note._id !== id });
    setnotes(newnotes);
  }





  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>

      {props.children}

    </noteContext.Provider>
  )
}

export default NoteState
