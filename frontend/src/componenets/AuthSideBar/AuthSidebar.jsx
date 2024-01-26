import { AuthButton } from "../index.js"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';

function AuthSidebar() {
  let location = useLocation();
  const [active1, setActive1] = useState(true)
  const [active2, setActive2] = useState(false)
  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname == "/login" || location.pathname == "/") {
      setActive1(true)
      setActive2(false)
    }
    else if (location.pathname == "/register") {
      setActive1(false)
      setActive2(true)
    }
  }, [location])

  return (
    <div className="w-[15vw] half2 h-[97vh] m-0 p-0 ">
      <div className=""></div><div className={`${active1 ? `rounded-br-3xl` : `rounded-br-none scale-y-[1.06] `} h-[30vh] w-[15vw] m-0 bg-mainBlue p-0`}></div>
      <div className="flex">
        <div className="  float-left w-[10vw] bg-mainBlue"></div>
        <div className="flex flex-col">
          <AuthButton type="Login" path="login" borderCurve="br" />
          <AuthButton type="Register" path="register" borderCurve="tr" />
        </div>
      </div>

      <div className="bg-white"><div className={`${active2 ? `rounded-tr-3xl` : `rounded-tr-none`} h-[15vh]  max-h-screen w-[15vw] bg-mainBlue`}></div></div>
    </div>
  )
}

export default AuthSidebar