import express from "express";
import { connection } from "./db/index.js";
import studentRoutes from "./routes/student.route.js";
import gradeRoutes from "./routes/grade.route.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const {PORT}=process.env

const app = express();
app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api", studentRoutes);
app.use("/api",gradeRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

connection();