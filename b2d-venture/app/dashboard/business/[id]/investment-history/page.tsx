import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/InvestorDashboard/TableCard";
import Investment from "@/models/Investment";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";
function getOverviewData(data){
    const totalRaised = data.reduce((total, cur)=>{
        const business = cur.raise_campaign_id.business_id._id;
        const name = cur.raise_campaign_id.business_id.BusinessName
        const amount = cur.amount;
        if(!total[business]){
            total[business] ={
                name: name,
                totalRaised: 0,
                link: business,
                profile: cur.raise_campaign_id.business_id.profile,
                shared: cur.raise_campaign_id.shared_price,
                valuation: cur.raise_campaign_id.business_id.valuation
            }
        };
        total[business].totalRaised += amount;
        return total;
    }, {})
    const overview = Object.values(totalRaised)
    return overview
}

async function fetchInvestmentData(id) {
    // fetch investment data 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, { next: { revalidate: 100 }});
    const res = await response.json();
    return res.data || [];
}

export default async function Page({params}) {
    const {id} = params;

    // Fetch business data
    const response_business = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Business/${id}`, {
        next: { tags: ['collection'] },
    });
    const business_json = await response_business.json();
    const business = business_json.data;

    //Fetch Raise Campaign data
    const response_raise_campaign = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${business._id}`, {
        next: { tags: ['collection'] },
    });    
    const raise_campaign_json = await response_raise_campaign.json();
    const raise_campaign = raise_campaign_json.data[0];

    const investment = await fetchInvestmentData(raise_campaign._id);
    console.log(investment);
    // const overview = getOverviewData(investment)
    
    const data = investment.map((item,index)=>(
        [
            {value:item.created_at, type:"text"},
            {value:{src:item.investor_id.profile_picture, text:item.investor_id.user_id.username},type:"image"},
            {value:item.amount.toLocaleString(), type:"text"},
            {value:((item.amount/item.raise_campaign_id.raised)*100).toFixed(2).toLocaleString(), type:"text"},
            {value:(item.amount/item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type:"text"},
         ]
    ))
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