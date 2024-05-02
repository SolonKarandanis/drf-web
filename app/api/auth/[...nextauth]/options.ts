import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};


export const authOptions: NextAuthOptions ={
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    pages:{
        signIn: `/en/auth/login/`,
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
                try {
                    const data = await fetch(`${process.env.NEXTAUTH_BACKEND_URL}auth/token/`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)
                      })
                      .then(response => response.json())
                      
                    if (data) return data;
                } catch (error) {
                    console.error(error);
                }
                return null;
            }
        })
    ],
    callbacks:{
        async jwt(props){
            console.log(props)
            // If `user` and `account` are set that means it is a login event
            if (props.user && props.account) {
                let backendResponse = props.account.provider === "credentials" ? props.user : props.account.meta;
                console.log(backendResponse)
                // token["user"] = backendResponse.user;
                // token["access_token"] = backendResponse.access;
                // token["refresh_token"] = backendResponse.refresh;
                // token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                return props.token;
            }
            // Refresh the backend token if necessary
            // if (getCurrentEpochTime() > token["ref"]) {
            //     const response = await axios({
            //         method: "post",
            //         url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
            //         data: {
            //             refresh: token["refresh_token"],
            //         },
            //     });
            //     token["access_token"] = response.data.access;
            //     token["refresh_token"] = response.data.refresh;
            //     token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            // }
            return props.token;
        }
    }
}