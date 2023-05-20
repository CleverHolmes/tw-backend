import { useEffect, useState } from "react"
import axios from "axios"
import {
  getJWTToken,
  getRefreshToken,
  removeJWTToken,
  removeRefreshToken,
  setJWTToken,
  setRefreshToken
} from "./auth"

const DEFAULT_ERROR_OBJECT = {
  detail: "Unexpected error occurred. Please try again."
}

const main_api = axios.create()
const basic_api = axios.create()

main_api.interceptors.request.use(
  config => {
    const jwt_token = getJWTToken()
    if (jwt_token) {
      config.headers.Authorization = `Token ${jwt_token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const errorResponseInterceptor = error => {
  if (error.response) {
    if (error.response.status === 401) {
      const refreshToken = getRefreshToken()
      const originalRequest = error.config
      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true
        return axios
          .post(`/accounts/auth/token/refresh/`, { refresh: refreshToken })
          .then(response => {
            const { access, refresh } = response.data
            setJWTToken(access)
            setRefreshToken(refresh)
            originalRequest.headers["Authorization"] = `JWT ${access}`
            return axios(originalRequest)
          })
          .catch(error => {
            removeJWTToken()
            removeRefreshToken()
            window.location.reload()
            return Promise.reject(error)
          })
      } else {
        removeJWTToken()
        removeRefreshToken()
        window.location.reload()
      }
    } else if (
      !error.response.data ||
      typeof error.response.data === "string"
    ) {
      // assign default error object
      error.response.data = DEFAULT_ERROR_OBJECT
    }
  } else {
    // assign default error object
    error.response = {
      data: DEFAULT_ERROR_OBJECT
    }
  }
  return Promise.reject(error)
}

main_api.interceptors.response.use(response => {
  return response
}, errorResponseInterceptor)

const useMainApi = (
  url,
  method = "get",
  formData = null,
  requestParams = {},
  validateJsonResponse = true,
  timeout = 30000
) => {
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const [params, setParams] = useState(requestParams)

  useEffect(() => {
    let unmounted = false
    let source = axios.CancelToken.source()
    setData(null)
    setErrors({})
    setProcessing(true)
    main_api({
      url: url,
      method: method,
      data: formData,
      params: params,
      timeout: timeout,
      cancelToken: source.token
    })
      .then(response => {
        if (!unmounted) {
          const contentType = response.headers["content-type"]
          if (
            !validateJsonResponse ||
            (contentType && contentType.indexOf("application/json") !== -1)
          ) {
            setData(response.data)
          } else {
            setErrors(DEFAULT_ERROR_OBJECT)
          }
        }
      })
      .catch(e => {
        if (!unmounted) {
          setErrors(e.response.data)
          if (axios.isCancel(e)) {
            console.error(`request cancelled:${e.message}`)
          } else {
            console.error("another error happened:" + e.message)
          }
        }
      })
      .then(() => {
        if (!unmounted) {
          setProcessing(false)
        }
      })
    return function () {
      unmounted = true
      source.cancel("Cancelling in cleanup")
    }
  }, [url, method, formData, params, validateJsonResponse, timeout])

  const reloadData = () => {
    setParams({ ...params })
  }

  return { data, processing, errors, setParams, params, reloadData, setData }
}

const useAxiosGet = (url, requestParams = {}) => {
  return useMainApi(url, "get", null, requestParams)
}

export { main_api, basic_api, useAxiosGet }
