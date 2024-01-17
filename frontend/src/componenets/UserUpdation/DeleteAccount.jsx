import { Link } from "react-router-dom"

function DeleteAccount() {
  return (
    <div className="min-h-screen min-w-[87.2vw] right-0 absolute flex items-center justify-center">
        
        <div className="bg-slate-50 h-[50vh] w-[70vw] rounded-lg border-black border-2 font-extrabold font-mono"><div className="float-right p-[2vh]"><Link to={"/user"}>X</Link></div></div>
    </div>
  )
}

export default DeleteAccount