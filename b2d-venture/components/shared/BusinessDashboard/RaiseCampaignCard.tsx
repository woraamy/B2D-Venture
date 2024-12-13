// RaiseCampaignCard.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaTag, FaCalendarAlt } from "react-icons/fa";
import parse from "html-react-parser";

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
  investment_benefit,
  businessId
}) => {
  return (
    <div className="flex justify-center mt-10">
      <Card className="shadow-lg overflow-hidden bg-white rounded-xl border border-gray-200 max-w-3xl w-full">
        <CardHeader className="p-6 bg-gradient-to-r from-pink-400 to-blue-400 text-white">
          <h2 className="text-3xl font-bold">{businessName}</h2>

        </CardHeader>
        <CardContent className="">
        <div className="flex flex-col gap-2">
          {/* Status and Investment Benefit */}
          <div className="mt-4">
            <p className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Status: {status}
            </p>
            {investment_benefit && (
              <p className="mt-2"><strong>Investment Benefit:</strong> {investment_benefit}</p>
            )}
          </div>
          {/* Campaign Dates */}
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <strong>Start Date:</strong> {new Date(start_date).toLocaleDateString('en-GB')}
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <strong>End Date:</strong> {new Date(end_date).toLocaleDateString('en-GB')}
            </div>
          </div>
            <p className="text-xl"><strong>Detail</strong></p>  
            <p><strong className="text-gray-700">Raised:</strong> ${raised}</p>
            <p><strong className="text-gray-700">Goal:</strong> ${goal}</p>
            <p><strong className="text-gray-700">Minimum Investment:</strong> ${min}</p>
            <p><strong className="text-gray-700">Maximum Investment:</strong> ${max}</p>
            <p><strong className="text-gray-700">Share Price:</strong> ${shared_price}</p>
            <p><strong className="text-gray-700">Valuation:</strong> ${valuation}</p>
          </div>
          <p className="mt-2 text-xl"><strong>Description Preview</strong></p>
          <div className="mt-2 text-md">{parse(description)}</div>

          {/* Tags */}
          {Array.isArray(tag) && tag.length > 0 && (
            <div className="mt-4">
              <h4 className="flex items-center text-gray-700 font-medium">
                <FaTag className="mr-2 text-gray-500" />
                Tags:
              </h4>
              <div className="flex flex-wrap mt-2 gap-2">
                {tag.map((t, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RaiseCampaignCard;
