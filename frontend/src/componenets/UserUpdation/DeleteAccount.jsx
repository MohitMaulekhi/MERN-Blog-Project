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
import {logOut } from "../../store/authSlice.js"

function DeleteAccount() {
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [progress,setProgress] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDeleteUser = async (e)=>{
    e.preventDefault()
    if (!password1 || !password2) { toast.warn("Please fill all the details") }

    else if (password1 !== password2) {
      toast.warn("Please enter same password in both new paassword fields");
    }

    else {
    
      if(confirm("Do you want to delete your account?") == true){
        setProgress(progress + 20)
        await axios
        .post('/api/v1/user/delete', {password:password1})
        .then((response) => {
          toast.success(response.data.message)
          setTimeout(() => {
            dispatch(logOut())
            axios.get('/api/v1/user/logout')
            .finally(navigate('/Login'))
          }, 2000);
          
          
          
        })
        .catch((error) => {


          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status == 400){
              toast.error("Invalid Password")
            }
            else if(error.response.status == 500){
              toast.error("Error while deleting User")
            }
          }
          else{
            toast.error("Something went Wrong")
          }


        }).finally(setProgress(100))
      }
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
          
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={password1} placeholder="Password" onChange={e => setPassword1(e.target.value)} type="password" /></span></div>
          <div className="my-[2.5%]"><span className="mx-2"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-4 border-black"><input className="focus:outline-none" value={password2} placeholder="Password" onChange={e => setPassword2(e.target.value)} type="password" /></span></div>
          <div className="w-[15vw] flex items-center justify-center text-[5vh]" onClick={handleDeleteUser} ><FunctionBTN type = "Delete Account" color="black" txtColor="white"  /></div>
        </form>       
        </div>
        <ToastContainer/>
    </div>
  )
}

export default DeleteAccount