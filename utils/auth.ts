export const redirectToDashboard = (userType: "applicant" | "company") => {
    if (typeof window !== "undefined") {
        window.location.href = userType === "applicant"
            ? "/dashboard/applicant"
            : "/dashboard/company"
    }
}