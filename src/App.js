import { useEffect, useState } from 'react';
import './App.css';
import Split from "react-split"
import {nanoid} from 'nanoid';
import NoteList from './components/notesList/noteList';
import Notes from './components/notes/notes';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {
  const [notes, setNotes] = useState(
   () => JSON.parse(localStorage.getItem("note")) || [])
  const [currentId, setCurrentId] = useState(
    (notes[0] && notes[0].id) || "")
  const [count, setCount] = useState(1)

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(notes))
  },[notes])

  function createNotes(){
    const noteArray = {
      id:nanoid(),
      title:`Notes ${count}`,
      text:"type your text"
    }
    setCount(count + 1)
    setNotes(prev => [...prev,noteArray])
    setCurrentId(noteArray.id)
  }

  function updateCurrentId(id){
    setCurrentId(id)
  }

  function findCurrentNote(){
    return notes.find(note => {
      return note.id === currentId
    }) 
  }

  function updateNotes(text){
    setNotes(oldNotes => {
      const newArray = []
      for(let i=0; i<oldNotes.length; i++){
        const oldNote = oldNotes[i]
        if(oldNote.id === currentId){
          newArray.unshift({...oldNote, text: text})
        }else{
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, id){
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== id))
  }

  function updateTitle(title, id){
    setNotes(old => {
      return old.map(items => {
        return id === items.id ?
        {...items,title:title}:{...items}
      })
    })
  }

  console.log(notes)

  return (
    <div className="App">
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
      <Split
        size={[20, 80]}
        direction="horizontal"
        className="split" >
          <NoteList
            key={nanoid()}
            updateTitle={updateTitle}
            createNotes={createNotes}
            currentId={currentId}
            currentNotes={findCurrentNote()}
            updateCurrentId={updateCurrentId}
            deleteNote={deleteNote}
            notes={notes} />
          <Notes 
            key={nanoid()}
            notes={findCurrentNote()}
            updateNotes={updateNotes}
             />
        </Split>
      
    </div>
  );
}

export default App;
