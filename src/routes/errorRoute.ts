import express from 'express'
import serveErrorPage from '../controllers/errorPageController'
const router = express.Router()

router.all("*", serveErrorPage)

export default router