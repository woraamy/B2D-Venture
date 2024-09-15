import Sidenav from "@/components/shared/SideNav";
export default function InvestLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Sidenav />
        </>
    );
};