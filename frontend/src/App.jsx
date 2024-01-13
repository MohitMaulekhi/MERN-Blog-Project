import { useEffect, useState } from "react"
import {Footer } from "./componenets/index.js"
import {useDispatch} from 'react-redux'
import axios from "axios"
import {login,logOut} from "./store/authSlice.js"
import {Outlet,useNavigate} from "react-router-dom"
import {AuthSidebar} from "./componenets/index.js"

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
      axios.get('/api/v1/user/current')
      .then((userData)=>{
        if(userData){
          dispatch(login(({userData})))
          return null
        }
        else{
          dispatch(logOut())
          navigate("/Login")
        }
      })
      .catch(()=>{
        navigate("/Login")
      })
      .finally(setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return !loading?(
    <>
    <div className="flex">
      <AuthSidebar/>
      <Outlet/>
      
    </div>
    <Footer/></>
  ):null
}

export default App
