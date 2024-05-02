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

    interface JWT extends DefaultJWT{
        user?: User;
    }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//       role?: Role;
//       subscribed: boolean;
//     }
// }