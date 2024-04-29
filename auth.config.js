export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // 如果用户已登录,则将其重定向到 '/home'

            // 对于其他情况,返回 true 以允许访问任何页面
            return true;
        },
        // async session({ session, token }) {
        //     console.log("tokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentoken",token);
        //     session.user = token.user;
        //     return session;
        // },
        // async jwt({ token, user }) {
        //     console.log("useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser",token);

        //     if (user) {
        //         token.user = user;
        //     }
        //     return token;
        // },
    },
    providers: [], // Add providers with an empty array for now
};