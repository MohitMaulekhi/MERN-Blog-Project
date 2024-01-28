/* eslint-disable no-useless-escape */
import { Button } from "../componenets/index.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faAt, faLock, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
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
          navigate("/login")
        })
        .catch((error) => {


          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 409) {
              toast.error("User with email or username already exists")
            }
            else if (error.response.status == 500) {
              toast.error("Error while registering User")
            }
          }
          else {
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
      <div className=" max-h-[55vh] flex flex-col justify-center items-center">
        <div className="w-[25vh] max-w-[30vw]"><img src="..\src\assests\Logo.svg" alt="none" /></div>



        <div className="" onClick={handleClick} >
          <div className=' h-[20vh] w-[20vh] rounded-full bg-cover hover:opacity-50' style={image ? { backgroundImage: `url(${URL.createObjectURL(image)})` } : { backgroundImage: `url(../src/assests/Default_profile.jpg)` }}>

          </div>
          <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg image/webp" />
        </div>



        <form>
          <div className="my-[1.5vh] w-[40vw] max-w-72"><FontAwesomeIcon icon={faUser} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={fullName} placeholder="FullName" onChange={e => setfullName(e.target.value)} type="text" /></div>
          <div className="my-[1.5vh] w-[40vw] max-w-72"><FontAwesomeIcon icon={faAt} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={userName} placeholder="UserName" onChange={e => setUserName(e.target.value)} type="text" /></div>
          <div className="my-[1.5vh] w-[40vw] max-w-72"><FontAwesomeIcon icon={faEnvelope} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="email" /></div>
          <div className="my-[2.5%] w-[40vw] max-w-72"><FontAwesomeIcon icon={faLock} /><input className="focus:outline-none border-b-2 ml-[1.5vw] border-black w-[30vw] max-w-60" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" autoComplete="on" /></div>
        </form>
        <div className="my-[10%] cursor-pointer" onClick={registerUser} ><Button type="Register" /></div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default RegisterPage