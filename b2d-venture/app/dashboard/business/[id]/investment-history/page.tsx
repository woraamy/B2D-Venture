import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/BusinessDashboard/TableCard";
import Investment from "@/models/Investment";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";
import Business from "@/models/Business";

async function fetchInvestmentData(id) {
    // fetch investment data 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, { next: { revalidate: 100 }});
    const res = await response.json();
    return res.data || [];
}

export default async function Page({params}) {
    const {id} = params;

    const business = await Business.findById(id);
    console.log(business);

    //Fetch Raise Campaign data
    const response_raise_campaign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${business._id}`, {
        next: { tags: ['collection'] },
    });    
    const raise_campaign_json = await response_raise_campaign.json();
    const raise_campaign = raise_campaign_json.data[0];

    const investment = await fetchInvestmentData(raise_campaign._id);
    
    const data = investment.map((item, index) => (
        [
            { value: item.created_at, type: "text" },
            {
                value: {
                    src: item.investor_id.profile_picture,  // Access profile picture from populated investor_id
                    text: item.investor_id.user_id.username // Access username from populated investor_id
                },
                type: "image"
            },
            { value: item.amount.toLocaleString(), type: "text" },
            { value: ((item.amount / item.raise_campaign_id.raised) * 100).toFixed(2).toLocaleString(), type: "text" },
            { value: (item.amount / item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type: "text" },
        ]
    ));
    
    const headData = [
        {value:"Date", type:"text"}, 
        {value:"Investor", type:"text"},
        {value:"Investment Money", type:"text"},
        {value:"Equity Stake", type:"text"},
        {value:"Shared recieve", type:"text"}
        ]
    return(
        <div>
            <div className="ml-[6%] mt-10">
                <div className="mt-7 flex flex-wrap gap-3">
                    <div className='ml-5'>
                    {/* {overview.map((item, index)=>(   
                        <InvestHistoryCard 
                        key = {index}
                        businessName={item.name}
                        businessImg={item.profile}
                        link={item.link}
                        valuation={item.valuation.toLocaleString()}
                        raised={item.totalRaised.toLocaleString()}
                        equityStake={((item.totalRaised/item.valuation)*100).toFixed(2).toLocaleString()}
                        shared={(item.totalRaised/item.shared).toFixed(2).toLocaleString()}
                        className="relative py-2"
                        />
                    ))} */}
                    </div>
                    </div>
                <h1 className="font-bold mt-7 text-3xl">Investment History</h1>
                <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold'/>
                <div className='mb-10'>
                    {
                        data.map((item,index)=>(
                            <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold'/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};