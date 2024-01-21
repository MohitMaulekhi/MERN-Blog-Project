/* eslint-disable no-useless-escape */
import { Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FunctionBTN} from "../index.js"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
import {useDispatch} from "react-redux"
import { login, logOut } from "../../store/authSlice.js"

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
      .patch('/api/v1/user/update/password', {oldPassword,newPassword:newPassword1})
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
    <div className="min-h-screen min-w-[87.2vw] right-0 absolute flex items-center justify-center">
        <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <div className="bg-slate-50 h-[60vh] w-[55vw] rounded-lg border-black border-2 font-extrabold font-mono">
          <div className="float-right p-[0.5vh]"><Link to={"/user"}>X</Link></div>
        <form className="flex flex-col justify-center items-center [30vh] w-[55vw] ">
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={oldPassword} placeholder="Old Password" onChange={e => setOldPassword(e.target.value)} type="password" /></span></div>
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={newPassword1} placeholder="New Password" onChange={e => setNewPassword1(e.target.value)} type="password" /></span></div>
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={newPassword2} placeholder="New Password" onChange={e => setNewPassword2(e.target.value)} type="password" /></span></div>
          <div className="w-[15vw] flex items-center justify-center text-[5vh]" onClick={handleChangePassword} ><FunctionBTN type = " Change Password " color="black" txtColor="white"  /></div>
        </form>       
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ChangePassword