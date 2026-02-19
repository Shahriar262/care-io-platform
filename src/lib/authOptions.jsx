import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect, collections } from "./dbConnect";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    /* ================= GOOGLE ================= */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    /* ================= CREDENTIALS ================= */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const usersCollection = dbConnect(collections.USERS);

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user", 
        };
      },
    }),
  ],

  /* ================= SESSION ================= */
  session: {
    strategy: "jwt",
  },

  /* ================= CALLBACKS ================= */
  callbacks: {
    async jwt({ token, user }) {
      // first login
      if (user) {
        token.id = user.id;
        token.role = user.role || "user"; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; 
      }
      return session;
    },

    async signIn({ user, account }) {
      
      if (account.provider === "google") {
        const usersCollection = dbConnect(collections.USERS);

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            role: "user", 
            createdAt: new Date(),
          });
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
