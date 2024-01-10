import { useEffect, useState } from "react"
import { Header,Footer } from "./componenets/index.js"
import {useDispatch} from 'react-redux'
import axios from "axios"
import {login,logOut} from "./store/authSlice.js"
import {Outlet} from "react-router-dom"
import {AuthSidebar} from "./componenets/index.js"


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
      axios.get('/api/v1/user/current')
      .then((userData)=>{
        if(userData){
          dispatch(login(({userData})))
        }
        else{
          dispatch(logOut())
        }
      })
      .finally(setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return !loading?(
    <>
      <AuthSidebar/>
      <Outlet/>
      <Footer/>
    </>
  ):null
}

export default App
