import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try{
        await connectToDatabase();

        const prompts = await Prompt.find({}).populate('creator');
        console.log("Get request", prompts)
        return new Response(JSON.stringify(prompts), {status:200})
    } catch(error){
        return new Response("Failed to fetch all Prompts", {status:500})
    }
}