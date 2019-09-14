import axios from 'axios'
import {USER_LOADING,USER_LOADED,LOGIN_SUCCESS,AUTH_ERROR,LOGOUT_SUCCESS, LOGIN_FAIL,REGISTRATION_FAIL,REGISTRATION_SUCCESS} from './types'

export const loaduser=()=>(dispatch,getState)=>{
    console.log("ghus gaye isme")
    dispatch({
        type:USER_LOADING
    })
    const token=getState().auth.token
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.get("http://localhost:8000/rest-auth/user/",config)
    .then(res=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    })
    .catch(err=>{
        console.log(err)
        dispatch({
            type:AUTH_ERROR
        })
    })
}
export const login=(username,password)=>dispatch=>{
    console.log("login wala")
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({username,password})
    axios.post("http://localhost:8000/rest-auth/login/",body,config)
    .then(res=>{
        console.log(res.data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    })
    .catch(err=>{
        alert(err.data)
        dispatch({
            type:LOGIN_FAIL,
        })
    })
}
export const logout=()=>(dispatch,getState)=>{
    console.log("log out ho gaye hai")
    const token=getState().auth.token
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["Authorization"]=`Token ${token}`
    }
    axios.post("http://localhost:8000/rest-auth/logout/",null,config)
    .then(res=>{
        dispatch({
            type:LOGOUT_SUCCESS
        })
    })
    .catch(err=>{
        dispatch({
            type:LOGIN_FAIL
        })
    })
}
export const register=(username,email,password1,password2)=>dispatch=>{
    console.log("login wala")
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({username,email,password1,password2})
    axios.post("http://localhost:8000/rest-auth/registration/",body,config)
    .then(res=>{
        console.log(res.data)
        dispatch({
            type:REGISTRATION_SUCCESS,
            payload:res.data
        })
    })
    .catch(err=>{
        alert(err.data)
        dispatch({
            type:REGISTRATION_FAIL,
        })
    })
}
