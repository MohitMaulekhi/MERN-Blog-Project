/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"

function AuthButton(props) {
  return (
    <div className=" m-0 p-0 half">
    <NavLink to={`/${props.type}`}>
      {({ isActive}) => {
        return <button
          className={`w-[12vw] lg:h-[10vh]  text-[2vw] m-0 p-2 font-semibold ${isActive?`bg-white scale-y-[1.1]  rounded-l-full`:`bg-mainBlue text-white rounded-${props.borderCurve}-3xl`}` }>
          {props.type}
        </button>}
      }
    </NavLink> 
    </div>

  )
}

export default AuthButton