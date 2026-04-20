import { Session } from "inspector/promises";
import { jwtDecode } from "jwt-decode";

import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";



export const nextAuthConfig = {

    providers: [

        Credentials({

            name: 'credentials login...',

            credentials: {

                email: { label: 'user mail', placeholder: 'ali@example.com' },

                password: {}

            },

            authorize: async (credentials) => {

                // return user data object must include id or null or throw error , it call when login

                // here we implement the login logic

                const data = await fetch(`${process.env.API}auth/signin`, {

                    method: 'post',

                    body: JSON.stringify({

                        email: credentials?.email,

                        password: credentials?.password

                    }),

                    headers: { 'content-type': 'application/json' }

                })

                if (!data.ok) {

                    throw new Error(data?.statusText)

                }

                const payload = await data.json()

                const tokenData = jwtDecode<{ id: string }>(payload?.token)

              

                return {

                    email: payload?.user?.email,

                    name: payload?.user?.name,

                    id: tokenData.id,

                    token: payload?.token //backend needed

                }

            }

        })

    ],
    
    callbacks:{
        jwt({token,user}:{token:any, user:any}){
           if(user){
            token.token = user.token
           }
           return token
        }
        , session:({token,session}:{token:any, session:any})=>{

            if(token){
               session.user.name = token.name
            }
           return session
        }
    },

    pages: {

        signIn: '/login'

    }

}