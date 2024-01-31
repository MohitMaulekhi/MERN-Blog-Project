/* eslint-disable no-useless-escape */
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import {FunctionBTN} from "../index.js"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
import {useDispatch} from "react-redux"
import  getUser  from "../../utils/get.js"
import Container from "./Container.jsx"

function UpdateDetails() {
  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [progress,setProgress] = useState(0)
  const dispatch = useDispatch()
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
  const handleDetailsChange = async (e)=>{
    e.preventDefault()
    if (!fullName || !email) { toast.warn("Please fill all the details") }

    else if (!ValidateEmail() && !(email.toLowerCase === email)) {
      toast.warn("You have entered an invalid email address format!");
    }

    else {
      
      setProgress(progress + 20)
      await axios
      .patch('/api/v1/user/update/details', {email,fullName},{withCredentials:true})
      .then((response) => {
        toast.success(response.data.message)
        getUser(dispatch,navigate)
        
      })
      .catch((error) => {


        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if(error.response.status == 409){
            toast.error("User with email already exists")
          }
          else if(error.response.status == 500){
            toast.error("Error while updating User")
          }
        }
        else{
          toast.error("Something went Wrong")
        }


      }).finally(setProgress(100))
    }
    
  }

  return (
    <>
        <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Container type = {
        <form className="flex flex-col justify-center items-center">
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faUser} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw] " value={fullName} placeholder="FullName" onChange={e => setfullName(e.target.value)} type="text" /></div>
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faEnvelope} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw]  " value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></div>
          <div className="mt-[7vh]" onClick={handleDetailsChange} ><FunctionBTN type = " Update " color="black" txtColor="white" width = "15vw"  /></div>
        </form>
        }/>
        <ToastContainer/>
    </>
  )
}

export default UpdateDetails