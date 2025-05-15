import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const result = await loginUser({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (!result.success) {
                    // Forward the message from your backend
                    throw new Error(result.message || "Invalid credentials");
                }

                const user = result.data.user;

                console.log(user)

                return {
                    id: user._id.toString(),
                    name: user.fullname,
                    email: user.email,
                    role: user.role,
                    isVerified: user.verified,
                    token: user.accessToken,
                };

            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.verified,
                };
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...token.user,
                verified: token.user.isVerified,
            };
            session.accessToken = token.accessToken;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };