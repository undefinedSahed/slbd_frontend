import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const result = await res.json();

                    if (res.ok && result?.data?.accessToken) {
                        return {
                            id: result.data.id,
                            fullname: result.data.fullname,
                            email: result.data.email,
                            role: result.data.role,
                            accessToken: result.data.accessToken,
                            city: result.data.city
                        };
                    }

                    return null;
                } catch (err) {
                    console.error("Auth error", err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.role = user.role;
                token.id = user.id;
                token.fullname = user.fullname;
                token.city = user.city;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.accessToken = token.accessToken;
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.fullname = token.fullname;
                session.user.city = token.city;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
