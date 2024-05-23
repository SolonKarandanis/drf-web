interface BaseUserModel{
    username:string;
	firstName: string;
	lastName: string;
	email: string;
}

interface UserModel extends BaseUserModel {
    id:number;
    uuid:string;
    createdDate:string;
    updatedDate:string;
    isStaff:boolean;
    isActive:boolean;
    isVerified:boolean;
    bio:string;
}


type UserPublic = Pick<UserModel, "id" | "username">;

interface UserDetails extends UserModel{
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