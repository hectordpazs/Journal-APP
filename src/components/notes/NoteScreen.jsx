import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(note)
    const {body, title} = values;

    const dispatch = useDispatch();

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id!==activeId.current){
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {
        
        dispatch(activeNote(values.id, {...values}))

    }, [values, dispatch])

    const handleDelete = ()=>{
        dispatch (startDeleteNote(note.id))
    }

    return (
        <div className='notes__main-content'>
            <NotesAppBar/>
            <div className='notes__content'>
                <input 
                    type="text" 
                    name="title" 
                    id="" 
                    placeholder='Some awesome title' 
                    className='notes__title-input'
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={title}
                />
                <textarea 
                    placeholder='What happened today?' 
                    className='notes__textarea'
                    onChange={handleInputChange}
                    value={body}
                    name='body'
                ></textarea>

                {   

                    (note.url)&&
                    
                    <div className='notes__image'>
                    <img 
                    src={note.url} 
                    alt="...img" />
                    </div>
                }
            </div>

            <button 
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
