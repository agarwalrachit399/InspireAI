import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true);

    if (isConnected) {
        console.log('already connected');
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
        });

        isConnected = true;
        console.log('connected to database')

    } catch (error) {
        console.log('error connecting to database', error);
    }
}