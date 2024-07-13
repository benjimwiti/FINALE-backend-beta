import express from 'express'
import { handleImageRetrieval, handleImageUpload} from '../controllers/imageUploadController'
import path from 'path'
const router = express.Router()

const avatarsPath = path.join(__dirname, "..", "avatars")
router.use('/avatars', express.static(avatarsPath))

router.route('/avatars/:fileName')
        .get(handleImageRetrieval)


router.route('/upload-avatar')
        .post(handleImageUpload)




export default router