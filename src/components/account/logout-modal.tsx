"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react" // optional, if you're using next-auth
import { DialogTrigger } from "@radix-ui/react-dialog"
import { LogOut } from "lucide-react"

export default function LogoutButtonWithModal() {
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        // Your logout logic here
        signOut({ callbackUrl: '/' }) // or your own logic
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div
                        className="cursor-pointer flex items-center gap-2 pl-5 pt-4 w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="bg-primary text-white">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        You will be signed out of your account.
                    </p>
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout} className="cursor-pointer bg-red-500">
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
