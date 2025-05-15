import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            verified: boolean;
        };
        accessToken: string;
    }

    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
        verified: boolean;
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isVerified: boolean;
        };
        accessToken: string;
    }
}