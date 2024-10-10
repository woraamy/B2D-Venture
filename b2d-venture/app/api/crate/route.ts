import Business from @/models/Business

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
          const user = await Business.create(req.body);  // Directly creates the user
          res.status(201).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }