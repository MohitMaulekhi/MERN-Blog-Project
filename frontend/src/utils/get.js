import axios from "axios"
import { login, logOut } from "../store/authSlice.js"

export default function getUser(dispatch,navigate){
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
        axios.post("/api/v1/user/refresh-token")
        .then(()=>{
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
              }).catch(()=>{
                navigate("/Login")
              })
        }).catch(navigate("/Login"))
      })
}