import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
connectDb()

app.use('/api/user',userRouter)
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`server is running at port ${PORT}`))