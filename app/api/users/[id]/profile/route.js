import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase()

        const user = await User.findById(params.id)
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}


export const PATCH = async (request, { params }) => {
    const { firstName, lastName, userName } = await request.json();
    console.log("Debugging Patch",firstName)
    try {
        await connectToDatabase();

        // Find the existing prompt by ID
        const existingUser = await User.findById(params.id);
        console.log(existingUser)
        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        // Update the prompt with new data
        existingUser.name = firstName + " " + lastName;
        existingUser.username = userName;

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
};