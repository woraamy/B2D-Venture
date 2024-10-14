"use client";

import AdminSideNav from "@/components/shared/AdminSideNav";

export default function AdminLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <div className="flex">
        <AdminSideNav /> 
        <main className="flex">{children}</main>
      </div>
    </>
  );
}
