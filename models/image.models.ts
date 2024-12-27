export interface ImageModel{
    id:number;
    image:string;
    alt:string;
    title:string;
}

export interface UploadProfileImage{
    image:File;
    title:string;
    alt:string;
}

export interface UploadProfileImageMutation extends UploadProfileImage{
    userUuid:string;
}