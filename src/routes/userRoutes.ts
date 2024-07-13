import express from 'express'
import { Schemas, ValidateSchema } from '../middleware/Validation'
import { deleteAccount, getAllUsers, getUser, updateAccount } from '../controllers/userController'
import { handleFetchUserTasks } from '../controllers/taskController'
/* import verifyJWT from '../middleware/VerifyJWT' */
const router = express.Router()

router.route('/')
        .get(/* verifyJWT, */ getAllUsers)

router.route('/:id')
        .get(ValidateSchema(Schemas.user.get, 'params'), getUser)
        .delete(ValidateSchema(Schemas.user.delete, 'params'), deleteAccount)
        .put(ValidateSchema(Schemas.user.delete, 'params'), updateAccount)

router.route('/tasks/:userId')
        .get(ValidateSchema(Schemas.user.getAll, 'params'), handleFetchUserTasks)


        
export default router