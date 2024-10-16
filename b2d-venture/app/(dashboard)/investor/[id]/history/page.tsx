
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/InvestorDashboard/TableCard";
import Investment from "@/models/Investment";


export default async function Page({params}) {
    const {id} = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`);
    const res = await response.json();

    const investment = res.data || []
    const data = investment.map((item,index)=>(
        [
            {value:item.created_at, type:"text"},
            {value:{src:item.raise_campaign_id.business_id.profile, text:item.raise_campaign_id.business_id.BusinessName},type:"image"},
            {value:item.raise_campaign_id.raised.toLocaleString(), type:"text"},
            {value:((item.amount/item.raise_campaign_id.raised)*100).toFixed(2).toLocaleString(), type:"text"},
            {value:(item.amount/item.raise_campaign_id.shared_price).toFixed(2).toLocaleString(), type:"text"},
         ]
    ))
    console.log(data)
    const headData = [
        {value:"Date", type:"text"}, 
        {value:"Business", type:"text"},
        {value:"Raised", type:"text"},
        {value:"Equity Stake", type:"text"},
        {value:"Shared recieve", type:"text"}
        ]
    return(
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Invest History</h1>
                <TableCard data={headData} className='mt-7' valueClassname='font-semibold'/>
                <div>
                    {
                        data.map((item,index)=>(
                            <TableCard data={item} className='mt-7' valueClassname='font-semibold'/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};