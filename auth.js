import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
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
                user = await User.findOne({
                    email: credentials.email,
                    password: credentials.password,
                });
                console.log("-----------------------------------------", user);
                user = {
                    email: "22222222222222222222",
                    name: user._id,
                    test: "testsssssssssssss"
                }
                return user;
            },
        }),
    ],
});
