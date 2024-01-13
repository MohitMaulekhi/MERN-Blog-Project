import { Button } from "../componenets/index.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faAt, faLock, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react"


function RegisterPage() {
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    console.log(event.target.files[0], "hello")
    setImage(event.target.files[0])
  }

  const [FullName,setFullName] = useState("")
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return (
    <div className="flex flex-col justify-center items-center w-[85vw] h-[90vh]">
      <div className=" h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div className="h-[15vh] w-[15vw]"><img src="..\src\assests\Logo.svg" alt="none" /></div>



        <div className="w-[7.5vw] m-[3%]" onClick={handleClick} >
          <button>{!image ? <img src="..\src\assests\Default_profile.jpg" className="rounded-full " alt="none" /> :
            <img src={URL.createObjectURL(image)} className="rounded-full" alt="none" />}
            <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} /></button>
        </div>



        <form className="">
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faAt} /></span><span className="border-b-[0.5vh] border-black"><input  className="focus:outline-none" value={FullName} placeholder="FullName" onChange={e => setFullName(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faUser} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={userName} placeholder="UserName" onChange={e => setUserName(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faEnvelope} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" /></span></div>
          <div className="my-[2.5%]"><span className="mx-3"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="text" /></span></div>
        </form>
        <div className="m-[2%]" ><Button type="Login" /></div>
      </div>
    </div>
  )
}

export default RegisterPage