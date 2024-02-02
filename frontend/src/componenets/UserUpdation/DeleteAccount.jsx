/* eslint-disable no-useless-escape */
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import { toast,ToastContainer} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FunctionBTN} from "../index.js"
import axios from "axios"
import {useDispatch} from "react-redux"
import {logOut } from "../../store/authSlice.js"
import Container from "./Container.jsx"
import LoadingBar from 'react-top-loading-bar'

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
        .post('/api/v1/user/delete', {password:password1},{
          withCredentials:true,
        })
        .then((response) => {
          toast.success(response.data.message)
          setTimeout(() => {
            dispatch(logOut())
            axios.get('/api/v1/user/logout',{
              withCredentials:true,
            })
            
          }, 100);
          navigate('/Login')
          
          
        })
        .catch((error) => {

          console.log(error)
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
    <>
    <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <Container
      type = {<form className="flex flex-col justify-center items-center">
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw] " value={password1} placeholder="Password" onChange={e => setPassword1(e.target.value)} type="password" autoComplete="on" /></div>
          <div className="my-[2.5vh] w-[35vw]"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none ml-[1vw] border-b-2 border-black w-[25vw] " value={password2} placeholder="Password" onChange={e => setPassword2(e.target.value)} type="password" autoComplete="on"/></div>
          <div className="mt-[7vh]" onClick={handleDeleteUser} ><FunctionBTN  type = "Delete Account" color="black" txtColor="white"  /></div>
        </form>  }
    />
    <ToastContainer/>
    </>
  )
}

export default DeleteAccount