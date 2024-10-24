import BusinessSideNav from "@/components/shared/BusinessDashboard/BusinessSideNav";
import Header from "@/components/shared/Header";

export default function BusinessLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const {id} = params  
  return (
        <>
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex">
            <BusinessSideNav id={id} />
            <main className="flex">{children}</main>
            </div>
        </div>
        </>
    );
};