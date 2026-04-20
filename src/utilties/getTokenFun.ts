import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun(){
    const cookie = await cookies()
    const nextAuthToken = cookie.get('next-auth.session-token')?.value
    const decodedCookie= await decode({
        secret:process.env.NEXTAUTH_SECRET!,
        token:nextAuthToken
    })

    return  decodedCookie?.token
}