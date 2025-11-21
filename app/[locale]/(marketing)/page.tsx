import Hero from "@/components/marketing/Hero"
import Features from "@/components/marketing/Features"
import HowItWorks from "@/components/marketing/HowItWorks"
import Testimonials from "@/components/marketing/Testimonials"
import Pricing from "@/components/marketing/Pricing"
import CallToAction from "@/components/marketing/CallToAction"

export default function HomePage() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">
            <Hero/>
            <Features/>
            <HowItWorks/>
            <Testimonials/>
            <Pricing/>
            <CallToAction/>
        </section>
    )
}
