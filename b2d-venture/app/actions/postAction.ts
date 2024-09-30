'use server';

import User from '@/Model/User';

const addUser = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;

    const newUser = new User({ name, age });
    await newUser.save(); // Save the user
    return { success: true, message: 'User added successfully!' }; // Return a simple success message
};

const getUser = async () => {
    const users = await User.find(); // Fetch users from the database
    return users.map(user => user.toObject()); // Convert Mongoose documents to plain objects
};

export { addUser, getUser };
