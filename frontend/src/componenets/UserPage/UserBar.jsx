import { FunctionBTN} from '../index.js'
import {Link,useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { logOut } from "../../store/authSlice.js"
function UserBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = ()=>{
        axios.get('/api/v1/user/logout',{
          withCredentials:true,
        })
        .then(()=>{
          toast.success("User logged out success fully")
          setTimeout(() => {
            dispatch(logOut())
            navigate("/login")
          }, 1000);
          
        })
        .catch(()=>{
          toast.error("Something Went wrong")
        })
      }
  return (
    <div><div className='flex'>
    <div className='bg-mainBlue min-h-full md:w-[10vw] w-[15vw] scale-x-115 h-[85vh] rounded-br-[15vh]'>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-[10vh]'></div>
        <Link className='my-[1vh]' to={`/user/updateAvatar`}><FunctionBTN type="Update Avatar" color="white" txtColor="black" width = "10vw" /></Link>
        <Link className='my-[1vh]' to={`/user/updateDetails`}><FunctionBTN type="Update Details" color="white" txtColor="black" width = "10vw" /></Link>
        <Link className='my-[1vh]' to={`/user/changePassword`}><FunctionBTN type="Change Password" color="white" txtColor="black" width = "10vw" /></Link>
        <div className='mt-[15vh]' onClick = {handleLogOut} ><FunctionBTN type=" Logout" color="black" txtColor="white" width = "10vw" /></div>
        <Link className='my-[1vh]' to={`/user/deleteAccount`}><FunctionBTN type="Delete Account" color="black" txtColor="white" width = "10vw" /></Link>
      </div>
    </div>
    <div className='bg-mainBlue'><div className='bg-white w-[5vw] lg:w-[7.5vw] h-[100%] rounded-tl-[50vh]'></div></div>
  </div><ToastContainer/></div>
  )
}

export default UserBar