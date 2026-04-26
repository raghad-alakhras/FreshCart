import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun(){
    const cookie = await cookies()
    const cookieName = process.env.NODE_ENV==='production'
    ?'__Secure-next-autj.session-token'
    :'next-auth.session-token'
    const nextAuthToken = cookie.get(cookieName)?.value
    const decodedCookie= await decode({
        secret:process.env.NEXTAUTH_SECRET!,
        token:nextAuthToken
    })

    return  decodedCookie?.token
}