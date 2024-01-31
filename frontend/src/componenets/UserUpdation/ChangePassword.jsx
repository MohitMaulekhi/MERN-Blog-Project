/* eslint-disable no-useless-escape */
import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FunctionBTN} from "../index.js"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
import {useDispatch} from "react-redux"
import getUser from "../../utils/get.js"
import Container from "./Container.jsx"

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword1, setNewPassword1] = useState("")
  const [newPassword2, setNewPassword2] = useState("")
  const [progress,setProgress] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChangePassword = async (e)=>{
    e.preventDefault()
    if (!oldPassword || !newPassword1 || !newPassword2) { toast.warn("Please fill all the details") }

    else if (newPassword1 !== newPassword2) {
      toast.warn("Please enter same password in both new paassword fields");
    }

    else {
      
      setProgress(progress + 20)
      await axios
      .patch('/api/v1/user/update/password', {oldPassword,newPassword:newPassword1},{withCredentials:true})
      .then((response) => {
        toast.success(response.data.message)
        getUser(dispatch,navigate)
        
      })
      .catch((error) => {


        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if(error.response.status == 400){
            toast.error("Invalid Old Password")
          }
          else if(error.response.status == 500){
            toast.error("Error while updating password")
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
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw]" value={oldPassword} placeholder="Old Password" onChange={e => setOldPassword(e.target.value)} type="password" /></div>
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw]" value={newPassword1} placeholder="New Password" onChange={e => setNewPassword1(e.target.value)} type="password" /></div>
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw]" value={newPassword2} placeholder="New Password" onChange={e => setNewPassword2(e.target.value)} type="password" /></div>
          <div className="mt-[7vh]" onClick={handleChangePassword} ><FunctionBTN type = " Change Password " color="black" txtColor="white"  /></div>
        </form>       
        }/>
        <ToastContainer/>
    </>
  )
}

export default ChangePassword