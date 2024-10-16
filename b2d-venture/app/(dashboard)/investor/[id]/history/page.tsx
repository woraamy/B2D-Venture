
import Sidenav from "@/components/shared/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
import Investment from "@/models/Investment";


export default async function Page({params}) {
    const {id} = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/Investment/${id}`);
    const res = await response.json();

    const investment = res.data || []
    console.log(investment)
    const data = investment.map((item,index)=>(
        [
            {value:item.created_at.toLocaleString(), type:"text"},
            {value:item.raise_campaign_id.business_id}
         ]
    ))
    console.log(data)
    // const data = [
    //     {value:"Date", type:"text"}, 
    //     {value:"Business", type:"text"},
    //     {value:"Raised", type:"text"},
    //     {value:"Equity Stake", type:"text"},
    //     {value:"Shared recieve", type:"text"}
    //     ]
    return(
        <div>
            {/* <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Invest History</h1>
                <TableCard data={data} className='mt-7' valueClassname='font-semibold'/>
            </div> */}
        </div>
    );
};