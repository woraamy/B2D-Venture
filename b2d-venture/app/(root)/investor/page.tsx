import { Button } from "@/components/ui/button";
import { InvestChart } from "@/components/charts/investchart";
export default function Page() {
    return(
        <>
        <div className=" flex flex-wrap w-[85vw] h-[100%]">
            <div id="bar graph" className=" overflow-auto flex w-[55vw] h-1/2 border-r-2 border-b-2">
                <div className="mt-5 ml-10">
                    <h1 className="text-[32px] font-bold">Dashboard</h1>                    
                    <div className="ml-3">
                        <InvestChart />
                    </div>
                </div>
            </div>
            <div id="profile" className="w-[30vw] h-1/2 border-b-2 ">
            
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