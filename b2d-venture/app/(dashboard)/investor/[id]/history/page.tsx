import Sidenav from "@/components/shared/InvestorSideNav";
import Header from "@/components/shared/Header"
import TableCard from "@/components/shared/TableCard";
export default function Page() {
    const data = ["Date", "Business", "Raised", "Equity Stake", "Shared recieve"]
    return(
        <div>
            <TableCard data={data} />
        </div>
    );
};