import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGOUT, AUTH_SIGNIN_SUCCESS ,AUTH_SIGNUP_SUCCESS} from "./auth.types";
import axios from 'axios';
const host = 'http://localhost:3000/api';
export const signinAPI = (data) => async (dispatch) => {
   
    dispatch({ type: AUTH_LOADING });
    try {
        let res = await axios.post(`${host}/authlogin`, data);
        dispatch({ type: AUTH_SIGNIN_SUCCESS, token: res.data});
        // console.log(res.data.AccessToken);
        localStorage.setItem('userdata',JSON.stringify(res.data));
        //console.log(

        return res.data;
    }
    //https://crimson-indri-sock.cyclic.app
    catch (e) {
        dispatch({ type: AUTH_ERROR })
        return e.response.data;
    }
}
export const signupAPI = (data) => async (dispatch) => {
    //console.log(data);
    //dispatch({ type: AUTH_LOADING });
    try {
        let res = await axios.post(`${host}/authsignup`, data);
        dispatch({ type: AUTH_SIGNUP_SUCCESS ,id:res.data.newUser._id});
        return res.data;
    }
    catch (e) {
        //dispatch({ type: AUTH_ERROR })
        return e.response.data;
    }
}
export const logoutAPI = () => {
    localStorage.removeItem("userdata")
    return {type:AUTH_LOGOUT}
}
