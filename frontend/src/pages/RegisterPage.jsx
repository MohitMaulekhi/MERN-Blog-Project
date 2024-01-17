/* eslint-disable no-useless-escape */
import { Button } from "../componenets/index.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faAt, faLock, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar' 


function RegisterPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const [progress, setProgress] = useState(0)
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    console.log(event.target.files[0], "hello")
    setImage(event.target.files[0])
  }


  const [fullName, setfullName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  function ValidateEmail() {
    const mailformat = /^[a-z_\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-z\-0-9]+(.com)$/i;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }
  async function registerUser(e) {
    e.preventDefault()
    if (!fullName || !userName || !email || !password) { toast.warn("Please fill all the details") }

    else if (!ValidateEmail() && !(email.toLowerCase === email)) {
      toast.warn("You have entered an invalid email address format!");
    }

    else {
      const formData = new FormData();
      if (image) { formData.append("avatar", image); }
      setProgress(progress + 20)
      formData.append("username", userName)
      formData.append("email", email)
      formData.append("fullName", fullName)
      formData.append("password", password)
      setProgress(progress + 20)
      await axios
      .post('/api/v1/user/register', formData)
      .then((response) => {
        toast.success(response.data.message)
        setProgress(100)
        navigate("/Login")
      })
      .catch((error) => {


        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if(error.response.status == 409){
            toast.error("User with email or username already exists")
          }
          else if(error.response.status == 500){
            toast.error("Error while registering User")
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
      <div className=" max-h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div className="w-[15vw]"><img src="..\src\assests\Logo.svg" alt="none" /></div>



        <div className="m-[3%] w-[15%]" onClick={handleClick} >
          <button><div className=' h-[15vh] w-[15vh] rounded-full bg-cover hover:opacity-50' style={image?{backgroundImage:`url(${URL.createObjectURL(image)})`}:{backgroundImage:`url(../src/assests/Default_profile.jpg)`}}>

          </div>
            <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg image/webp" /></button>
        </div>



        <form>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faAt} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={fullName} placeholder="FullName" onChange={e => setfullName(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faUser} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={userName} placeholder="UserName" onChange={e => setUserName(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faEnvelope} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" autoComplete="on" /></span></div>
        </form>
        <div className="m-[2%] cursor-pointer" onClick={registerUser} ><Button type="Register" /></div>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default RegisterPage