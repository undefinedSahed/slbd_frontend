"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
    question: string
    answer: string
}

export default function FAQSection() {
    const faqs: FAQItem[] = [
        {
            question: "What types of lighting products do you offer?",
            answer:
                "We offer a wide range of lighting solutions including LED bulbs, chandeliers, pendant lights, wall sconces, outdoor lighting, and smart lighting systems.",
        },
        {
            question: "Do you provide custom lighting design services?",
            answer:
                "Yes, we offer custom lighting design services to fit your space and style. Our experts will work with you to create a personalized lighting plan.",
        },
        {
            question: "How long does delivery take after placing an order?",
            answer:
                "Standard orders are typically delivered within 3-7 business days. For custom lighting solutions, delivery may take 10-15 business days.",
        },
        {
            question: "Do your lighting products come with a warranty?",
            answer:
                "Yes, all our lighting products come with a minimum 1-year warranty. Some premium products include extended warranties up to 3 years.",
        },
        {
            question: "Can I return or exchange a product if it doesn't fit?",
            answer:
                "Absolutely. We have a 14-day return and exchange policy for unused and undamaged products with original packaging.",
        },
        {
            question: "Are your lighting products energy efficient?",
            answer:
                "Yes, most of our products are energy-efficient LED solutions designed to reduce power consumption and lower electricity bills.",
        },
        {
            question: "Can I schedule a consultation for a lighting project?",
            answer:
                "Yes, you can book a free consultation with our lighting experts through our website or by calling our customer service line.",
        },
    ];


    return (
        <section className="">
            <div className="container mx-auto">
                <div className="space-y-2 lg:space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg shadow-sm">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value={`item-${index}`} className="border-primary">
                                    <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50 data-[state=open]:text-green-600">
                                        <span className="text-left font-medium ">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 pt-1">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
