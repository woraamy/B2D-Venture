// RaiseCampaignCard.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Importing from UI components

const RaiseCampaignCard = ({
  className,
  businessName,
  description,
  raised,
  min,
  max,
  valuation,
  start_date,
  end_date,
  shared_price,
  tag,
  goal,
  status,
  businessId // Pass the business ID for dynamic routing
}) => {
  return (
    <div className={className}>
      <Card className="shadow-md overflow-hidden relative bg-white rounded-xl">
        <CardHeader>
          <h2 className="text-2xl font-semibold">{businessName}</h2>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-md">{description}</p>
          <div className="mt-4">
            <p><strong>Raised:</strong> ${raised}</p>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Minimum Investment:</strong> ${min}</p>
            <p><strong>Maximum Investment:</strong> ${max}</p>
            <p><strong>Share Price:</strong> ${shared_price}</p>
            <p><strong>Valuation:</strong> ${valuation}</p>
            <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString('en-US')}</p>
            <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString('en-US')}</p>
            <p><strong>Status:</strong> {status}</p>
          </div>
          <div className="mt-4">
            <p><strong>Tags:</strong> {Array.isArray(tag) && tag.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaiseCampaignCard;
