import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("Hey is connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "Kovriki",
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("🚀 ~ file: database.js:22 ~ connectToDB ~ error:", error);
    }
};
