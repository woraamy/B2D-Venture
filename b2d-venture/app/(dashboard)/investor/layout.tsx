
import InvestorSidenav from "@/components/shared/InvestorSideNav";
import Header from "@/components/shared/Header";
export default function InvestLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const {id} = params  
  return (
        <>
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex">
            <InvestorSidenav id={id} />
            <main className="flex">{children}</main>
            </div>
        </div>
        </>
    );
};