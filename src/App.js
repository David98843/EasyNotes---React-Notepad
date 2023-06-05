import React from 'react'
import { useState, useEffect} from 'react'
import './bootstrap-4.0.0-dist/css/bootstrap.css'
import './icons.css'
import './App.css'
import Header from "./components/Header"
import AllNote from './components/AllNote'
import AddNote from './components/AddNote'
import ShowNote from './components/ShowNote'



const App = () => {

  const [notes, setNote] = useState([])
  const [favNotes, setFavNotes] = useState([])
  const [editedFavorite, setEditedFavorite] = useState(false)

  function generateRandomID(){
    let letters_lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let letters_caps = letters_lower.map((value) => value.toUpperCase())
    let letters = [letters_lower, letters_caps]
    let symbols = ['~','`','!','@','#','$','%','^','&','*','(',')','-','_','+','=','\/','|',':','?','>','<','/','.',',']
    let part_1_length = 10
    let part_2_length = 8
    let part_3_length = 5
    let part_1 = []
    let part_2 = []
    let part_3 = []

    
    while(part_1_length >= 0){
        let randomLetterPos = Math.floor(Math.random() * letters_lower.length)
        let randomCasePos = Math.floor(Math.random() * 2)
        let randomLetter = letters[Number(randomCasePos)][Number(randomLetterPos)]  
        part_1.push(randomLetter)
        part_1_length--
    }

    while(part_2_length >= 0){
        let randNum = Math.floor(Math.random() * 9)
        part_2.push(randNum)
        part_2_length--
    }
    while(part_3_length >= 0){
        let randomSymbolPos = Math.floor(Math.random() * symbols.length)
        part_3.push(symbols[randomSymbolPos])
        part_3_length--
    }

    let part_1_str = part_1.join('')
    let part_2_str = part_2.join('')
    let part_3_str = part_3.join('')

    let randomID = part_1_str.concat(part_2_str,part_3_str)
    return randomID

  }


  function getNotes(id){
    let noteStorage = window.localStorage
    let notesID = noteStorage.getItem('ids')
    let notesList = []
    if(notesID){
      let notesIDList = notesID.split(';')
      for(let noteID of notesIDList){
        let noteObj = {}
        noteObj['id'] = noteID
        noteObj['title'] = noteStorage.getItem(`${noteID}-title`)
        noteObj['content'] = noteStorage.getItem(`${noteID}-content`)
        noteObj['favorite'] = Boolean(Number(noteStorage.getItem(`${noteID}-favorite`)))
        noteObj['day'] = noteStorage.getItem(`${noteID}-day`)
        noteObj['time'] = noteStorage.getItem(`${noteID}-time`)
        notesList.push(noteObj)
      }
    }else{

    }

    if(id){
      for(let note of notesList){
        if(note.id === id){
          return note
        }
      }
    }else{
      return notesList
    }
  }
  
  
  useEffect(() => {
    const setNotes = () => {
      setNote(getNotes())
      console.log(notes)
    }
    setNotes()    
  },[])

  const setFavorite  =  (id) => {
    const update_note =  getNotes(id)
    window.localStorage.setItem(`${id}-favorite`, `${update_note.favorite ? 0 : 1}`)
    const newNote = {...update_note, favorite : !update_note.favorite}
    setNote(notes.map(note => note.id === id ? newNote :  note))
  }

  const deleteNote = (id) => {
    let notesID = window.localStorage.getItem('ids')
    let notesIDList = notesID.split(';')
    let newIDList = notesIDList.filter(noteID => noteID !== id)

    window.localStorage.setItem('ids', newIDList.join(';'))
    window.localStorage.removeItem(`${id}-id`)
    window.localStorage.removeItem(`${id}-title`)
    window.localStorage.removeItem(`${id}-content`)
    window.localStorage.removeItem(`${id}-favorite`)
    window.localStorage.removeItem(`${id}-day`)
    window.localStorage.removeItem(`${id}-time`)

    setNote(notes.filter((note) => note.id !== id))
  }

  const editNote =  (id, content, title) => {
    window.localStorage.setItem(`${id}-title`, title)
    window.localStorage.setItem(`${id}-content`, content)
    setNote(notes.map((note) => note.id === id ? {...note, title, content} : note))
  }

  const [form, showForm] = useState(false)

  const showAddForm = () => {
    showForm(true)
  }

  const removeForm = () => {
    showForm(false)
  }

  const AddNotes =  (note) => {
    let noteID = generateRandomID()
    let noteStorage = window.localStorage
    let notesID = noteStorage.getItem('ids')
    if(notesID){
      let notesIDList = notesID.split(';')
      notesIDList.push(noteID)
      noteStorage.setItem('ids',notesIDList.join(';'))
    }else{
      noteStorage.setItem('ids',`${noteID}`)
    }
    noteStorage.setItem(`${noteID}-id`, noteID)
    noteStorage.setItem(`${noteID}-title`, note.title)
    noteStorage.setItem(`${noteID}-content`, note.content)
    noteStorage.setItem(`${noteID}-favorite`, '0')
    noteStorage.setItem(`${noteID}-day`, note.day)
    noteStorage.setItem(`${noteID}-time`, note.time)
    setNote(getNotes())
  }

  const [noteState, toggleShowNote] = useState(false)
  const [display_note, setDisplayNote] = useState()
  const [showFavoriteState, setShowFavoriteState] = useState(false)

  const toggleEditedFav = () => {
    setEditedFavorite(!editedFavorite)
  }
  
  const removeShowNote = () => {
    toggleShowNote(false)
  }

  const toggleShowFavorites = (value) => {
    setShowFavoriteState(value)
  }

  const search =  (query) => {
    let initial_notes = getNotes()
    let qs = query.trim().toLowerCase()

    let res_arr = initial_notes.filter(note => {
      let searchCondition = note.content.toLowerCase().includes(qs) || note.title.toLowerCase().includes(qs) == true

      if(searchCondition){
        return note;
      }
    })
    if(query.length == 0 ){
      setNote(initial_notes)
    }
    else{
      setNote(res_arr)
    }

  }


  return (
    <div>
      <Header showAddForm = {showAddForm}  noteState = {noteState} toggleShowFavorites = {toggleShowFavorites} />

      {!form && !noteState ? <div className='search-bar'>
        <input type='search' placeholder='Search Notes' 
        onChange={(e) => {
          search(e.target.value)
        }}/>
        <div className="search-icon">
          <i className='ri-search-line'></i>
        </div>
      </div> : ''}
      

      {
      noteState ? 
      <ShowNote toggleShowNote = {removeShowNote} note = {display_note} editNote={editNote}/> :
      
      form ? 
      
      <AddNote removeForm = {removeForm} AddNotes = {AddNotes} /> : 
      
      <AllNote notes = {notes} favNotes = {favNotes} toggleShowNote = {toggleShowNote} setNote = {setDisplayNote} deleteNote = {deleteNote} showFavoriteState = {showFavoriteState} setFavorite = {setFavorite} toggleEditedFav = {toggleEditedFav} />
      }

    </div>
  )
}

export default App