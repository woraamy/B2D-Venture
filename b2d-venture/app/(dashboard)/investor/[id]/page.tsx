import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { OverviewChart } from "@/components/charts/overviewchart";
import InvestHistoryCard from "@/components/shared/InvestHistoryCard"
async function fetchInvestorData(id){
    const filePath = process.cwd() + '/public/data/investor.json';
    const file = await fs.readFile(filePath);
    const data = JSON.parse(file);

    // Find the investor by ID
    return data.find((entry) => entry.id === parseInt(id, 10));

}

export default async function Page({ params }) {
    const {id} = params;
    const investor = await fetchInvestorData(id)

    if (!investor) {
        return <div>Investor not found</div>;
    }
    let chartdata1 = [];
    investor.chartData1.map((item) =>
        chartdata1.push({month: item.month, invest:item.invest})
    );

    let chartdata2 = [];
    investor.chartData2.map((item) =>
        chartdata2.push({business:item.business,raised: item.raised})
    );
    
    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            <div id="bar graph" className=" overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <InvestChart chartData={chartdata1} />
                    </div>
                </div>
            </div>
            <div id="profile" className="overflow-auto flex flex-wrap w-[30vw] h-1/2 border-b-2">
                <div className="relative ml-[15%] mt-10 flex"> 
                    <div className="relative h-[80px] w-[80px]">
                        <Image
                        src="/assets/images/profile-user.png"
                        style={{objectFit:"cover"}}
                        alt="Business Image" 
                        fill={true}
                        />
                    </div>
                    <div className="ml-2">
                        <h1 className="text-[32px] font-bold">{investor.name} {investor.lastname}</h1>
                        <span className="font-thin">{investor.username}</span>   
                    </div>
                </div>
                <div className="w-full flex flex-col min-h-full items-start ml-[15%] mt-3">
                    <p className="font-light text-[12px] mb-3 max-w-[80%]">{investor.bio}</p>
                    <Button className=" shadow hover:text-white min-w-[80%]">
                        Contact Investor
                    </Button>
                    <table className="mt-3 text-[12px] font-light">
                        <tr>
                            <td className="w-[150px]">Email </td>
                            <td >{investor.contact.Email}</td>
                        </tr>
                        <tr>
                            <td>Tel.</td>
                            <td>{investor.contact.Tel}</td>
                        </tr>
                        <tr>
                            <td>Facebook</td>
                            <td>{investor.contact.Facebook}</td>
                        </tr>
                        <tr>
                            <td>Instagram</td>
                            <td>{investor.contact.Instagram}</td>
                        </tr>
                        <tr>
                            <td>Twitter</td>
                            <td>{investor.contact.Twitter}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
                <OverviewChart chartData={chartdata2} />
            </div>
            <div id="history" className="w-[27.5vw] flex-col h-1/2 border-r-2 overflow-auto">
                <div className="ml-10 overflow-auto">
                    <h1 className="mt-3 text-xl font-semibold">Latest Investment</h1>
                    <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                        <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                        <InvestHistoryCard 
                        businessName="Atombeam"
                        businessImg="/assets/images/businessprofile/p3.png"
                        link="1" 
                        valuation="123456" 
                        raised="1000" 
                        equityStake="12"
                        shared="10" 
                        date="1/2/2024"
                        className="relative py-2"
                        />
                </div>
            </div>
            <div id="history" className="w-[30vw] h-1/2">
            
            </div>

        </div>
    </>
    );
};