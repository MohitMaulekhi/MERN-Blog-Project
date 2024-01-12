import {Button} from "../componenets/index.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-[85vw] h-[95vh] ">
      <img src="..\src\assests\Logo.png" alt="none" className="h-[20vh] w-[15vw]" />
      <div className="bg-slate-600 h-[55vh] w-[65vw] flex flex-col justify-center items-center">
        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus quo, at distinctio illo reiciendis nemo!</div>
          <div className="relative top-[20vh]" ><Button type="Login" /></div>
      </div>
    </div>
  )
}

export default LoginPage