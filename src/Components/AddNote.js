import React, {useContext}  from 'react'
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import noteContext from "../Context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:  "", description: "", tag: ""})
    const handleClick = (e) =>{
        e.preventDefault();
       addNote(note.title, note.description, note.tag);
       setNote({title:  "", description: "", tag: ""})

    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})

    }
  return (
    <div className='container my-2 border border-secondary'>
        <h1 className='mt-2'>Add a Note</h1>
      <Form className=''>
      <Form.Group className="mb-3">
        <Form.Label className=' mx-2 mt-2'><b>Title</b></Form.Label>
        <Form.Control type="text" placeholder="Enter Title" id="title" name ="title" value={note.title} onChange={onChange} minLength={5} required/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label className=' mx-2'> <b>Write a Note</b></Form.Label>
        <Form.Control type="text" placeholder="Create a Note" id = "description"  value={note.description} name= "description" onChange={onChange} minLength={5} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className=' mx-2'><b>Tag</b></Form.Label>
        <Form.Control type="text" placeholder="Tag name" id = "tag"  name= "tag"  value={note.tag}onChange={onChange} minLength={3} required/>
      </Form.Group>
      <Button  className="mb-2"disabled={note.title.length<5 || note.description.length<5} variant="primary" type="submit" onClick={handleClick}>
        Add Note
      </Button>
    </Form>
    </div>
  )
}

export default AddNote