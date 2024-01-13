import { AuthButton } from "../index.js"
import { useState } from "react"


function AuthSidebar() {
  const [active1,setActive1] = useState(true)
  const [active2,setActive2] = useState(false)
  return (
    <div className="h-[95vh] w-[15vw] m-0 p-0 ">
      <div className={`${active1?`rounded-br-3xl`:`rounded-br-none`} h-[30vh] w-[15vw] bg-mainBlue m-0 p-0`}></div>
        <div className="flex w-[15vw]">
          <div className=" bg-mainBlue float-left w-[10vw]"></div>
          <div className="flex flex-col z-10">
            <div className="float-right" onClick={()=>{setActive1(true);setActive2(false)}}><AuthButton type="Login" borderCurve="br" /></div>
            <div className="float-right" onClick={()=>{setActive2(true);setActive1(false)}}><AuthButton type="Register" borderCurve="tr" /></div>
          </div>
        </div>
        <div className={`${active2?`rounded-tr-3xl`:`rounded-tr-none`} h-[45vh] w-[15vw] bg-mainBlue`}></div>
    </div>
  )
}

export default AuthSidebar