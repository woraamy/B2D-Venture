"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/ui/tag"; // Adjust this based on your folder structure
import { Button } from "@/components/ui/button"; // Assuming you have a Button component for "Edit" and "Create"

const BusinessRaiseCampaignCard = ({
  className,
  coverimg,
  profile,
  name,
  description,
  raised,
  investors,
  min,
  valuation,
  link,
  tag,
  businessId 
}) => {
  return (
    <div className={className}>
      <Card className="shadow-md overflow-hidden relative w-[500px] h-auto bg-white rounded-xl">
        <CardHeader className="relative flex-grow h-60 p-0 m-0">
          <div className="relative w-full h-full">
            <Image
              src={coverimg}
              style={{ objectFit: "cover" }}
              alt="Business Cover Image"
              fill={true}
              className="rounded-t-xl"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <div className="relative w-[60px] h-[60px]">
              <Image
                src={profile}
                style={{ objectFit: "cover" }}
                alt="Business Profile Image"
                fill={true}
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {description}
              </CardDescription>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(tag) &&
                tag.map((tag, index) => (
                  <Tag className="pr-2" key={index} tagName={tag} />
                ))}
            </div>
          </div>

          <div className="mt-6">
            <hr className="mb-4 border-t border-gray-300" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold">{raised}</p>
                <p className="text-sm text-gray-500">Raised</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{investors}</p>
                <p className="text-sm text-gray-500">Investors</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{min}</p>
                <p className="text-sm text-gray-500">Min. Investment</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{valuation}</p>
                <p className="text-sm text-gray-500">Valuation</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between mt-6 p-4 bg-gray-50">
          <Link href={`/dashboard/business/${businessId}/edit-campaign`}>
            <Button variant="outline">Edit Campaign</Button>
          </Link>
          <Link href={`/dashboard/business/${businessId}/create-campaign`}>
            <Button>Create Campaign</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessRaiseCampaignCard;
