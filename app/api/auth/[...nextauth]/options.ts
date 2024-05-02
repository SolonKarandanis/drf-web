import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions ={
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
                    fetch(`${process.env.NEXTAUTH_BACKEND_URL}auth/token/`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)
                      })
                      .then(response => response.json())
                      .then(data => console.log(data))
                // const response = await axios({
                //     url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/",
                //     method: "post",
                //     data: credentials,
                // });
                // const data = response.data;
                // if (data) return data;
                } catch (error) {
                    console.error(error);
                }
                return null;
            }
        })
    ]
}