import {Plus, Star} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent} from '@/components/ui/card'
import {useTranslations} from 'next-intl'

export function ProfileInfo() {
    const t = useTranslations('Dashboard.Candidate.Profile.Info')

    return (
        <Card className="lg:col-span-2">
            <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-8 pb-8 border-b">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                                JD
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-1">John Doe</h3>
                        <p className="text-muted-foreground mb-3">john.doe@email.com</p>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Star className="w-4 h-4"/>
                                {t('goldMember')}
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                {t('verified')}
                            </Badge>
                        </div>
                    </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-4">{t('personalInfo')}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label className="text-foreground mb-2">{t('fullName')}</Label>
                        <Input type="text" defaultValue="John Doe"/>
                    </div>
                    <div>
                        <Label className="text-foreground mb-2">{t('email')}</Label>
                        <Input type="email" defaultValue="john.doe@email.com"/>
                    </div>
                    <div>
                        <Label className="text-foreground mb-2">{t('phone')}</Label>
                        <Input type="tel" defaultValue="+49 123 456 7890"/>
                    </div>
                    <div>
                        <Label className="text-foreground mb-2">{t('location')}</Label>
                        <Input type="text" defaultValue="Berlin, Germany"/>
                    </div>
                </div>
                <div className="flex gap-3 mt-8 pt-8 border-t">
                    <Button>
                        {t('save')}
                    </Button>
                    <Button variant="outline">
                        {t('cancel')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}