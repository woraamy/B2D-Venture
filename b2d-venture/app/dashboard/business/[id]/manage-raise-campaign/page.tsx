import { useState } from "react";
import Link from "next/link";
import { Toast, Toaster } from "react-hot-toast";
import {toast} from "react-hot-toast";
import RaiseCampaignCard from "@/components/shared/BusinessDashboard/RaiseCampaignCard";
import Modal from "@/components/ui/modal";

export default async function ManageRaiseCampaignPage({ params }) {
    const { id } = params;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        description: '',
        raised: '',
        min: '',
        max: '',
        valuation: '',
        goal: '',
        shared_price: '',
        start_date: '',
        end_date: '',
    });

    // Fetch campaign data
    const campaignUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/fetchingData/RaiseCampaign/businessId/${id}`;
    let status = "Open";

    try {
        const response = await fetch(campaignUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch raise campaign data");
        }
        const data = await response.json();
        const campaignData = data.data[0];

        // Determine campaign status based on end_date
        if (new Date(campaignData.end_date) < new Date()) {
            status = "Closed";
        }

        // Update form data for the Edit modal
        const handleEditClick = () => {
            if (status === "Closed") {
                toast({
                    title: "Cannot Edit",
                    description: "You cannot edit a raise campaign that is closed.",
                    variant: "destructive",
                });
            } else {
                setFormData({
                    businessName: campaignData.business_id.BusinessName,
                    description: campaignData.business_id.description,
                    raised: campaignData.raised,
                    min: campaignData.min_investment,
                    max: campaignData.max_investment,
                    valuation: campaignData.business_id.valuation,
                    goal: campaignData.goal,
                    shared_price: campaignData.shared_price,
                    start_date: campaignData.start_date,
                    end_date: campaignData.end_date,
                });
                setIsEditModalOpen(true);
            }
        };

        const handleCreateClick = () => {
            if (status === "Open") {
                toast({
                    title: "Cannot Create",
                    description: "You cannot create a new raise campaign while one is still open.",
                    variant: "destructive",
                });
            } else {
                setIsCreateModalOpen(true);
            }
        };

        // Handle form submission for editing a campaign
        const handleEditSubmit = async (e) => {
            e.preventDefault();
            // API call to update the campaign
            const updateUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/updateRaiseCampaign/${id}`;
            const response = await fetch(updateUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Campaign updated successfully!",
                    variant: "success",
                });
                setIsEditModalOpen(false);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to update campaign.",
                    variant: "destructive",
                });
            }
        };

        // Handle form submission for creating a campaign
        const handleCreateSubmit = async (e) => {
            e.preventDefault();
            // API call to create a new campaign
            const createUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/createRaiseCampaign`;
            const response = await fetch(createUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success("Campaign created successfully!");
                setIsCreateModalOpen(false);
            } else {
                toast.error("Failed to create campaign.");
            }
        };

        return (
            <div className="flex flex-col items-center space-y-8 w-[80vw]">
                <Toaster />
                <div className="text-center">
                    <h3 className="text-lg font-medium">Manage Raise Campaign</h3>
                    <p className="text-sm text-muted-foreground">
                        View and manage your raise campaign information.
                    </p>
                </div>

                {/* Display the campaign data using RaiseCampaignCard */}
                {campaignData ? (
                    <RaiseCampaignCard
                        className=""
                        businessName={campaignData.business_id.BusinessName}
                        description={campaignData.business_id.description}
                        raised={campaignData.raised.toLocaleString()}
                        min={campaignData.min_investment.toLocaleString()}
                        max={campaignData.max_investment.toLocaleString()}
                        valuation={campaignData.business_id.valuation.toLocaleString()}
                        start_date={campaignData.start_date}
                        end_date={campaignData.end_date}
                        shared_price={campaignData.shared_price.toLocaleString()}
                        tag={campaignData.business_id.tag_list}
                        goal={campaignData.goal.toLocaleString()}
                        status={status}
                        businessId={id} // Passing the business ID for dynamic routes
                    />
                ) : (
                    <p>No raise campaign found for this business.</p>
                )}

                {/* Action buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit Campaign
                    </button>
                    <button
                        onClick={handleCreateClick}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Create Campaign
                    </button>
                </div>

                {/* Modal for editing */}
                {isEditModalOpen && (
                    <Modal onClose={() => setIsEditModalOpen(false)}>
                        <h2>Edit Raise Campaign</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Business Name" required />
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required />
                            <input type="number" value={formData.raised} onChange={(e) => setFormData({ ...formData, raised: e.target.value })} placeholder="Raised" required />
                            <input type="number" value={formData.min} onChange={(e) => setFormData({ ...formData, min: e.target.value })} placeholder="Minimum Investment" required />
                            <input type="number" value={formData.max} onChange={(e) => setFormData({ ...formData, max: e.target.value })} placeholder="Maximum Investment" required />
                            <input type="number" value={formData.valuation} onChange={(e) => setFormData({ ...formData, valuation: e.target.value })} placeholder="Valuation" required />
                            <input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} required />
                            <input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} required />
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
                        </form>
                    </Modal>
                )}

                {/* Modal for creating */}
                {isCreateModalOpen && (
                    <Modal onClose={() => setIsCreateModalOpen(false)}>
                        <h2>Create New Raise Campaign</h2>
                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Business Name" required />
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required />
                            <input type="number" value={formData.min} onChange={(e) => setFormData({ ...formData, min: e.target.value })} placeholder="Minimum Investment" required />
                            <input type="number" value={formData.max} onChange={(e) => setFormData({ ...formData, max: e.target.value })} placeholder="Maximum Investment" required />
                            <input type="number" value={formData.valuation} onChange={(e) => setFormData({ ...formData, valuation: e.target.value })} placeholder="Valuation" required />
                            <input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} required />
                            <input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} required />
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Create Campaign</button>
                        </form>
                    </Modal>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching raise campaign data:", error);
        return <p>Failed to load raise campaign data.</p>;
    }
}
