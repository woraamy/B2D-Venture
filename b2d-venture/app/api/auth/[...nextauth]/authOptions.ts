import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/connectDB";
import { toast } from "react-toastify";

const authOptions: NextAuthOptions = {
  providers: [
    // Credentials provider for username/password login
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
                const businessRequestRes = await fetch(`/api/getBusinessRequestStatus?email=${email}`);
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

                    // // Optionally, display success message
                    // toast.success("Your business account has been activated!");
                }
            }
            catch { console.log("User not found") };
            return null;
          }


          // Compare provided password with hashed password in DB
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Invalid password");
            return null;
          }

          return user; // Successfully authenticated
        } catch (error) {
          console.log("Error in authorization: ", error);
          return null; // Fail authorization on error
        }
      },
    }),
    // Google OAuth provider for Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session handling
  },
  secret: process.env.NEXTAUTH_SECRET, // Set the secret for session signing
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    // Callback when the user signs in
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connectDB(); // Ensure connection is established
          const existingUser = await User.findOne({ email });

          // If the user exists, return the user data
          if (existingUser) {
            return true;
          }

          // If the user doesn't exist, create a new user
          const newUser = new User({
            name,
            email,
            // You could add other fields if needed
          });

          await newUser.save(); // Save new user to the database
          return true; // Sign in successful
        } catch (err) {
          console.log("Error during Google sign-in:", err);
          return false; // Sign in failed
        }
      }
      return true; // For other providers (like credentials), allow sign-in
    },

    // JWT callback to update the JWT token with additional user information
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token; // Return the updated token
    },

    // Session callback to include custom fields in the session object
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session; // Return the modified session
    },

    async redirect({ url, baseUrl }) {
        // If the user signed in with Google, redirect to the homepage
        return baseUrl; // Redirect to "/"
      },
  },
};

export { authOptions };