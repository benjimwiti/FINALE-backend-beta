import express from "express"
import { ValidateSchema, Schemas } from "../middleware/Validation"
import {handleFetchTask, handleTaskCreation, handleTaskDeletion, handleTaskModification, handleTaskCompletion } from "../controllers/taskController"
const router = express.Router()

router.route('/')
    .post(ValidateSchema(Schemas.task.create, 'body'), handleTaskCreation)

router.route('/task/:id')
    .put( ValidateSchema(Schemas.task.id, 'params'),  handleTaskModification)
    .delete(ValidateSchema(Schemas.task.id, 'params'), handleTaskDeletion)
    .get(ValidateSchema(Schemas.task.id, 'params'), handleFetchTask)
    .patch(ValidateSchema(Schemas.task.id,'params'), handleTaskCompletion)

export default router