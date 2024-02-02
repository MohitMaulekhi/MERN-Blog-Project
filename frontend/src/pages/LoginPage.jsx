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
      await axios.post("/api/v1/user/login",{email,password},{
        withCredentials:true,
      })
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
          else{
            toast.error("Invalid User")
          }
        }
        else{
          toast.error("Something went Wrong")
        }
      }).finally(setProgress(100))
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer/>
      <div className=" h-[40vh] flex flex-col justify-center items-center">
        <div className="h-[25vh] w-[25vh] max-w-[30vw]"><img src="https://res.cloudinary.com/mohitproject/image/upload/v1706437261/Assets/zkqxpwoigmgnp6xzjwpm.svg" alt="none" /></div>

        <form className="my-[5vh]">
          <div className="my-[4vh] max-w-72 w-[40vw]"><FontAwesomeIcon icon={faEnvelope} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></div>
          <div className="my-[4vh] max-w-72 w-[40vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" autoComplete="on" /></div>
        </form>
        <div className="my-[1vh] cursor-pointer" onClick={LoginUser} ><Button type="Login" /></div>
      </div>
    </div>
  )
}

export default LoginPage