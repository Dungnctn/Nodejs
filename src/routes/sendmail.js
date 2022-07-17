import express from 'express'
import { sendMail } from '../controllers/sendMail';

const router = express.Router();

router.post('/sendMail', sendMail)

export default router