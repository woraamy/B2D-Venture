import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/connectDB";
import { toast } from "react-toastify";

const authOptions: NextAuthOptions = {
  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            try {
                const businessRequestRes = await fetch(`/api/fetchingData/getBusinessRequestStatus?email=${email}`);
                const { status } = await businessRequestRes.json();

                // If business request is approved, create the business user and activate it
                if (status === "approved") {
                    const activateBusinessRes = await fetch("/api/register/businessRequest", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: { "Content-Type": "application/json" },
                    });

                    if (!activateBusinessRes.ok) {
                    toast.error("Error activating business account");
                    return;
                    }
                    // toast.success("Your business account has been activated!");
                }
            }
            catch { console.log("User not found") };
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Invalid password");
            return null;
          }


          return {
            ...user._doc, 
            role: user.role, 
          }; 
        } catch (error) {
          console.log("Error in authorization: ", error);
          return null; 
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    // Callback when the user signs in
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connectDB(); 
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return true;
          }

          const newUser = new User({
            name,
            email,
            role: "investor",
          });

          await newUser.save(); 
          return true; 
        } catch (err) {
          console.log("Error during Google sign-in:", err);
          return false; 
        }
      }
      return true;
    },

    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; 
      }
      return token; 
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role; 
      }
      return session; 
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl; 
    },
  },
};

export { authOptions };