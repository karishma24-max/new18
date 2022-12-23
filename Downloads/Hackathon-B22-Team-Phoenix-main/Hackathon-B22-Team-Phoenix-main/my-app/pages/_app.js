import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContext from '../Context/AuthContext'
import { useState } from 'react'
import { Provider } from "react-redux";
import {store} from "../store/store"
export default function App({ Component, pageProps }) {
  const [token,setToken]= useState ()
  const [isAuth,setisAuth]=useState(false)
  const [usertype,setUsertype]= useState()
  const [userId,setuserId]= useState()
  return <ChakraProvider>
 
 <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </ChakraProvider>
}
