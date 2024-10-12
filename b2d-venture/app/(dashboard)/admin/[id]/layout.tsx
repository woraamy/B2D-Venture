"use client";

import AdminSideNav from "@/components/shared/AdminSideNav";

export default function AdminLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { id } = params; 
  return (
    <>
      <div className="flex">
        <AdminSideNav id={id} /> 
        <main className="flex">{children}</main>
      </div>
    </>
  );
}
