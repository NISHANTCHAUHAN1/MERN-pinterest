import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';
import path from 'path';
import cors from 'cors';

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
  });

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173/',
  credentials: true
}
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;


//using middleweares
app.use(express.json());  // data pass for register and login
app.use(cookieParser());  // npm cookie cookies pass for profile
 
// import routing
import userRoutes from './routes/userRoutes.js';
import pinRoutes from "./routes/pinRoutes.js";

app.use('/api/user', userRoutes);
app.use("/api/pin", pinRoutes);


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})