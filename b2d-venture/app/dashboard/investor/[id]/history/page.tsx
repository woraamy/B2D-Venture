import TableCard from "@/components/shared/TableCard";
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`, { next: { revalidate: 100 }});
    const res = await response.json();
    return res.data || [];
}

function getPieChartData(data) {
    const totalRaised = data.reduce((total, cur) => {
        const business = cur.raise_campaign_id.business_id._id;
        const name = cur.raise_campaign_id.business_id.BusinessName;
        const amount = cur.amount;

        if (!total[business]) {
            total[business] = {
                business: name,
                raised: 0,
            };
        }
        total[business].raised += amount;   
        return total;

    }, {});

    const chartData = Object.values(totalRaised);
    const pieData = chartData.map((item, index) => ({
        ...(typeof item === 'object' ? item : {}),  
        fill: `var(--color-chart${index % 5 + 1})` 
    }));
    return pieData;
}

export default async function Page({params}) {
    const {id} = params;
    const investment = await fetchInvestmentData(id)
    const overview = getOverviewData(investment)
    
    const data = investment.map((item,index)=>(
        [
            {value:item.created_at, type:"text"},
            {value:{src:item.raise_campaign_id.business_id.profile, text:item.raise_campaign_id.business_id.BusinessName},type:"image"},
            {value:item.amount.toLocaleString(), type:"text"},
            {value:((item.amount/item.raise_campaign_id.raised)*100).toFixed(2).toLocaleString(), type:"text"},
            {value:(item.amount/item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type:"text"},
         ]
    ))
    console.log(data)
    const headData = [
        {value:"Date", type:"text"}, 
        {value:"Business", type:"text"},
        {value:"Investment Money", type:"text"},
        {value:"Equity Stake", type:"text"},
        {value:"Shared recieve", type:"text"}
        ]
    const pieChartdata = getPieChartData(investment)
    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Overview Investment</h1>
                <div className="mt-7 flex flex-wrap gap-3">
                    <div><OverviewChart chartData={pieChartdata}/></div>
                    <div className='ml-5'>
                    {overview.map((item: any, index)=>(   
                        <InvestHistoryCard 
                            key = {index}
                            businessName={item.name}
                            businessImg={item.profile}
                            link={item.link}
                            valuation={item.valuation.toLocaleString()}
                            raised={item.totalRaised.toLocaleString()}
                            equityStake={((item.totalRaised/item.valuation)*100).toFixed(2).toLocaleString()}
                            shared={(item.totalRaised/item.shared).toFixed(2).toLocaleString()}
                            date={item.created_at}
                            className="relative py-2"
                        />
                    ))}
                    </div>
                    </div>
                <h1 className="font-bold mt-7 text-3xl">Invest History</h1>
                <TableCard data={headData} className='mt-7 mb-5' valueClassname='font-semibold' onDelete=""/>
                <div className='mb-10'>
                    {
                        data.map((item,index)=>(
                            <TableCard key={index} data={item} className='mt-3' valueClassname='font-semibold' onDelete=""/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};