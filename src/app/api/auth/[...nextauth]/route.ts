import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth";

const apiUrl = "https://whimsical-activity-841245cb28.strapiapp.com"; 

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}