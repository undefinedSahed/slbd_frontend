import type { Metadata } from "next"
import { ProfileForm } from "@/components/account/profile-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile information",
}

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold">Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
