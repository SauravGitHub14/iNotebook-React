import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = []

    //Get All notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)

    }




    const [notes, setNotes] = useState(notesInitial)

    const addNote = async (title, description, tag) => {
        // Api CAll
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log(note)

        // console.log("Adding a New Note")
        // const note = json;
        
    }
    const deleteNote = async (id) => {
        // API call delete Note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)
        
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    const editNote = async (id, title, description, tag) => {
        //API call for editNote

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await  response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        //logic
        for (let i = 0; i < newNotes.length; i++) {
            const element = notes[i];
            if (element._id === id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
            }
            
        }
        setNotes(newNotes);
    }



    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;
