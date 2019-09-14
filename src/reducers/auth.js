import {USER_LOADED,USER_LOADING,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS,AUTH_ERROR,REGISTRATION_FAIL,REGISTRATION_SUCCESS} from '../actions/types'
const initialState={
    isAuthenticated:false,
    token:localStorage.getItem('token'),
    isLoading:false,
    user:null,
}
export default function(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTRATION_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                isLoading:true,
                isAuthenticated:false,
                user:null,
                token:null
            }
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
            localStorage.setItem('token',action.payload.key)
            return{
                ...state,
                user:action.payload.user,
                isLoading:false,
                isAuthenticated:true,
            }

        default:
            return state
    }
}