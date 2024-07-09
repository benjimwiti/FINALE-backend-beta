import express from "express";
const router = express.Router();

import { handleRegister } from "../controllers/authController";

router.route('/register')
    .post(handleRegister)

export default router