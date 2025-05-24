"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset-password?token=${searchParams.get("token")}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newPassword: newPassword,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to reset password");
            }

            toast.success("Your password has been reset successfully");

            // Redirect to login page after a delay
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            toast.error("Failed to reset password. Please try again.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#beedd0] h-screen flex items-center justify-center">
            <div className="w-full lg:w-auto lg:p-8 bg-primary rounded-3xl shadow-xl h-[500px]">
                <div className="space-y-6 lg:max-w-xl mx-auto h-full flex flex-col items-center justify-center">
                    <div className="text-center space-y-2">
                        <h1 className="text-base lg:text-3xl font-semibold text-white">
                            Reset Password
                        </h1>
                        <p className="text-white text-xs lg:text-base">
                            Please kindly set your new password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pr-10 py-6 bg-transparent border-[#d0eddb] text-white border-opacity-30 focus:border-[#d0eddb] focus:ring-0 lg:w-[500px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#d0eddb]"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 bg-[#d0eddb]/70 border border-white cursor-pointer shadow-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Continue"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}