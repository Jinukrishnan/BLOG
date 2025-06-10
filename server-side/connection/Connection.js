import mongoose from "mongoose";

export default async function connection() {
    const URL=process.env.DB_URL+process.env.DB_NAME;
    const connection = await mongoose.connect(URL);
    console.log("Database connected successfully");
    return connection;
}