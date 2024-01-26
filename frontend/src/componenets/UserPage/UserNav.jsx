import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'



function UserNav() {
    let counter = (useSelector(state => state.authSlice.userData))
    const nameArray = counter?.data.fullName.split(" ")
  return (
    <div className=" min-w-full">
    <div className="min-w-full h-[10.5vh] min-h-7 bg-mainBlue flex justify-end">
      <div className=' flex flex-wrap-reverse'>
        <div className='self-center  font-bold font-sans text-[3vh] mx-[1vw] text-white'>Welcome <span className='text-white '>{nameArray ? nameArray[0] : "user"}</span></div>
        <Link to={`/user/updateAvatar`}><div className='cursor-pointer self-center h-[13vh] w-[13vh] bg-white rounded-full bg-cover hover:opacity-65' style={counter?.data.avatar ? { backgroundImage: `url(${counter?.data.avatar})` } : { backgroundImage: `url(../src/assests/Default_profile.jpg)` }}></div></Link>
      </div>
        
    </div>
    <div className='bg-mainBlue h-[1vh] min-w-full'><div className='bg-black h-[1vh] w-[77.5vw] float-right rounded-s-full'></div></div>
  </div>
  )
}

export default UserNav