import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
import { promises as fs } from "fs";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
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
    let chartdata = [];
    investor.chartData.map((item) =>
        chartdata.push({month: item.month, invest:item.invest})
    );
    
    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            <div id="bar graph" className=" overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <InvestChart chartData={chartdata} />
                    </div>
                </div>
            </div>
            <div id="profile" className="w-[30vw] h-1/2 border-b-2 ">
                <div className="relative ml-7 mt-5 flex "> 
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
            </div>
            <div id="overview" className="w-[27.5vw] h-1/2 border-r-2">
            
            </div>
            <div id="history" className="w-[27.5vw] h-1/2 border-r-2">
            
            </div>
            <div id="history" className="w-[30vw] h-1/2">
            
            </div>

        </div>
    </>
    );
};