"use client";

import type React from "react";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to send reset email");
            }
            toast.success("An email is sent to your email address.");
        } catch (error) {
            toast.error("Failed to send email. Please try again.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#beedd0] h-screen flex items-center justify-center">
            <div className="w-full lg:w-auto lg:p-8 bg-primary rounded-3xl shadow-xl h-[500px]">
                <div className="space-y-6 lg:max-w-3xl mx-auto h-full flex flex-col items-center justify-center">
                    <div className="text-center space-y-2">
                        <h1 className="text-base lg:text-3xl font-semibold text-white">
                            Forgot Password
                        </h1>
                        <p className="text-white text-xs">
                            Enter your email to receive the OTP
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 py-6 bg-transparent border-white border-opacity-30 focus:border-white focus:ring-0 lg:w-[500px] text-white"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 bg-[#d0eddb]/70 border border-white cursor-pointer shadow-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}