import {GET_NOTES,DELETE_NOTE,POST_NOTE} from '../actions/types'

const initialState={
    notes:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_NOTES:
            localStorage.setItem('notes',action.payload)
            return {
                ...state,
                notes:action.payload
            }
        case DELETE_NOTE:
            return{
                ...state,
                notes:state.notes.filter(note=>note.id !== action.payload)
            }
        case POST_NOTE:
            return{
                ...state,
                notes:[...state.notes,action.payload]
            }
        default:
            return state;
    }
}