import { ImageObj, Timestamp } from '@/common/model'
import type { Address } from '~feats/address'
import type { ActivityLog } from './user-activity-log.model'

export class User extends Timestamp {
  _id: string = ''
  email: string = ''
  emailVerified: boolean = false
  role: string = ''
  userName: string = ''
  avatar: ImageObj | Blob = new ImageObj()
  avatarPublicId?: string = ''
  address: Address[] = []
  accessToken: string = ''
  refreshToken: string = ''
  firstName: string = ''
  lastName: string = ''
  block?: {
    isBlocked?: boolean
    activityLogs?: ActivityLog[]
  }
}
