import {GET_NOTES,POST_NOTE,DELETE_NOTE} from './types'
import axios from 'axios'

export const get_notes=()=>(dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.get('http://localhost:8000/notes',config)
    .then(res=>{
        dispatch({
            type:GET_NOTES,
            payload:res.data
        })
        console.log(res.data)
    })
}
export const delete_notes=(id)=>(dispatch,getState)=>{
    const token=getState().auth.token
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.delete(`http://localhost:8000/notes/${id}/`,config)
    .then(res=>{
        dispatch({
            type:DELETE_NOTE,
            payload:id
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export const add_note=(title,body)=>(dispatch,getState)=>{
    const token=getState().auth.token
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    const body=JSON.stringify({title,body})
    axios.post(`http://localhost:8000/notes`,config)
    .then(res=>{
        dispatch({
            type:POST_NOTE,
            payload:res.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
