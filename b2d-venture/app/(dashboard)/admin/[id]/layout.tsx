"use client";

import AdminSideNav from "@/components/shared/AdminSideNav";

export default function AdminLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { id } = params; // Destructure params to get the id
  return (
    <>
      <div className="flex">
        <AdminSideNav id={id} /> {/* Pass id to AdminSideNav */}
        <main className="flex">{children}</main>
      </div>
    </>
  );
}
