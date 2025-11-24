"use client"

import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import CTA from "@/components/marketing/CallToAction";
import ExpressVisa from "@/components/marketing/ExpressVisa";

export default function HomePage() {
    return (
        <>
            <Hero/>
            <Features/>
            <ExpressVisa/>
            <Pricing/>
            <Testimonials/>
            <CTA/>
        </>
    )
}