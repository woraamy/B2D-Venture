
import Link from "next/link";
import FileContainer from "@/components/shared/BusinessDashboard/FileContainer";
import DataRoom from "@/models/DataRoom";
import Investor from "@/models/Investor"

async function findDataroom(business_id) {
    const dataroom = await DataRoom.find({ business_id }).populate('files');
    return dataroom;
}

export default async function Page({ params }) {
    const view = [
        { value: "Business", type: "text" }
    ];
    const { id } = params;

    // Fetch data from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/InvestorRequest/${id}/investor`, { next: { tags: ['collection'] } });
    const res = await response.json();
    const data = res.data || [];

    // Filter the data
    const filteredData = data.filter((item) => item.status_from_business === "approved");

    // Find user Id
    const investor = await Investor.findById(id)
    const user_id = investor.user_id.toString()

    // Check if filteredData is empty
    if (filteredData.length === 0) {
        return (
            <div>
                <div className="ml-[6%] mt-10">
                    <h1 className="font-bold text-3xl">Shared Information</h1>
                    <div className="flex mt-5">
                        <Link href='status' className="text-xl text-gray-400">Status</Link>
                        <Link href='file' className="text-xl ml-10 text-[#FF553E] underline">Allowed file</Link>
                    </div>
                    <h1>No Allowed Business information Access</h1>
                </div>
            </div>
        );
    }

    // Prepare to render approved businesses with their files
    return (
        <div>
            <div className="ml-[6%] mt-10">
                <h1 className="font-bold text-3xl">Shared Information</h1>
                <div className="flex mt-5">
                    <Link href='status' className="text-xl text-gray-400">Status</Link>
                    <Link href='file' className="text-xl ml-10 text-[#FF553E] underline">Allowed file</Link>
                </div>

                <div className="mt-10">
                    {await Promise.all(filteredData.map(async (item, index) => {
                        const datarooms = await findDataroom(item.business_id);
                        const files = datarooms[0]?.files || []; 
                        console.log(datarooms)
                        return (
                            <div key={index} className="flex flex-col w-[75vw] px-5 py-5 mb-5 bg-white rounded-md shadow-md">
                                <h1 className="font-semibold text-xl mb-3">{item.business_id.BusinessName || ""}</h1>
                                <div>
                                    {files.length > 0 ? (
                                        files.map((file, fileIndex) => (
                                            <div key={fileIndex} className="my-2">
                                                <FileContainer 
                                                    key={index} 
                                                    name={file.name} 
                                                    user_id={user_id}
                                                    file_path={file.file_path}
                                                    role="investor"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No files available</p>
                                    )}
                                </div>
                            </div>
                        );
                    }))}
                </div>
            </div>
        </div>
    );
}
