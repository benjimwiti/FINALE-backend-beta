import express from 'express'
import { Schemas, ValidateSchema } from '../middleware/Validation'
import { getAllUsers, getUser } from '../controllers/userController'
const router = express.Router()

router.route('/:id')
        .get(ValidateSchema(Schemas.user.get, 'params'), getUser)

router.route('/')
        .get(getAllUsers)

export default router