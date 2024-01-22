import { useEffect, useState } from "react"
import {useDispatch} from 'react-redux'
import {Outlet,useNavigate} from "react-router-dom"
import {AuthSidebar} from "./componenets/index.js"
import {Footer} from "../src/componenets/index.js"
import  getUser  from "./utils/get.js"

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    getUser(dispatch,navigate)
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return !loading?(
    <>
    <div className="flex">
      <AuthSidebar/>
      <Outlet/>
      
    </div>
    <Footer/>
    </>
  ):null
}

export default App
