import Image from "next/image";
import { redirect } from 'next/navigation';
import { getUser, addUser } from '@/app/actions/postAction';

export default async function Home() {
    const posts = await getUser();
    async function handleSubmit(formData: FormData) {
        const response = await addUser(formData);
        
        if (response.success) {
            // Optionally handle success, e.g., show a success message
            console.log(response.message);
            redirect('/'); // Redirect to the same page or to a different route if needed
        } else {
            // Optionally handle error, e.g., show an error message
            console.error(response.message);
            // You could set state here if using client components or notify the user
        }
    }

    return (
        
        <div>
            {posts.map(user => (
                <div key={user._id}>
                    <h1>{user.name}</h1>
                    <p>{user.age}</p>
                </div>
            ))}
            <form action={addUser}>
                <div>
                    <label>Name</label>
                    <input name='name' type='text' />
                </div>
                <div>
                    <label>Age</label>
                    <input name='age' type='text' />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}
