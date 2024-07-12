import express from "express";
const router = express.Router();

import { handleLogin, handleLogout, handleRegister, handleTokenRefresh } from "../controllers/authController";

router.post('/register', handleRegister)
router.post('/login', handleLogin )
router.get('/refresh' , handleTokenRefresh)
router.post('/logout' , handleLogout)
    

export default router