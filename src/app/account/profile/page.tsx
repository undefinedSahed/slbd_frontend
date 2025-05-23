import type { Metadata } from "next"
import { ProfileForm } from "@/components/account/profile-form"
import { Separator } from "@/components/ui/separator"
import ChangePasswordForm from "@/components/account/change-pass-form"

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile information",
}

export default function ProfilePage() {
    return (
        <div className="space-y-3">
            <div>
                <h3 className="text-xl font-bold">Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
            </div>
            <Separator />
            <ProfileForm />
            <ChangePasswordForm />
        </div>
    )
}
