import axios from "axios"
import { login, logOut } from "../store/authSlice.js"

export default function getUser(dispatch,navigate){
    axios.get('/api/v1/user/current',{
      withCredentials:true,
    })
      .then((userData) => {
        if (userData) {

          dispatch(login({ userData: userData.data }))
          return null
        }
        else {
          dispatch(logOut())
          navigate("/login")
        }
      })
      .catch(() => {
        axios.post("/api/v1/user/refresh-token",{
          withCredentials:true,
        })
        .then(()=>{
            axios.get('/api/v1/user/current',{
              withCredentials:true,
            })
            .then((userData) => {
                if (userData) {
        
                  dispatch(login({ userData: userData.data }))
                  return null
                }
                else {
                  dispatch(logOut())
                  navigate("/login")
                }
              }).catch(()=>{
                navigate("/login")
              })
        }).catch(navigate("/login"))
      })
}