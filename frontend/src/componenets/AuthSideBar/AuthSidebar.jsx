import {AuthButton} from "../index.js"

function AuthSidebar() {
  return (
    <>
      <AuthButton type = "Register" borderCurve = "tr"/>
      <AuthButton type = "Login" borderCurve = "tr"/>
    </>
  )
}

export default AuthSidebar