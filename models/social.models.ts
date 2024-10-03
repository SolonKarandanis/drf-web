export interface SocialModel{
    id:number;
    name:string;
    icon:string;
    buttonCssClass:string;
}

export interface UserSocials{
    id:number;
    userId:number;
    socialId:number;
    url:string;
    socialName:string;
    socialIcon:string;
    buttonCssClass:string;
}