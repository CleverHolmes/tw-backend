import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userHasValidToken } from "../../api/auth"

const PublicOnlyRoute = ({ Page }) => {
  const hasValidToken = userHasValidToken()
  let navigate = useNavigate()
  useEffect(() => {
    if (hasValidToken) {
      navigate("/company")
    }
  }, [])
  return !hasValidToken ? <Page /> : <></>
}
export default PublicOnlyRoute
