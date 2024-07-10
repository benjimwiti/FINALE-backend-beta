import express from "express";
const router = express.Router();

import { handleLogin, handleRegister, handleTokenRefresh } from "../controllers/authController";

router.post('/register', handleRegister)
router.post('/login', handleLogin )
router.get('/refresh' , handleTokenRefresh)
    

export default router