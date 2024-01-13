import {Button} from "../componenets/index.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  return (
    <div className="flex flex-col justify-center items-center w-[85vw] h-[90vh]">
      <div className=" h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div className="h-[15vh] w-[15vw]"><img src="..\src\assests\Logo.svg" alt="none" /></div>

        <form className="my-[10vh]">
          <div className="my-[10%] "><span className="mx-3"><FontAwesomeIcon icon={faEnvelope} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" /></span></div>
          <div className="my-[5%] "><span className="mx-3"><FontAwesomeIcon icon={faLock} /></span><span className="border-b-[0.5vh] border-black"><input className="focus:outline-none" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="text" /></span></div>
        </form>
        <div className="m-[5%]" ><Button type="Register" /></div>
      </div>
    </div>
  )
}

export default LoginPage