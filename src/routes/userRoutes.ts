import express from 'express'
import { Schemas, ValidateSchema } from '../middleware/Validation'
import { deleteAccount, getAllUsers, getUser, updateAccount } from '../controllers/userController'
const router = express.Router()

router.route('/:id')
        .get(ValidateSchema(Schemas.user.get, 'params'), getUser)
        .delete(ValidateSchema(Schemas.user.delete, 'params'), deleteAccount)
        .put(ValidateSchema(Schemas.user.delete, 'params'), updateAccount)

router.route('/')
        .get(getAllUsers)

export default router