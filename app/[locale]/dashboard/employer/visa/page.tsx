// app/dashboard/candidate/visa/page.tsx
'use client'

import { useState } from 'react'
import { VisaStatusCard } from '@/components/dashboard/candidate/VisaStatusCard'
import { DocumentsList } from '@/components/dashboard/candidate/DocumentsList'
import { PricingInfo } from '@/components/dashboard/candidate/PricingInfo'
import { PaymentOverlay } from '@/components/dashboard/candidate/PaymentOverlay'
import { PaymentModal } from '@/components/PaymentModal'
import { useTranslations } from 'next-intl'

const visaStatus = {
    stage: "Documents Under Review",
    progress: 65,
    expectedDate: "December 15, 2025",
    documents: [
        { name: "Passport Copy", status: "approved" },
        { name: "Job Offer Letter", status: "approved" },
        { name: "Educational Certificates", status: "pending" },
        { name: "Financial Statements", status: "approved" },
    ],
}

export default function VisaPage() {
    const t = useTranslations('Dashboard.Candidate.Visa')
    const [visaPaid, setVisaPaid] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    return (
        <div className="space-y-6">
            {showPaymentModal && (
                <PaymentModal
                    onClose={() => setShowPaymentModal(false)}
                    onPaymentComplete={() => {
                        setVisaPaid(true)
                        setShowPaymentModal(false)
                    }}
                />
            )}
            <div>
                <h2 className="text-2xl mb-2">{t('title')}</h2>
                <p>{t('description')}</p>
            </div>
            <VisaStatusCard visaStatus={visaStatus} />
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="relative">
                    {!visaPaid && <PaymentOverlay onPay={() => setShowPaymentModal(true)} />}
                    <DocumentsList documents={visaStatus.documents} disabled={!visaPaid} />
                </div>
                <PricingInfo visaPaid={visaPaid} onPay={() => setShowPaymentModal(true)} />
            </div>
        </div>
    )
}