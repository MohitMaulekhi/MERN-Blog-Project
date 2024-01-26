import { FunctionBTN} from '../index.js'
import {Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
function UserBar() {
    const navigate = useNavigate()
    const handleLogOut = ()=>{
        axios.get('/api/v1/user/logout')
        .then(()=>{
          toast.success("User logged out success fully")
          setTimeout(() => {
            navigate("/login")
          }, 1000);
          
        })
        .catch(()=>{
          toast.error("Something Went wrong")
        })
      }
  return (
    <div><div className='flex'>
    <div className='bg-mainBlue min-h-full scale-x-115 w-[15vw] h-[85.2vh] rounded-br-[15vh]'>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-[10vh]'></div>
        <Link to={`/user/updateAvatar`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Avatar" color="white" txtColor="black" /></div></Link>
        <Link to={`/user/updateDetails`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Details" color="white" txtColor="black" /></div></Link>
        <Link to={`/user/changePassword`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Change Password" color="white" txtColor="black" /></div></Link>
        <div className='h-[7.5vh]'></div>
        <div className='my-[1.5vh] w-[14vw] cursor-pointer' onClick={handleLogOut}><FunctionBTN type=" Logout" color="black" txtColor="white" /></div>
        <Link to={`/user/deleteAccount`}><div className='my-[1.5vh] w-[14vw] cursor-pointer' ><FunctionBTN type="Delete Account" color="black" txtColor="white" /></div></Link>
      </div>
    </div>
    <div className='bg-mainBlue'><div className='bg-white w-[7.5vw] h-[100%] rounded-tl-[50vh]'></div></div>
  </div><ToastContainer/></div>
  )
}

export default UserBar