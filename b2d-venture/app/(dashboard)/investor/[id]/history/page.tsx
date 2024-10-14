import Sidenav from "@/components/shared/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
export default function Page() {
    const data = [
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
                <TableCard data={data} className='mt-7' valueClassname='font-semibold'/>
            </div>
        </div>
    );
};