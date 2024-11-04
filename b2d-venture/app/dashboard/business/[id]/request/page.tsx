import useSWR from 'swr';
import Sidenav from "@/components/shared/InvestorDashboard/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
import Investment from "@/models/Investment";
import InvestHistoryCard from "@/components/shared/InvestorDashboard/InvestHistoryCard";
import { OverviewChart } from "@/components/charts/overviewchart";
import Business from "@/models/Business";


export default async function Page({params}) {
    const {id} = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/InvestorRequest/${id}/business`, { next: { revalidate: 100 }});
    const res = await response.json();
    const request = res.data || [];
    
    const data = request.map((item, index) => (
        [
          
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
                 
                    </div>
                    </div>
                <h1 className="font-bold mt-7 text-3xl">Investment History</h1>
               
            </div>
        </div>
    );
};