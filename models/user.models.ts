interface BaseUserModel{
    username:string;
	firstName: string;
	lastName: string;
	email: string;
}

enum UserStatus{
    UNVERIFIED='user.unverified',
    ACTIVE='user.active',
    DEACTIVATED='user.deactivated',
    DELETED='user.deleted',
} 

interface UserModel extends BaseUserModel {
    id:number;
    uuid:string;
    createdDate:string;
    updatedDate:string;
    isStaff:boolean;
    isActive:boolean;
    isVerified:boolean;
    status: UserStatus;
    bio:string;
    details?:UserDetails;
}

interface UserDetails{
    userId:number;
    state?:string;
    city?:string;
    address?:string;
    zip?:string;
    phone?:string;
}


type UserPublic = Pick<UserModel, "id" | "username">;

interface UserAcount extends UserModel{
    groups:UserGroup[];
    permissions:string[];
}

interface UserGroup{
    id:number;
    name:string;
}

interface ChangePasswordRequest{
    current_password: string;
    new_password: string;
}

interface CreateUserRequest extends BaseUserModel{
    password:string;
    password2:string;
    role:string;
}

interface LoginRequest{
    username:string;
    password:string;
}

interface LoginResponse{
    access:string;
    refresh:string;
}

type RefreshResponse = Pick<LoginResponse, "access">;