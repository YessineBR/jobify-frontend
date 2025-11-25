// utils/statusUtils.ts
import {CheckCircle2, XCircle, AlertCircle, Clock} from 'lucide-react'

export const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
        case "interview":
        case "confirmed":
        case "upcoming":
            return "text-green-600 bg-green-50";
        case "pending":
            return "text-yellow-600 bg-yellow-50";
        case "rejected":
            return "text-red-600 bg-red-50";
        default:
            return "text-gray-600 bg-gray-50";
    }
};

export const getStatusIcon = (status: string) => {
    switch (status) {
        case "approved":
        case "interview":
        case "confirmed":
        case "upcoming":
            return CheckCircle2;
        case "pending":
            return AlertCircle;
        case "rejected":
            return XCircle;
        default:
            return Clock;
    }
};