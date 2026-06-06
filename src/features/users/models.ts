export enum UserStatus {
  UNVERIFIED = 'user.unverified',
  ACTIVE = 'user.active',
  DEACTIVATED = 'user.deactivated',
  DELETED = 'user.deleted',
}

export interface UserDetails {
  userId: number
  country?: string
  state?: string
  city?: string
  address?: string
  zip?: string
  phone?: string
}

export interface UserGroup {
  id: number
  name: string
}

export interface UserModel {
  id: number
  uuid: string
  username: string
  firstName: string
  lastName: string
  email: string
  createdDate: string
  updatedDate: string
  isStaff: boolean
  isActive: boolean
  isVerified: boolean
  status: UserStatus
  statusLabel: string
}

export interface UserAccount extends UserModel {
  bio: string
  groups: Array<UserGroup>
  permissions: Array<string>
  details?: UserDetails
}

export interface UpdateBioRequest {
  bio?: string
}

export interface UpdateContactInfoRequest {
  country?: string
  state?: string
  city?: string
  address?: string
  zip?: string
  phone?: string
}

export interface ChangeUserStatusRequest {
  userId: string
}

export type UserAccountActions = 'ACTIVATE' | 'DEACTIVATE' | 'DELETE'

export interface ChangePasswordRequest {
  email: string
  newPassword: string
  confirmPassword: string
}

export interface UploadProfileImageMutation {
  userUuid: string
  image: File
  title: string
  alt: string
}

export interface CreateUserRequest {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  role: number
}
