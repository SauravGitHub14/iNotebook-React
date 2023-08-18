import React from 'react'
import Card from 'react-bootstrap/Card';
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
  const  {note, updateNote}= props;
  const {deleteNote} = context;



  return (
    <div className='note-container my-3 col-md-3'>
        <Card style={{ width: '18rem' }} className='border border-secondary shadow p-3 mb-5 bg-body rounded'>
      <Card.Body>
        <div className='title-icon mx-2 mb-2 mt-1'>
        <Card.Title>{note.title}</Card.Title>
        </div>
        <Card.Text>
        {note.description}
        </Card.Text>
      </Card.Body>
      <div className=' mx-3 my-1'>
        <BsTrash className=' icon mx-2' onClick={() => {deleteNote(note._id)}}/>
        <BsPencilSquare className='icon ' onClick= {()=> {updateNote(note)}}/>
        </div>
    </Card>
    

    </div>
  )
}

export default NoteItem