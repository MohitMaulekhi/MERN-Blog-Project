import { useEffect, useState, } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { login, logOut } from "../store/authSlice.js"
import { FunctionBTN } from '../componenets/index.js'
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar' 

function MainPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [MyBlogs,setMyBlogs] = useState(1)
  const [Following,setFollowing] = useState(0)
  const [Global,setGlobal] = useState(0)
  const [progress,setProgress] = useState(0)

  

  const clickedMyBlogs = ()=>{
    setMyBlogs(1)
    setFollowing(0)
    setGlobal(0)
  }
  
  const clickedFollowing = ()=>{
    setFollowing(1)
    setGlobal(0)
    setMyBlogs(0)
  }

  const clickedGlobal = ()=>{


    setFollowing(0)
    setGlobal(1)
    setMyBlogs(0)
  }

  const handleLogOut = ()=>{
    axios.get('/api/v1/user/logout')
    .then(()=>{
      toast.success("User Logged Out success fully")
      navigate("/login")
    })
    .catch(()=>{
      toast.error("Something Went wrong")
    })
  }


  useEffect(() => {
    axios.get('/api/v1/user/current')
      .then((userData) => {
        if (userData) {

          dispatch(login({ userData: userData.data }))
          navigate("/user")
          return null
        }
        else {
          dispatch(logOut())
          navigate("/Login")
        }
      })
      .catch(() => {
        navigate("/Login")
      })
      .finally()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let counter = (useSelector(state => state.authSlice.userData))
  
  const nameArray = counter?.data.fullName.split(" ")

  return (
    <div className="min-h-[96.5vh] min-w-full">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="min-w-full h-[10.5vh] min-h-7 bg-mainBlue flex justify-end">
        <div className=' flex flex-wrap-reverse'>
          <div className='self-center  font-bold font-sans text-[3vh] mx-[1vw] text-white'>Welcome <span className='text-white '>{counter?.data ? nameArray[0] : "user"}</span></div>
          <Link to={`/user/updateAvatar`}><div className='cursor-pointer self-center h-[13vh] w-[13vh] bg-white rounded-full bg-cover hover:opacity-65' style={counter?.data?.avatar ? { backgroundImage: `url(${counter.data.avatar})` } : { backgroundImage: `url(../src/assests/Default_profile.jpg)` }}></div></Link>
        </div>

      </div>
      <div className='bg-mainBlue h-[1vh] min-w-full'><div className='bg-black h-[1vh] w-[77.5vw] float-right rounded-s-full'></div></div>
      <div className='flex'>
        <div className='flex'>
          <div className='bg-mainBlue scale-x-115 w-[15vw] h-[85.2vh] rounded-br-[15vh]'>
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
        </div>
        <div className=' w-[77.5vw] flex flex-col'>
          <ul className='flex justify-around '>
            <li onClick={clickedMyBlogs} className={`cursor-pointer ${MyBlogs?"border-b-[0.5vh]":""} border-orange-500`}>My Blogs</li>
            <li onClick={clickedFollowing} className={`cursor-pointer ${Following?"border-b-[0.5vh]":""} border-orange-500`}>Following</li>
            <li onClick={clickedGlobal} className={`cursor-pointer ${Global?"border-b-[0.5vh]":""} border-orange-500`}>Global</li>
          </ul>
        </div>

      </div>

      <ToastContainer/>
    </div>
  )
}

export default MainPage