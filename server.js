import express from "express"
import dotenv from 'dotenv';
import router from "./routes/authroutes.js";
import supportRouter from "./routes/supportroutes.js"
import cookieParser from 'cookie-parser';
import { connectDB } from "./lib/db.js";
import ticketRoutes from "./routes/ticketroutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", router);
app.use("/api", supportRouter);
app.use("/api", ticketRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
})
