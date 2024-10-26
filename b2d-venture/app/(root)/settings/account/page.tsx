import { Separator } from "@/components/ui/separator"
import { AccountForm } from "@/components/shared/account-form"
import { InvestorAccountForm } from "@/components/shared/AccountForms/InvestorAccountForm"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <InvestorAccountForm />
    </div>
  )
}