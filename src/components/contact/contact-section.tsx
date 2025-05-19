"use client"

import { useState, useRef, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, Mail } from "lucide-react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Label } from "../ui/label"

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const session = useSession()

    const user = session.data?.user

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!formRef.current) return

        try {

            if (!user) {
                toast("Please login first")
                return
            }

            setIsSubmitting(true)

            // Replace these with your actual EmailJS service, template, and public key
            await emailjs.sendForm(`${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`, formRef.current, `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`)

            toast("Message sent successfully!")

            // Reset the form
            formRef.current.reset()
        } catch (error) {
            console.error(error)
            toast("Failed to send message")
        } finally {
            setIsSubmitting(false)
        }
    }



    return (
        <section className="py-5 lg:py-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Contact Form */}
                    <div className="bg-primary/10 pt-20 pb-5 px-5 rounded-2xl">
                        <div className="pb-10">
                            <div>
                                <h2 className="text-2xl font-semibold text-primary">Get in Touch</h2>
                            </div>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    name="user_name"
                                    placeholder="Your name"
                                    value={user?.fullname || "No user found"}
                                    readOnly
                                    required
                                    className="border-primary focus:ring-green-600 focus:border-green-600 h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    name="user_email"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={user?.email || "No user found"}
                                    readOnly
                                    required
                                    className="border-primary focus:ring-green-600 focus:border-green-600 h-12"
                                />
                            </div>


                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="+880 123456789"
                                    className="flex-grow border-primary focus:ring-green-600 focus:border-green-600 h-12 rounded-l-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea
                                    name="message"
                                    placeholder="Tell us a little about the project..."
                                    required
                                    className="border-primary focus:ring-green-600 focus:border-green-600 min-h-[120px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || !user}
                                className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
                            >
                                {user ? isSubmitting ? "Sending..." : "Send Message" : "Login to send message"}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-primary mb-8">Other Ways to Reach Us</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-primary/10 py-6 px-6 rounded-lg">
                                <div className="flex items-center space-x-4 pb-2">
                                    <Phone className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-medium text-green-600">Phone Support</h3>
                                </div>
                                <div>
                                    <p className="text-gray-600">Hotline: +880 1724-188240</p>
                                </div>
                            </div>

                            <div className="bg-primary/10 py-6 px-6 rounded-lg space-y-2">
                                <div className="flex items-center space-x-4">
                                    <MapPin className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-medium text-green-600">Office Location</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="rounded-lg w-full border border-primary">
                                        <iframe className="w-full h-44 rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.818930891754!2d90.34981097516602!3d23.825036978619547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac7f3a48336e6375%3A0x8170a55898a9b7f2!2sSuper%20Lighting%20BD!5e0!3m2!1sen!2sbd!4v1747686245455!5m2!1sen!2sbd"></iframe>
                                    </div>
                                    <p className="text-gray-600 pt-">House: 110, Road: 02, Block: D, Pallabi 2nd Project, Rupnagar, Mirpur</p>
                                </div>
                            </div>

                            <div className="bg-primary/10 py-6 px-6 rounded-lg space-y-2">
                                <div className="flex items-center space-x-4">
                                    <Mail className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-medium text-green-600">Email</h3>
                                </div>
                                <div>
                                    <a href="mailto:superlightingbd1@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-600">Contact Email: superlightingbd1@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
