// app/page.tsx
import clientPromise from '@/lib/mongodb';

interface Item {
  _id: string;
  name: string;
}

export default async function Home() {
  const client = await clientPromise;
  const db = client.db('mydatabase'); // Replace with your database name

  // Fetch data from MongoDB
  const items = await db.collection('items').find().toArray();

  return (
    <div>
      <h1>Items from MongoDB</h1>
      <ul>
        {items.map((item: Item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
