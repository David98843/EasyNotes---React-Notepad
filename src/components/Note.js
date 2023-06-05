const Note = (props) => {
    return(
            <div className="row m-4 bg-dark text-light p-3 rounded note" >

                <div className="note-options-cont">
                    <div className="items">
                        <i className={`las la-heart ${props.note.favorite ? 'favorite' : ''}`} onClick = {
                            () => {
                                props.toggleEditedFav()
                                props.setFavorite(props.note.id)
                            }
                        }></i>
                        <i className="las la-trash" onClick={
                            () => {
                                props.deleteNote(props.note.id)
                            }
                        }></i>
                        <i className="las la-edit" 
                        onClick={
                            () => {
                                const note = props.note
                                props.toggleShowNote(true)
                                props.setNote(note)
                            }
                        }
                        ></i>
                    </div>
                </div>


                <div className="col-7">
                    <div className="row title-text mr-1"><h3>{props.note.title}</h3></div>
                    <div className="row content-text">
                        <p>{props.note.content}</p>
                    </div>
                </div>

                <div className="col-4 text-right">
                    <div className="row text-right day-text">
                        <h5><i className = "ri-calendar-line" ></i> {props.note.day}</h5>
                    </div>
                    <div className="row time-text">
                        <h5><i className = "ri-timer-line" ></i> {props.note.time}</h5>
                    </div>
                </div>
            </div>
    )
}

export default Note