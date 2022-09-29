import React, { useState } from 'react';
import "./noteList.css";

function NoteList({createNotes, notes, updateCurrentId, currentNotes, deleteNote, updateTitle}) {
    const [titleChange, setTitleChange] = useState(true)
    const [selectedTitle, setSelectedTitle] = useState("")

    function update(event){
        const {value, id} = event.target
        updateTitle(value, id)
        console.log(value)
    }

    function upTitle(title){
        setTitleChange(!titleChange)
        setSelectedTitle(title)
    }

    console.log(titleChange)
    const noteTitleEle = notes.map(item  => {
        return <div className="title-main" key={item.id}>
                    <div
                        
                        className={`title-box 
                        ${item.id === currentNotes.id ? "selected":""}`} >
                            {!titleChange && item.title === selectedTitle
                            ? <input 
                                type="text" 
                                name="title" 
                                value={item.title} 
                                className="title-input"
                                onChange={update}
                                id={item.id}
                                />
                                
                            : <div onClick={() => updateCurrentId(item.id)}
                                >{item.title}</div>
                                 
                            }
                        <button 
                            className="delete-btn-edit"
                            onClick={() => upTitle(item.title)}
                        ><i className='fas edit-icon'>&#xf044;</i></button>
                        <button 
                            className="delete-btn-del"
                            onClick={(event) => deleteNote(event, item.id)}
                        >
                            {/*<i className="gg-trash trash-icon"></i>*/}
                            <i className='fas delete-icon'>&#xf2ed;</i>
                        </button>
                    </div>
                </div>
    })


  return (
    <div className='noteList-main'>
        <div className="main-top">
            <span>Add Notes</span>
            <button
                onClick={createNotes}>+</button>
        </div>
        <div className='notes-title'>
            {notes && noteTitleEle}
            
        </div>
        
    </div>
  )
}

export default NoteList