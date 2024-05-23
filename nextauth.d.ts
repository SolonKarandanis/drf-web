import NextAuth from "next-auth";

declare module "next-auth" {
    
    interface Session extends DefaultSession {
        user?: User;
        access:string;
    }
    interface User extends UserDetails{
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