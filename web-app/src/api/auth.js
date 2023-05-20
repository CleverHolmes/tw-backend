export const userHasValidToken = () => {
  const token = getJWTToken()
  return !!token
}

export const setJWTToken = token => {
  window.localStorage.setItem("token", token)
}

export const getJWTToken = () => {
  return window.localStorage.getItem("token")
}

export const removeJWTToken = () => {
  window.localStorage.removeItem("token")
}

export const setRefreshToken = token => {
  window.localStorage.setItem("refreshToken", token)
}

export const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken")
}

export const removeRefreshToken = () => {
  window.localStorage.removeItem("refreshToken")
}
