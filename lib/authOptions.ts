import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email Address", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // FIXME: remove
        // console.log("[credentials]", credentials);
        try {
          const { data } = await axios.post(
            process.env.NEXTAUTH_URL + "api/auth/login",
            { email: credentials?.email, password: credentials?.password },
            { headers: { "Content-Type": "application/json" } }
          );

          if (data && data.id) return data;
          else return null;
        } catch (err: any) {
          // console.log("[auth options err]", err.response.data);
          throw new Error(err.response.data.msg);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      console.log("[token]", token);
      console.log("[user]", user);

      return { ...user, ...token };
    },
    async session({ session, token }) {
      console.log("[session session]", session);
      console.log("[session token]", token);

      session.user = token;

      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
