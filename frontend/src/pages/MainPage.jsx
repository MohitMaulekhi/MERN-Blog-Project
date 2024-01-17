import { useEffect,} from "react"
import {useDispatch,useSelector } from 'react-redux'
import {login,logOut} from "../store/authSlice.js"
import { FunctionBTN } from '../componenets/index.js'
import axios from "axios"
import {useNavigate} from "react-router-dom"

function MainPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
      axios.get('/api/v1/user/current')
      .then((userData)=>{
        if(userData){

          dispatch(login({userData:userData.data}))
          navigate("/user")
          return null
        }
        else{
          dispatch(logOut())
          navigate("/Login")
        }
      })
      .catch(()=>{
        navigate("/Login")
      })
      .finally()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const counter = (useSelector(state => state.authSlice.userData))
  const nameArray = counter?.data.fullName.split(" ")

  return (
    <div className="min-h-[96.5vh] min-w-full">
      <div className="min-w-full h-[10.5vh] min-h-7 bg-mainBlue flex justify-end">
        <div className=' flex flex-wrap-reverse'>
          <div className='self-center  font-bold font-sans text-[3vh] mx-[1vw] text-white'>Welcome <span className='text-white '>{counter?.data ? nameArray[0] : "user"}</span></div>
          <div className=' self-center h-[13vh] w-[13vh] bg-white rounded-full bg-cover' style={counter?.data.avatar ? { backgroundImage: `url(${counter.data.avatar})` } : { backgroundImage: `url(../src/assests/Default_profile.jpg)` }}></div>

        </div>

      </div>
      <div className='bg-mainBlue h-[1vh] min-w-full'><div className='bg-black h-[1vh] w-[77.5vw] float-right rounded-s-full'></div></div>
      <div className='flex'>
        <div className='flex'>
          <div className='bg-mainBlue scale-x-115 w-[15vw] min-h-[85.5vh] rounded-br-[15vh]'>
            <div className='flex flex-col justify-center items-center'>
              <div className='h-[10vh]'></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Avatar" color="white" txtColor="black"  /></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Details" color="white" txtColor="black" /></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Change Password" color="white" txtColor="black"/></div>
              <div className='h-[7.5vh]'></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type=" Logout" color="black" txtColor="white"  /></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Delete Account" color="black" txtColor="white"  /></div>
            </div>
          </div>
          <div className='bg-mainBlue'><div className='bg-white w-[7.5vw] h-[100%] rounded-tl-[50vh]'></div></div>
        </div>
        <div className=' w-[77.5vw] flex flex-col'>
          <ul className='flex justify-around'>
            <li>My Blogs</li>
            <li>Following</li>
            <li>Global</li>
          </ul>
        </div>

      </div>


    </div>
  )
}

export default MainPage