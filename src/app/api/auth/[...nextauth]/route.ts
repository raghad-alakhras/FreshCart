import { nextAuthConfig } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthConfig)
// route handler > handle /login

export {handler as GET, handler as POST}