import NextAuth from "next-auth";
import { UserAcount } from "./models/user.models";

declare module "next-auth" {
    
    interface Session extends DefaultSession {
        user?: User;
        access:string;
    }
    interface User extends UserAcount{
        access:string;
        refresh:string;
        email: string;
    }

    
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        user?: User;
        access:string;
        refresh:string;
        ref:number;
    }
}