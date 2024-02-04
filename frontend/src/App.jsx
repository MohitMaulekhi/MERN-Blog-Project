import { useEffect, useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import {Outlet,useNavigate} from "react-router-dom"
import {AuthSidebar} from "./componenets/index.js"
import {Footer} from "../src/componenets/index.js"
import  getUser  from "./utils/get.js"

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let counter = useSelector(state => state.authSlice.userData)
  useEffect(()=>{
    
    getUser(dispatch,navigate)
    if(counter){
      navigate("/user")
    }
    else{
      navigate("/login")
    }
    
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  


  return !loading?(
    <>
    <div className="grid grid-cols-7 ">
      <div className="col-span-2"><AuthSidebar/></div>
      <div className="col-span-4"><Outlet/></div>
      <div className="col-span-7"><Footer/></div>
    </div>
    
    </>
  ):null
}

export default App
