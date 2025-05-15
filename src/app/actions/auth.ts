"use server"

import { cookies } from "next/headers";

export async function loginUser(credentials: {
    email: string;
    password: string;
}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        console.log(data)

        if (!data.success) {
            return {
                success: false,
                message: data.message || "Login failed",
            };
        }

        console.log(data)

        // Store the access token in a cookie (not refresh token)
        const cookieStore = cookies();
        (await cookieStore).set("token", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour
            path: "/",
        });

        // Optional: Store minimal user info in a cookie (non-httpOnly so accessible in client)
        const { _id, fullname, email, role } = data.data.user;
        (await cookieStore).set("user", JSON.stringify({ _id, fullname, email, role }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            path: "/",
        });

        return {
            success: true,
            data: data.data,
            token: data.accessToken,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "An error occurred during login",
        };
    }
}