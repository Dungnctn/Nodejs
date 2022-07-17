import express from 'express'
import { multer } from '../utils/file'
import { uploadSingleFile } from '../controllers/file'

const fileRoute = express.Router()

fileRoute.post('/upload', multer.single('file'), uploadSingleFile )

export default fileRoute