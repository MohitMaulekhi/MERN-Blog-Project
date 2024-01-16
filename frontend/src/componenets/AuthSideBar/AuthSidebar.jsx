import { AuthButton } from "../index.js"
import { useEffect, useState} from "react"
import { useLocation } from 'react-router-dom';

function AuthSidebar() {
  let location = useLocation();
  const [active1,setActive1] = useState(true)
  const [active2,setActive2] = useState(false)
  useEffect(()=>{
    if(location.pathname=="/Login"){
      setActive1(true)
      setActive2(false)
    }
    else if(location.pathname=="/Register"){
      setActive1(false)
      setActive2(true)
    }
  },[location])
  
  return (
    <div className="w-[15vw] half2 min-h-[96.5vh]  m-0 p-0 ">
      <div className=""></div><div className={`${active1?`rounded-br-3xl`:`rounded-br-none`} h-[30vh] w-[15vw] m-0 bg-mainBlue p-0`}></div>
        <div className="flex w-[15vw]">
          <div className="  float-left w-[10vw]  bg-mainBlue"></div>
          <div className="flex flex-col">
            <div className="float-right "><AuthButton type="Login" borderCurve="br" /></div>
            <div className="float-right" ><AuthButton type="Register" borderCurve="tr" /></div>
          </div>
        </div>

        <div className="bg-white"><div className={`${active2?`rounded-tr-3xl`:`rounded-tr-none`} h-[15vh]  max-h-screen w-[15vw] bg-mainBlue`}></div></div>
    </div>
  )
}

export default AuthSidebar