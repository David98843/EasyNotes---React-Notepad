import React from 'react'
import ShowNote from './ShowNote'
import AddNote from './AddNote'

function NoteOrForm({noteState, removeForm, AddNotes, toggleShowNote, note}) {
  return (
    <div>

        {noteState ? <ShowNote toggleShowNote = {toggleShowNote} note = {note} /> : <AddNote AddNotes = {AddNotes} removeForm = {removeForm}/>}
      
    </div>
  )
}

export default NoteOrForm
