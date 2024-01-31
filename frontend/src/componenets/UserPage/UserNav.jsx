import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'



function UserNav() {
    let counter = (useSelector(state => state.authSlice.userData))
    const nameArray =  counter?"":counter.data.fullName.split(" ")
  return (
    <div className="">
    <div className=" bg-mainBlue flex justify-end h-[11vh]">
      <div className=' flex flex-wrap-reverse'>
        <div className='self-center  font-bold font-sans text-[3vh] mx-[1vw] text-white'>Welcome <span className='text-white '>{nameArray ? nameArray[0] : "user"}</span></div>
        <Link to={`/user/updateAvatar`}><div className='cursor-pointer h-[11vh] w-[11vh] bg-white rounded-full bg-cover hover:opacity-65' style={counter?.data?.avatar ? { backgroundImage: `url(${counter?.data.avatar})` } : { backgroundImage: `url(https://res.cloudinary.com/mohitproject/image/upload/v1706437249/Assets/ig1r0citioyfixiqzfvq.png)` }}></div></Link>
      </div>
        
    </div>
    <div className='bg-mainBlue h-[1vh]'><div className='bg-black h-[1vh] w-[77.5vw] float-right rounded-s-full'></div></div>
  </div>
  )
}

export default UserNav