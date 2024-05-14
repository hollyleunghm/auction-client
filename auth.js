import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { AuthError } from "next-auth";
export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                // email: {},
                password: {},
                // name: String,
                // abc: String,

            },
            authorize: async (credentials) => {
                let user = null;
                await connectMongo();
                user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new AuthError("電郵尚未注冊");
                }
                user = await User.findOne({
                    email: credentials.email,
                    password: credentials.password,
                });
                if (!user) {
                    throw new AuthError("電郵尚未注冊");
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
});
