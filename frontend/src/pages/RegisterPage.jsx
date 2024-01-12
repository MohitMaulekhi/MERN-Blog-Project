import {Button} from "../componenets/index.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,faEnvelope,faAt} from '@fortawesome/free-solid-svg-icons'
function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center w-[85vw] h-[95vh] ">
      <img src="..\src\assests\Logo.png" alt="none" className="h-[20vh] w-[15vw]" />
      <div className="bg-slate-600 h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div>
        <div><FontAwesomeIcon icon={faAt} /></div>
        <div><FontAwesomeIcon icon={faUser} /></div>
        <div><FontAwesomeIcon icon={faUser} /></div>
        <div><FontAwesomeIcon icon={faUser} /></div>
        <div><FontAwesomeIcon icon={faUser} /></div>
        </div>
        <div className="relative top-[15vh]" ><Button type="Register" /></div>
      </div>
    </div>
  )
}

export default RegisterPage