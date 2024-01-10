/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
// " bg-mainBlue"
// ` font-semibold text-center h-full  ${isActive ? "text-black" : "text-white bg-mainBlue"
function AuthButton(props) {
  return (

    <NavLink to={`/${props.type}`}>
      {({ isActive }) => (
        <button className={`h-10 max-w-26 m-4 p-8 border-stone-950  flex justify-center items-center  text-xl  ${isActive?"text-black bg-slate-400 rounded-l-[30%]":`text-white bg-mainBlue rounded-${props.borderCurve}-[30%]`}`}>
          {props.type}
        </button>
      )}
    </NavLink>

  )
}

export default AuthButton