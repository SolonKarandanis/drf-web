export interface BaseUserModel{
    username:string;
	firstName: string;
	lastName: string;
	email: string;
}

export enum UserStatus{
    UNVERIFIED='user.unverified',
    ACTIVE='user.active',
    DEACTIVATED='user.deactivated',
    DELETED='user.deleted',
} 

export interface UserModel extends BaseUserModel {
    id:number;
    uuid:string;
    createdDate:string;
    updatedDate:string;
    isStaff:boolean;
    isActive:boolean;
    isVerified:boolean;
    status: UserStatus;
    statusLabel:string;
    bio:string;
    details?:UserDetails;
}

export interface UserDetails{
    userId:number;
    country?:string;
    state?:string;
    city?:string;
    address?:string;
    zip?:string;
    phone?:string;
}


export type UserPublic = Pick<UserModel, "id" | "username" | "firstName"| "lastName" | "email" | "uuid">;

export interface UserAcount extends UserModel{
    groups:UserGroup[];
    permissions:string[];
}

export interface UserGroup{
    id:number;
    name:string;
}

export interface ChangePasswordRequest{
    email: string;
    newPassword: string;
    confirmPassword:string;
}

export interface CreateUserRequest extends BaseUserModel{
    password:string;
    confirmPassword:string;
    role:string;
}

export interface LoginRequest{
    username:string;
    password:string;
}

export interface LoginResponse{
    access:string;
    refresh:string;
}

export type RefreshResponse = Pick<LoginResponse, "access">;


export interface UpdateBioRequest{
    bio?:string;
}

export interface UpdateContactInfoRequest{
    country?:string;
    state?:string;
    city?:string;
    address?:string;
    zip?:string;
    phone?:string;
}