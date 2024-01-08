import { useEffect, useState } from "react"
import { Header,Footer } from "./componenets/index.js"
import {useDispatch} from 'react-redux'
import axios from "axios"
 import {login,logOut} from "./store/authSlice.js"

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
  },[])
  
  return !loading?(
    <>
      <Header/>
      <Footer/>
    </>
  ):null
}

export default App
