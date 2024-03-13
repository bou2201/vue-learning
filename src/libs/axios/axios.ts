import axios, { HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { getOneLocalStorage, setOneLocalStorage } from '@/utils/local.util'
import type { User } from '@/feats/user'
import { ApiTags } from '@/constants/enum.const'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = getOneLocalStorage<User>('user', 'object')
    if (user) {
      config.headers.Authorization = `Bearer ${(user as User).accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config
    const status = error.response?.status

    if (status === HttpStatusCode.Unauthorized) {
      const user = getOneLocalStorage<User>('user', 'object')

      if (!user) {
        return Promise.reject(error)
      }

      try {
        const { data } = await axiosInstance.post<User>(`${ApiTags.Auth}/`, {
          data: { refreshToken: (user as User).refreshToken }
        })

        setOneLocalStorage<User>('user', data)
        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return axiosInstance(prevRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
