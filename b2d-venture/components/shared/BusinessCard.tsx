import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const BusinessCard = () => {
 return (
    <div>
        <Card className="max-w-sm mx-auto bg-[#F2EBEB]">
            <CardHeader>
            <CardTitle>Card Title</CardTitle>
            </CardHeader>
        </Card>
    </div>
 );
};

export default BusinessCard;