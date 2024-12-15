"use client";

import AdminSideNav from "@/components/shared/AdminDashboard/AdminSideNav";

export default function AdminLayout({ children }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <div className="flex">
        <AdminSideNav /> 
        <main className="flex">{children}</main>
      </div>
    </>
  );
}
