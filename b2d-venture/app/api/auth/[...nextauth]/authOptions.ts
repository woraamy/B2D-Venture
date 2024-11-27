import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/connectDB";
import Investor from "@/models/Investor";
import Business from "@/models/Business";

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
            console.log("User not found");
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          console.log(`Google sign-in for: ${email}`);
          await connectDB();
    
          const existingUser = await User.findOne({ email });
    
          if (existingUser) {
            console.log(`Existing user found: ${existingUser.email}`);
            return true;
          }
    
          // Create new user
          const newUser = await User.create({
            name,
            email,
            role: "investor", // Assign default role as investor
          });
    
          console.log(`New user created: ${newUser.email}`);
    
          // Create corresponding investor profile
          const newInvestor = await Investor.create({
            user_id: newUser._id,
            firstName: "",
            lastName: "",
            investor_description: "",
            profile_picture: "",
            contactNumber: "",
            birthDate: "",
            nationality: "",
          });

      
    
          console.log(`Investor profile created for: ${newInvestor.firstName}`);
    
          return true;
        } catch (err) {
          console.error("Error during Google sign-in:", err);
          return false;
        }
      }
      return true;
    },
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "investor"; // Default role if undefined
        token.id = await findId(user.email);
      }
      return token;
    },
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.id = token.id; // Use the id from the token
      }
      return session;
    }
    
    ,

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith(baseUrl)) {
        return "/";
      }
      return baseUrl; 
    }
    ,
  },
};

const findId = async (email: string): Promise<string | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  if (user.role === "investor") {
    const investor = await Investor.findOne({ user_id: user._id });
    if (investor) {
      return investor._id.toString();
    }
  }

  if (user.role === "business") {
    const business = await Business.findOne({ user_id: user._id });
    if (business) {
      return business._id.toString();
    }
  }

  return null; // For "admin" or unknown roles
};


export { authOptions };