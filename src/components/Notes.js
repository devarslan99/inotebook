import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './AddNote';
import {useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  const [note, setnote] = useState({ id:"",etitle:"", edescription:"", etag:"default" });
  const ref = useRef(null);
  const refClose = useRef(null);
const navigate=useNavigate();


  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()

    }
 else{
  navigate('/login')
 }
    // eslint-disable-next-line 
  }, []);
  

  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    // 
  }
  const handleClick = (e) => {
    e.preventDefault();
    console.log("updating",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("updated successfully","success");
  }
  const onChange = (e) => {

    setnote({ ...note, [e.target.name]: e.target.value })

  }
 

  
  


  return (
    <>
      <Addnote showAlert={props.showAlert}/>


      <button ref={ref} ype="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </div>
          </div>
        </div>
      </div>



      <div className="row my-3">
        <h2>Your Notes:</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert={props.showAlert} note={note} updatenote={updatenote} />
        })}
      </div>
    </>
  )
}

export default Notes
