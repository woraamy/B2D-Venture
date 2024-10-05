import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import Email from "next-auth/providers/email";
import { PassThrough } from "stream";

const handler = NextAuth({ 
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {
            email: {},
            password: {}
          },
          async authorize(credentials) {
           
            const { email, password } = credentials;

            try {

                await connectMongoDB();
                const user = await User.findOne({ email });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                console.log(user);
                return user;

            } catch(error) {
                console.log("Error: ", error)
            }

          }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                return {
                    ...token,
                    id: user.id
                }
            }

            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
    }
});

export { handler as GET, handler as POST }
