import React, { useContext, useRef, useState } from 'react'
import noteContext from "../Context/notes/noteContext"
import NoteItem from "./NoteItem"
import AddNote from './AddNote'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; 
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes , editNote} = context;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){ 
        getNotes();
      }
      else{
        navigate('/login')
      }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id: "",etitle:  "", edescription: "", etag: "default"})
    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id,etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

    }

    
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})

    }

    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        // console.log("udapting the note.." ,note)
        editNote(note.id, note.etitle, note.edescription, note.etag);
        toast.success("Note Updated Successfully")
        setShow(false)
    };

    const handleClose = (e) =>{
      setShow(false);
      toast.error("Note not updated!!!")
    }


    const handleShow = () => setShow(true);

    return (
        <div className='row my-3'>
            <AddNote />
            <Button className='d-none' ref={ref} variant="primary" onClick={handleShow}>
        Update your Note
      </Button>

      <Modal show={show} onHide={handleChange}>
        <Modal.Header closeButton>
          <Modal.Title>Note heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" id="etitle" name ="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Write a Note</Form.Label>
        <Form.Control type="text" placeholder="Create a Note" id = "edescription"  name= "edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" placeholder="Tag name" id = "etag"  name= "etag" value={note.etag} onChange={onChange} minLength={3} required />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button disabled={note.etitle.length<5 || note.edescription.length<5} variant="primary" onClick={handleChange}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
           
            <h1 className=' my-3'>Your Notes</h1>
            {notes.length === 0 && "No Note is Here"}
            {notes.map((note) => {
                return <NoteItem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    )
}

export default Notes