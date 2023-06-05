import React from "react";
import { useState } from "react";

const AddNote = (props) => {
    
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [favorite, setFavorite] = useState(false)

    const text_area = document.getElementsByTagName('textarea')[0]
    const displayer = document.getElementsByClassName('displayer')[0]

    return (

        <div className="add-note p-5">

            <div className="go-back go-back-2" onClick={props.removeForm}>
                <i className='ri-arrow-go-back-fill'></i>
            </div>


            <h2>Add Note</h2>
            <form onSubmit = {e => {
                e.preventDefault();


                const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] 
                let hour = new Date().getHours()
                let  minute = new Date().getMinutes()
                hour = String(hour).length === 1 ? `0${hour}` : hour 
                minute = String(minute).length === 1 ? `0${minute}` : minute 
                const note = {
                    title,
                    content,
                    day : `${months[new Date().getMonth()]} ${new Date().getDate()}`,
                    time : `${hour}:${minute}`,
                    favorite
                }

                if(!title || !content){
                    alert('Note Cannot be empty')
                }else{
                    props.AddNotes(note)
                    alert('Note has been successfully added')
                    props.removeForm()
                    setContent()
                    setTitle()
                }
                
            }} >
                <div className="col">
                    <div className="row my-3">
                        <input
                         type="text" 
                         name="title" 
                         id="title" 
                         placeholder="Title"
                         value={title}
                         onChange = {e => setTitle(e.target.value)}
                         />
                    </div>
                    
                    <div className="row xyz">
                        <div className="displayer">
                        </div>
    
                        <textarea
                        itemID="textarea"
                        name="content" 
                        id="content" 
                        cols="30" 
                        rows="7" 
                        placeholder="Content "
                        value = {content}
                        onChange = {e => {
                            // let displayer = document.getElementsByClassName('displayer')[0]
                            // displayer.innerHTML = e.target.innerText
                            setContent(e.target.value)
                        }}
                        >
                        </textarea>
                    </div>
                    {/* <div className="row edit-btns mb-3 p-2">
                        <div className="col m-1" onClick={makeItalics}>
                            <i>I</i>
                        </div>
                        <div className="col m-1" onClick={makeBold}>
                            <b>B</b>
                        </div>
                        <div className="col m-1">
                            <li>list</li>
                        </div>

                    </div> */}

                    <div className="row">
                        <input type="submit" className = 'btn btn-primary p-3 mt-3' value='Add Note' />
                    </div>
                </div>
            </form>
        </div>

    )
}

export default AddNote