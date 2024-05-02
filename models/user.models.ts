interface BaseUserModel{
    username:string;
	first_name: string;
	last_name: string;
	email: string;
    role:string;
}

interface UserModel extends BaseUserModel {
    id:number;
    uuid:string;
    created_date:string;
    updated_date:string;
    is_staff:boolean;
    is_active:boolean;
}


type UserPublic = Pick<UserModel, "id" | "username">;

interface UserDetails extends UserModel{
    groups:UserGroup[];
    permissions:string[];
}

interface UserGroup{
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