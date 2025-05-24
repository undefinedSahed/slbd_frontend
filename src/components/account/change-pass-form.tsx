"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(6, "Current password is required"),
        newPassword: z.string().min(6, "New password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const session = useSession();
    const token = session.data?.user?.accessToken;


    const toggleShow = (field: "current" | "new" | "confirm") => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ChangePasswordFormData) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/password/change`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            toast.success("Password changed successfully");
            form.reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 lg:mt-14">
            <h2 className="text-xl font-semibold mb-3">Change Password</h2>
            <div className="max-w-full mx-auto p-6 bg-white border rounded-xl px-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={show.current ? "text" : "password"}
                                                placeholder="Enter current password"
                                                {...field}
                                            />
                                            <span
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                                                onClick={() => toggleShow("current")}
                                            >
                                                {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500"/>
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={show.new ? "text" : "password"}
                                                placeholder="Enter new password"
                                                {...field}
                                            />
                                            <span
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                                                onClick={() => toggleShow("new")}
                                            >
                                                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500"/>
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={show.confirm ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                {...field}
                                            />
                                            <span
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                                                onClick={() => toggleShow("confirm")}
                                            >
                                                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500"/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={loading} className="w-full text-white cursor-pointer">
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
