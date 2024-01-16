import {Footer } from "./componenets/index.js"
import axios from "axios"
import {Outlet,useNavigate} from "react-router-dom"
import MainPage from "./pages/MainPage.jsx"
import { useEffect,} from "react"
import {useDispatch,useSelector } from 'react-redux'
import {login,logOut} from "./store/authSlice.js"


function Blog() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const counter = (useSelector(state => state.authSlice.userData))
  if(counter == null){
    navigate("/Login")
  }
  useEffect(()=>{
      axios.get('/api/v1/user/current')
      .then((userData)=>{
        if(userData){

          dispatch(login({userData:userData.data}))
          navigate("/user")
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
      .finally()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <>
    <div  className="flex flex-col min-h-screen">
      <Outlet/>
      <MainPage/>
      <Footer/>
    </div>
    
    </>)
}

export default Blog