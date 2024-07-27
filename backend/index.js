import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.PORT;

//using middleweares
app.use(express.json());  // data pass for register and login
app.use(cookieParser());  // npm cookie cookies pass for profile
 
// import routing
import userRoutes from './routes/userRoutes.js'

app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})