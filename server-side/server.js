import express from "express";
import env from "dotenv";
import connection from "./connection/Connection.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
env.config();
const  app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter)
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
})