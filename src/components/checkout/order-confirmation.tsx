"use client"

import { Check, Clock, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

// Confetti component
const Confetti = () => {
    const [particles, setParticles] = useState<
        Array<{
            id: number
            x: number
            y: number
            color: string
            delay: number
        }>
    >([])

    useEffect(() => {
        const colors = ["#22c55e", "#16a34a", "#15803d", "#84cc16", "#65a30d"]
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 3,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full animate-bounce"
                    style={{
                        left: `${particle.x}%`,
                        backgroundColor: particle.color,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: "3s",
                        transform: "translateY(100vh)",
                    }}
                />
            ))}
        </div>
    )
}

export default function OrderConfirmation() {
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        // Trigger content animation after a short delay
        const timer = setTimeout(() => {
            setShowContent(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            {/* Confetti Animation */}
            <Confetti />

            {/* Main Content */}
            <div className="text-center px-4 max-w-2xl mx-auto relative z-10">
                {/* Clock Icon - Left Side */}
                <div
                    className={`absolute -left-20 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${showContent ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                        }`}
                >
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Checkmark Icon */}
                <div
                    className={`mb-8 transition-all duration-1000 delay-300 ${showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full animate-bounce">
                        <Check className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Main Heading */}
                <h1
                    className={`text-4xl md:text-5xl font-bold text-gray-800 mb-6 transition-all duration-1000 delay-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                >
                    Your Order Is Completed!
                </h1>

                {/* Description */}
                <p
                    className={`text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed transition-all duration-1000 delay-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                >
                    Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will
                    receive an email confirmation when your order is completed.
                </p>

                {/* Continue Shopping Button */}
                <div
                    className={`transition-all duration-1000 delay-1000 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                >
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        onClick={() => (window.location.href = "/")}
                    >
                        Continue Shopping
                    </Button>
                </div>

                {/* Clipboard Icon - Right Side */}
                <div
                    className={`absolute -right-20 bottom-0 transition-all duration-1000 delay-1200 ${showContent ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                        }`}
                >
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center animate-pulse">
                        <Clipboard className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Floating Elements Animation */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating Green Circles */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-green-300 rounded-full animate-ping opacity-75"></div>
                <div
                    className="absolute top-40 right-20 w-6 h-6 bg-green-400 rounded-full animate-bounce opacity-60"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-50"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-20 right-1/3 w-5 h-5 bg-green-300 rounded-full animate-ping opacity-40"
                    style={{ animationDelay: "1.5s" }}
                ></div>

                {/* Floating Light Bulb Icons */}
                <div
                    className="absolute top-1/4 right-10 text-green-400 animate-bounce opacity-30"
                    style={{ animationDelay: "0.5s" }}
                >
                    💡
                </div>
                <div
                    className="absolute bottom-1/4 left-16 text-green-500 animate-pulse opacity-25"
                    style={{ animationDelay: "2.5s" }}
                >
                    💡
                </div>
            </div>

            {/* Success Ripple Effect */}
            <div
                className={`absolute inset-0 pointer-events-none transition-all duration-2000 ${showContent ? "opacity-0" : "opacity-100"
                    }`}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-4 border-green-400 rounded-full animate-ping"></div>
                    <div
                        className="absolute top-4 left-4 w-24 h-24 border-4 border-green-500 rounded-full animate-ping"
                        style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                        className="absolute top-8 left-8 w-16 h-16 border-4 border-green-600 rounded-full animate-ping"
                        style={{ animationDelay: "1s" }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
