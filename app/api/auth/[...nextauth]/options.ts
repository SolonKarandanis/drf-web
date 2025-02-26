import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { isErrorData, isLoginResponse } from "@/utils/helpers";
import { redirect } from 'next/navigation'



// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 150 * 60;            // 2.5 hours
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const baseUrl= process.env.NEXTAUTH_BACKEND_URL;

export const authOptions: NextAuthOptions ={
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    pages:{
        signIn: `/en/auth/login/`,
        signOut: '/en/auth/logout/',
    },
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            // The data returned from this function is passed forward as the
            // `user` variable to the signIn() and jwt() callback
            async authorize(credentials, req) {          
                const httpResponse= await fetch(`${baseUrl}auth/token/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
                const response =await httpResponse.json();
                console.log("-------->providers");
                console.log(response);
                if(httpResponse.status===401 && isErrorData(response)){
                    throw new Error(response.detail)
                }
                
                if(!isLoginResponse(response)){
                    return null;
                }
                const {access,refresh} = response;
                const user:User = await fetch(`${baseUrl}auth/users/account/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${access}`,
                    }
                })
                .then(response => response.json())
                    
                if (user) return {...user,access,refresh};
               
                return null;
            }
        })
    ],
    callbacks:{
        async jwt({user,token,account}){
            // If `user` and `account` are set that means it is a login event
            if (user && account) {
                token["user"] = user;
                token["access"] = user.access;
                token["refresh"] = user.refresh;
                token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                return token;
            }
            // Refresh the backend token if necessary
            if (getCurrentEpochTime() > (token["ref"] as number)) {
                const response =await fetch(`${baseUrl}auth/token/refresh/`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({refresh:token["refresh"]})
                })
                // .then(response => response.json())
                console.log("-------->callbacks");
                console.log(response);
                if(response.status===401){
                    redirect(`/auth/login`) 
                }
                const body=await response.json();
                token["access"] = body.access;
                token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            }
            return token;
        },
        // Since we're using Django as the backend we have to pass the JWT
        // token to the client instead of the `session`.
        async session({ session, token }) {
            const loggedInUser = token.user;
            session.access= loggedInUser.access;
            session.user= loggedInUser;
            return session
        },
    }
}