import NextAuth from "next-auth";

declare module "next-auth" {
    interface User extends UserDetails{
        access:string;
        refresh:string
    }
    
    interface Session extends DefaultSession {
        user?: User;
        access:string;
    }

    
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        user?: User;
    }
}