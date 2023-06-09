import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  providers: [
	CredentialsProvider({
		type: "credentials",
		credentials: {
			email: { label: "email", type: "text" },
			password: { label: "password", type: "password" },
		},
		
		async authorize(credentials) {
			const users = await prisma.user.findMany();
			if (
				credentials?.email !== "admin@admin.com" ||
				credentials?.password !== "admin"
			) {
				throw new Error("Invalid email or password");
			}
			return {
				email: "admin@example.com",
				name: "Admin",
				id: "test-id",
			};
		},
	})
  ]  
})