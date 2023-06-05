import React, {Suspense} from "react"
import NoteLazy from "./NoteLazy"
const Note = React.lazy(() => import('./Note'))

const AllNote = (props) => {
    return(
        <div className="allnote">
            {props.notes.length == 0 ? 
                <div className="row p-3 m-3 text-center bg-info rounded">
                    <h3>There are no notes to show</h3>
                </div>
                : 
                props.showFavoriteState ?
                
                <div>
                    <h2 className="text-left my-2 ml-4">Favorites</h2>
                    {props.notes.filter(note => note.favorite ? note : '').map((note, id) => {
                        return(
                            <Suspense fallback = {<NoteLazy/>} key = {id} >
                                <Note note = {note} key = {id} toggleShowNote = {props.toggleShowNote} setNote = {props.setNote} deleteNote = {props.deleteNote} setFavorite = {props.setFavorite} toggleEditedFav = {props.toggleEditedFav}/>
                            </Suspense> 
                        )
                    })}
                </div>
                 : 
                props.notes.map((note, id) => {
                    return(
                        <Suspense fallback = {<NoteLazy/>} key = {id} >
                            <Note note = {note} key = {id} toggleShowNote = {props.toggleShowNote} setNote = {props.setNote} deleteNote = {props.deleteNote} setFavorite = {props.setFavorite} toggleEditedFav = {props.toggleEditedFav}/>
                        </Suspense> 
                    )
                })
            }
        </div>
    )
}

export default AllNote