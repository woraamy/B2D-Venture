import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header";
import TableCard from "@/components/shared/TableCard";
import Investment from "@/models/Investment";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";
import Business from "@/models/Business";
import RaiseCampaign from '@/models/RaiseCampaign';

async function fetchInvestmentData(id) {
    // fetch investment data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, { next: { revalidate: 100 } });
    const res = await response.json();
    return res.data || [];
}

export default async function Page({ params }) {
    const { id } = params;

    // Fetch business details
    const business = await Business.findById(id);
    console.log(business);

    // Fetch all Raise Campaigns for the business
    const raise_campaign_list = await RaiseCampaign.find({ business_id: id })
        .populate({
            path: 'business_id',
            populate: {
                path: 'user_id',
            },
        })
        .lean();

    // If no campaigns exist, show a message
    if (!raise_campaign_list || raise_campaign_list.length === 0) {
        return <p>No raise campaigns available for this business.</p>;
    }

    // Prepare table data for all campaigns
    const tableData = [];

    for (const campaign of raise_campaign_list) {
        const investmentData = await fetchInvestmentData(campaign._id); // Fetch investments for each campaign

        // Format investment data for each campaign, including campaign status
        const formattedData = investmentData.map((item) => [
            { value: item.created_at, type: "text" },
            {
                value: {
                    src: item.investor_id.profile_picture,
                    text: item.investor_id.user_id.username
                },
                type: "image"
            },
            { value: item.amount.toLocaleString(), type: "text" },
            { value: ((item.amount / campaign.raised) * 100).toFixed(2).toLocaleString(), type: "text" },
            { value: (item.amount / campaign.shared_price).toFixed(2).toLocaleString(), type: "text" },
            { value: campaign.status, type: "text" } // Show campaign status
        ]);

        tableData.push(...formattedData); // Add all investments for this campaign to the main table data array
    }

    // Define the headers with campaign status column
    const headData = [
        { value: "Date", type: "text" },
        { value: "Investor", type: "text" },
        { value: "Investment Money", type: "text" },
        { value: "Equity Stake", type: "text" },
        { value: "Shares Received", type: "text" },
        { value: "Campaign Status", type: "text" }
    ];

    return (
        <div>
            <div className="ml-[6%] mt-10">
                <div className="mt-7 flex flex-wrap gap-3">
                    <div className='ml-5'>
                        {/* Additional investment overview component if needed */}
                    </div>
                </div>
                <h1 className="font-bold mt-7 text-3xl">Investment History</h1>
                <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold'/>
                <div className='mb-10'>
                    {
                        tableData.map((item, index) => (
                            <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold'/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
