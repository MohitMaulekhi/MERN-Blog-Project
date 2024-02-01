import {NavLink,useLocation } from "react-router-dom"
function UserBlogOption() {
  const location = useLocation()

  return (

        <ul className='flex justify-around w-[100%]'>
          <NavLink to={`/user`}>{()=>{
            return <li className={`cursor-pointer ${location.pathname=="/user"?"border-b-[0.5vh]":""} border-orange-500`}>My Blogs</li>
          }}</NavLink>
          {/* <NavLink to={`/user/Following`}>{({isActive})=>
            {return <li className={`cursor-pointer ${isActive?"border-b-[0.5vh]":""} border-orange-500`}>Following</li>}}
          </NavLink> */}
          <NavLink to={`/user/Global`}>{({isActive})=>{
            return <li className={`cursor-pointer ${isActive?"border-b-[0.5vh]":""} border-orange-500`}>Global</li>
          }}</NavLink>
        </ul>
  )
}

export default UserBlogOption

