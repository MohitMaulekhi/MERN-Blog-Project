/* eslint-disable no-useless-escape */
import {Button} from "../componenets/index.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import {useNavigate} from "react-router-dom"

function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  function ValidateEmail() {
    const mailformat = /^[a-z_\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-z\-0-9]+(.com)$/i;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  async function LoginUser(){
    if(!email || !password){
      toast.warn("Please fill all the details")
    }
    else if (!ValidateEmail() && !(email.toLowerCase == email)) {
      toast.warn("You have entered an invalid email address format!");
    }
    else{
      setProgress(progress+20)
      await axios.post("/api/v1/user/login",{email,password})
      .then((response) => {
        toast.success(response.data.message)
        setProgress(progress+20)
        navigate("/user")
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
        
        
      
      })
      .catch((error)=>{
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if(error.response.status == 404){
            toast.error("Invalid Email")
          }
          else if(error.response.status == 405){
            toast.error("Invalid Password")
          }
        }
        else{
          toast.error("Something went Wrong")
        }
      }).finally(setProgress(100))
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[85vw] h-[90vh]">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer/>
      <div className=" h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div className="h-[15vh] w-[15vw]"><img src="..\src\assests\Logo.svg" alt="none" /></div>

        <form className="my-[10vh]">
          <div className="my-[10%] "><span className="mx-3"><FontAwesomeIcon icon={faEnvelope} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></span></div>
          <div className="my-[5%] "><span className="mx-3"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" autoComplete="on" /></span></div>
        </form>
        <div className="m-[5%] cursor-pointer" onClick={LoginUser} ><Button type="Login" /></div>
      </div>
    </div>
  )
}

export default LoginPage