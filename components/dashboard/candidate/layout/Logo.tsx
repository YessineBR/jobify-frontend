import { BrainCircuit } from 'lucide-react'

export function Logo() {
    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-5 sm:w-6 h-5 sm:h-6 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">Rcrut.me</span>
        </div>
    )
}