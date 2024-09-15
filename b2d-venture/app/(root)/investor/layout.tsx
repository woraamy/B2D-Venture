import Sidenav from "@/components/shared/SideNav";
export default function InvestLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className="flex">
            <Sidenav />
            <main className="flex">{children}</main>
        </div>
        </>
    );
};