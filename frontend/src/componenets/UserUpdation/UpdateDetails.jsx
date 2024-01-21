/* eslint-disable no-useless-escape */
import { Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import {FunctionBTN} from "../index.js"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
import {useDispatch} from "react-redux"
import { login, logOut } from "../../store/authSlice.js"

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
      .patch('/api/v1/user/update/details', {email,fullName})
      .then((response) => {
        toast.success(response.data.message)
        axios.get('/api/v1/user/current')
        .then((userData)=>{
          if (userData) {
      
            dispatch(login({ userData: userData.data }))
          }
          else {
            dispatch(logOut())
            navigate("/Login")
          }
        })
        .catch(() => {
          navigate("/Login")})
        
      })
      .catch((error) => {


        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if(error.response.status == 409){
            toast.error("User with email exists")
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
    <div className="min-h-screen min-w-[87.2vw] right-0 absolute flex items-center justify-center">
        <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <div className="bg-slate-50 h-[60vh] w-[55vw] rounded-lg border-black border-2 font-extrabold font-mono">
          <div className="float-right p-[2vh]"><Link to={"/user"}>X</Link></div>
        <form className="flex flex-col justify-center items-center [40vh] w-[55vw] ">
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faUser} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={fullName} placeholder="FullName" onChange={e => setfullName(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faEnvelope} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></span></div>
          <div className=" w-[10vw] flex items-center justify-center text-[5vh]" onClick={handleDetailsChange} ><FunctionBTN type = " Update " color="black" txtColor="white"  /></div>
        </form>       
        </div>
        <ToastContainer/>
    </div>
  )
}

export default UpdateDetails