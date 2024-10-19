import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/connectDB'; // Make sure to adjust the import according to your structure
import BusinessRequest from '@/models/businessRequest';
import InvestorRequest from '@/models/InvestorRequest';
import { toast } from 'react-toastify'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(); 

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { id, type, action } = req.body; 
        
        let request;

        if (type === 'business') {
          request = await BusinessRequest.findById(id);
        } else if (type === 'investor') {
          request = await InvestorRequest.findById(id);
        } else {
          return res.status(400).json({ message: 'Invalid request type' });
        }

        if (!request) {
          return res.status(404).json({ message: 'Request not found' });
        }

        if (action === 'allow') {
          request.status = 'approved';
          await request.save();
          toast.success("Request approved");
          return res.status(200).json({ message: 'Request approved' });
        } else if (action === 'reject') {
          request.status = 'declined';
          await request.save();
          toast.error("Request declined");
          return res.status(200).json({ message: 'Request declined' });
        } else {
          return res.status(400).json({ message: 'Invalid action' });
        }
      } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
