import express from "express"
import { ValidateSchema, Schemas } from "../middleware/Validation"
import { handleTaskCreation } from "../controllers/taskController"
const router = express.Router()

router.route('/')
    .post(ValidateSchema(Schemas.task.create, 'body'), handleTaskCreation)

export default router