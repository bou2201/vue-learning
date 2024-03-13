import { ApiTags } from '@/constants/enum.const'
import type { AuthLogin } from '@/feats/auth'
import type { User } from '@/feats/user'
import { axiosInstance } from '@/libs/axios'

export const loginApi = (loginPayload: AuthLogin) =>
  axiosInstance.post<User>(`${ApiTags.Auth}/login`, loginPayload)
