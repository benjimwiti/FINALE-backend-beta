import dotenv from 'dotenv'
dotenv.config()
/* =========================== IMPORTS ============================= */
//DEPENDANCIES
import express, { Express, Request, Response } from "express";
import cors from 'cors'
import mongoose from "mongoose";
import 'express-async-errors'

//CUSTOM-MODULES
import { PORT } from './config/portConfig'
import { registerRoutes } from "./routes";
import connectDB from "./config/dbConn";
import errorHandler from './middleware/errorHandler';
import { logger } from './middleware/logger';


/* =========================== VARIABLES ============================= */
const app = express()


/* =========================== MIDDLEWARE ============================= */
connectDB()
app.use(logger)
app.use(express.json())
app.use(cors())

/* =========================== ROUTING ============================= */
registerRoutes(app)

/* =========================== ERROR-HANDLING ============================= */
app.use(errorHandler)


/* =========================== INITIALIZATION ============================= */
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', err => {
    console.log(err)
    //logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

app.listen(PORT, ()=> {
    console.log(`running on ${PORT}`)
})