import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "Kovriki",
        });
        isConnected = true;
    } catch (error) {
        console.log("🚀 ~ file: database.js:22 ~ connectToDB ~ error:", error);
    }
};
