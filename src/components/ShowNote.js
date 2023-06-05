import React from 'react'

function ShowNote(props) {
  return (

    <div className='col p-5 show-note'>

        <div className="go-back" onClick={
          () => {
            let title = document.getElementById('title').value
            let content = document.getElementById('content').value
            props.editNote(props.note.id, content, title)
            props.toggleShowNote()
          }
          }>
            <i className='ri-arrow-go-back-fill'></i>
        </div>

        <div className="row note-title show-note-title" >
            <input type="text" defaultValue = {props.note.title} id='title'/>
        </div>


        <div className="row note-content show-note-content my-4">
          <textarea name="content" id="content">{props.note.content}</textarea>
        </div>
      
    </div>
  )
}

export default ShowNote
