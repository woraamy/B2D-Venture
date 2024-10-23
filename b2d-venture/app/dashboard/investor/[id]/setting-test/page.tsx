import UploadInvestorProfile from "@/components/shared/InvestorDashboard/UploadInvestorProfile"
export default function Page({params}){
    const {id} = params
    return (
    <div>
        <UploadInvestorProfile investor_id={id} />
    </div>
    )
}