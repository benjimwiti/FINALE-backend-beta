import express from "express"
import { ValidateSchema, Schemas } from "../middleware/Validation"
import {/* handleFetchUserTasks ,*/ handleTaskCreation, handleTaskDeletion, handleTaskModification } from "../controllers/taskController"
const router = express.Router()

router.route('/')
    .post(ValidateSchema(Schemas.task.create, 'body'), handleTaskCreation)

router.route('/:id')
    .put(ValidateSchema(Schemas.task.id, 'params'), handleTaskModification)
    .delete(ValidateSchema(Schemas.task.id, 'params'), handleTaskDeletion)

// router.route('/:userId')
//     .get(ValidateSchema(Schemas.task.id, 'params'), handleFetchUserTasks)

export default router