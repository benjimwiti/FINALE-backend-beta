/* =========================== IMPORTS ============================= */
//DEPENDANCIES
import express, { Express, Request, Response } from "express";
import cors from 'cors'

//MODULES
import { PORT } from './config/portConfig'
import { registerRoutes } from "./routes";


/* =========================== VARIABLES ============================= */
const app = express()


/* =========================== MIDDLEWARE ============================= */
app.use(express.json())
app.use(cors())

/* =========================== ROUTING ============================= */
registerRoutes(app)


/* =========================== INITIALIZATION ============================= */
app.listen(PORT, ()=> {
    console.log(`running on ${PORT}`)
})