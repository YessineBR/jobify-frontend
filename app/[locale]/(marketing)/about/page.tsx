import {Hero} from "@/components/marketing/about/Hero"
import {Mission} from "@/components/marketing/about/Mission"
import {Story} from "@/components/marketing/about/Story"
import {Values} from "@/components/marketing/about/Values"
import {Team} from "@/components/marketing/about/Team"
import {Stats} from "@/components/marketing/about/Stats"
import {CTA} from "@/components/marketing/about/CTA"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "About Us – LIMA",
    description: "We help talented professionals move to Germany with AI-powered job matching and express visa support.",
}

export default function AboutPage() {
    return (
        <>
            <Hero/>
            <Mission/>
            <Story/>
            <Values/>
            <Stats/>
            <Team/>
            <CTA/>
        </>
    )
}