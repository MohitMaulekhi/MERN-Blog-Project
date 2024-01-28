/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark} from '@fortawesome/free-solid-svg-icons'

function Container(props) {
  return (
    <div className="w-[70vw] self-center mt-[10vh] border-4 px-[5vw] py-[5vh] border-black rounded-lg h-[60vh] ">
          <div className=""><Link to={"/user"}><FontAwesomeIcon icon={faXmark} /></Link></div> 
          {props.type}  
    </div>
  )
}

export default Container