import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGOUT, AUTH_SIGNIN_SUCCESS, AUTH_SIGNUP_SUCCESS } from "./auth.types";
import jwt from 'jwt-decode';



// let Phoenix= JSON.parse(localStorage.getItem('userdata'))||{
//     AccessToken:"",
//     RefreshToken:"",
//     userType:"",
//     name:"",
//     email:"" ,
//     _id:""   
// }
let Phoenix ={
    AccessToken:"",
    userType:"",
    name:"",
    email:"" ,
    _id:""   
}
// if(Phoenix.AccessToken!==""){
    
//     const Decoded_Email = jwt(Phoenix.AccessToken) || "";
    
//     if(Decoded_Email){
//         Phoenix.email = Decoded_Email.email
//     }
// }

// if(!Phoenix.AccessToken){
//         let refreshData=fetch('https://localhost:3000/api/authloginverification',{
//             method:'POST',
//             headers:{access_token:Phoenix.AccessToken,refresh_token:Phoenix.RefreshToken}
            
//         }).then((e)=>e.json()).then((e)=>Phoenix.AccessToken=e.AccessToken).catch((error)=>
//         Phoenix.RefreshToken="",
//         Phoenix.AccessToken="",
//         Phoenix.userType="",
//         Phoenix.name="",
//         Phoenix.email="",
//         Phoenix._id=""
//         )

    //}

let initState = {
    loading: false,
    error: false,
    token:"",
    isAuth: false,
    
    data:"",
    email :"",
    id:""
}



export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case AUTH_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case AUTH_SIGNIN_SUCCESS: {
            let decoded= jwt(action.token.AccessToken);
            return {
                ...state,
                loading: false,
                error: false,
                token: action.token.AccessToken,
                isAuth: true,
                data: action.token,
                email:decoded.email
            }
        }
        case AUTH_SIGNUP_SUCCESS:{
            return {
                ...state,
                id:action.id
            }
        }
        case AUTH_LOGOUT: {
            return {
                ...state,
                loading: false,
                error: false,
                isAuth: false,
                token: "",
                data: "",
                email:""
            }
        }

        default: {
            return state;
        }
    }
}