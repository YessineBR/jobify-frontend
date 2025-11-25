import {useState} from "react";
import {
    X,
    CreditCard,
    Lock,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    Info
} from "lucide-react";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";

interface PaymentModalProps {
    onClose: () => void;
    onPaymentComplete: () => void;
}

export function PaymentModal({onClose, onPaymentComplete}: PaymentModalProps) {
    const t = useTranslations("Dashboard.Candidate.Visa.PaymentModal");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "sofort">("card");
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentComplete();
        }, 2000);
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-[100vh] w-[100vw] flex items-center justify-center z-[100] p-4">
            <div
                className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div
                    className="sticky top-0 bg-background border-b px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{t('title')}</h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t('subtitle')}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="flex-shrink-0"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6"/>
                    </Button>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-3 space-y-6">
                            <form onSubmit={handlePayment} className="space-y-6">
                                {/* Payment Method Selection */}
                                <div>
                                    <Label className="text-foreground mb-3">{t('paymentMethod')}</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <Button
                                            type="button"
                                            variant={paymentMethod === "card" ? "secondary" : "outline"}
                                            onClick={() => setPaymentMethod("card")}
                                            className="h-auto py-4 flex-col gap-2"
                                        >
                                            <CreditCard className={`w-6 h-6 ${
                                                paymentMethod === "card" ? "text-primary" : "text-muted-foreground"
                                            }`}/>
                                            <div className={`text-sm ${
                                                paymentMethod === "card" ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                                {t('methods.card')}
                                            </div>
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={paymentMethod === "paypal" ? "secondary" : "outline"}
                                            onClick={() => setPaymentMethod("paypal")}
                                            className="h-auto py-4 flex-col gap-2"
                                        >
                                            <div className={`text-xl ${
                                                paymentMethod === "paypal" ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                                PayPal
                                            </div>
                                            <div className={`text-sm ${
                                                paymentMethod === "paypal" ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                                {t('methods.paypal')}
                                            </div>
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={paymentMethod === "sofort" ? "secondary" : "outline"}
                                            onClick={() => setPaymentMethod("sofort")}
                                            className="h-auto py-4 flex-col gap-2"
                                        >
                                            <div className={`text-xl ${
                                                paymentMethod === "sofort" ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                                Sofort
                                            </div>
                                            <div className={`text-sm ${
                                                paymentMethod === "sofort" ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                                {t('methods.sofort')}
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="space-y-4">
                                        {/* Card Number */}
                                        <div>
                                            <Label className="text-foreground mb-2">{t('card.number')}</Label>
                                            <div className="relative">
                                                <CreditCard
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                                <Input
                                                    type="text"
                                                    value={cardData.number}
                                                    onChange={(e) => setCardData({...cardData, number: e.target.value})}
                                                    placeholder={t('card.numberPlaceholder')}
                                                    className="pl-10"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Card Name */}
                                        <div>
                                            <Label className="text-foreground mb-2">{t('card.holder')}</Label>
                                            <Input
                                                type="text"
                                                value={cardData.name}
                                                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                                                placeholder={t('card.holderPlaceholder')}
                                                required
                                            />
                                        </div>

                                        {/* Expiry & CVV */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-foreground mb-2">{t('card.expiry')}</Label>
                                                <Input
                                                    type="text"
                                                    value={cardData.expiry}
                                                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                                                    placeholder={t('card.expiryPlaceholder')}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-foreground mb-2">{t('card.cvv')}</Label>
                                                <Input
                                                    type="text"
                                                    value={cardData.cvv}
                                                    onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                                                    placeholder={t('card.cvvPlaceholder')}
                                                    maxLength={3}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "paypal" && (
                                    <div className="py-8 text-center">
                                        <div
                                            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <div className="text-2xl text-primary">PayPal</div>
                                        </div>
                                        <p className="text-muted-foreground mb-4">
                                            {t('paypal.description')}
                                        </p>
                                        <Button
                                            type="submit"
                                            size="lg"
                                        >
                                            {t('paypal.button')}
                                        </Button>
                                    </div>
                                )}

                                {paymentMethod === "sofort" && (
                                    <div className="py-8 text-center">
                                        <div
                                            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <div className="text-2xl text-primary">Sofort</div>
                                        </div>
                                        <p className="text-muted-foreground mb-4">
                                            {t('sofort.description')}
                                        </p>
                                        <Button
                                            type="submit"
                                            size="lg"
                                        >
                                            {t('sofort.button')}
                                        </Button>
                                    </div>
                                )}

                                {/* Security Notice */}
                                <Card className="bg-muted/50">
                                    <CardContent className="p-4 flex items-start gap-3">
                                        <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"/>
                                        <div className="text-sm">
                                            <span className="font-medium text-foreground">{t('security.title')}</span>
                                            <span className="text-muted-foreground"> {t('security.description')}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Submit Button for Card */}
                                {paymentMethod === "card" && (
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isProcessing}
                                        className="w-full gap-2 text-lg"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div
                                                    className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"/>
                                                <span>{t('processing')}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5"/>
                                                <span>{t('payButton', {amount: 999})}</span>
                                                <ArrowRight className="w-5 h-5"/>
                                            </>
                                        )}
                                    </Button>
                                )}
                            </form>

                            {/* Info */}
                            <Card>
                                <CardContent className="p-4 flex items-start gap-3 text-primary">
                                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                                    <p className="text-sm">
                                        {t('info.description')}
                                    </p>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-8 space-y-6">
                                {/* Summary Card */}
                                <Card className="bg-primary text-primary-foreground">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3 mb-6">
                                            <div
                                                className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Sparkles className="w-6 h-6"/>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-1">{t('summary.title')}</h3>
                                                <p className="text-primary-foreground/80 text-sm">
                                                    {t('summary.description')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6 pb-6 border-b border-primary-foreground/20">
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="text-primary-foreground/80">{t('summary.serviceFee')}</span>
                                                <span>€588</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="text-primary-foreground/80">{t('summary.officialFees')}</span>
                                                <span>€411</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-2xl font-bold">
                                            <span>{t('summary.total')}</span>
                                            <span>€999</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Benefits */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h4 className="text-lg font-semibold text-foreground mb-4">{t('benefits.title')}</h4>
                                        <ul className="space-y-3">
                                            {[
                                                t('benefits.fastProcessing'),
                                                t('benefits.personalAdvisor'),
                                                t('benefits.documentReview'),
                                                t('benefits.appointmentBooking'),
                                                t('benefits.statusTracking'),
                                                t('benefits.moneyBackGuarantee'),
                                            ].map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle2
                                                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"/>
                                                    <span className="text-muted-foreground text-sm">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}