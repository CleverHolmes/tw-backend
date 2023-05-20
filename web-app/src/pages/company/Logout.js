import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeJWTToken } from "../../api/auth"

function Logout() {
  let navigate = useNavigate()

  useEffect(() => {
    function logout() {
      removeJWTToken()
      navigate("/company/signin")
    }

    logout()
  }, [])
  return <></>
}

export default Logout
