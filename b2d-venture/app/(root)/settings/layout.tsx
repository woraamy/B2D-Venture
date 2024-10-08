import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/ui/sidebar-nav"

export const metadata: Metadata = {
  title: "Setting",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  // {
  //   title: "Profile",
  //   href: "/settings/profile",
  // },
  {
    title: "Account",
    href: "/settings/account",
  },
  // {
  //   title: "Appearance",
  //   href: "/settings/appearance",
  // },
  // {
  //   title: "Notifications",
  //   href: "/settings/notifications",
  // },

]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 ml-10 mr-10 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set your preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
