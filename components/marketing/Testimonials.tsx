"use client"

import {useTranslations} from "next-intl"
import {Star} from "lucide-react"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

export default function Testimonials() {
    const t = useTranslations("homePage.testimonials")

    const testimonials = t.raw("items") as Array<{
        name: string
        role: string
        image: string
        content: string
        rating: number
    }>

    return (
        <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <Badge variant="secondary" className="mb-6 inline-flex items-center gap-2">
                        {t("badge")}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="p-6 hover:shadow-xl transition-shadow duration-300 border bg-card/80 backdrop-blur-sm"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-foreground/90 mb-6 italic leading-relaxed">
                                "{testimonial.content}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                                    <AvatarImage src={testimonial.image} alt={testimonial.name}/>
                                    <AvatarFallback>
                                        {testimonial.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}