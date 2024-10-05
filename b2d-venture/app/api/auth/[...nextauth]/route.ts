import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import connectDB from "@/lib/connectDB";


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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
        async signIn({ user, account }: { user: any; account: any }) {
            if (account.provider === "google") {
              try {
                const { name, email } = user;
                await connectDB();
                const ifUserExists = await User.findOne({ email });
                if (ifUserExists) {
                  return user;
                }
                const newUser = new User({
                  name: name,
                  email: email,
                });
                const res = await newUser.save();
                if (res.status === 200 || res.status === 201) {
                  console.log(res)
                  return user;
                }
      
              } catch (err) {
                console.log(err);
              }
            }
            return user;
          },
          async jwt({ token, user }) {
            if (user) {
              token.email = user.email;
              token.name = user.name;
            }
            return token;
          },
      
          async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
              session.user.email = token.email;
              session.user.name = token.name;
            }
            console.log(session);
            return session;
          },
        },
});

export { handler as GET, handler as POST }
