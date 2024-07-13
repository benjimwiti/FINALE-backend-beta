import express from "express";
const router = express.Router();

import { /* handleLogin, handleLogout, */handleRegister, /* handleTokenRefresh , */ loginUser, logoutUser, refetch} from "../controllers/authController";

router.post('/register', handleRegister)
/* 
router.post('/login', handleLogin )
router.get('/refresh' , handleTokenRefresh)
router.post('/logout' , handleLogout) */

router.post('/login', /* handleLogin */ loginUser )
router.get('/refresh' , refetch)
router.post('/logout' , logoutUser)
    

export default router