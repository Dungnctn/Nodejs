import Multer from "multer";
import { FILE_MAX_SIZE } from "../constants/constants";

const fileBaseUrl = 'http://localhost:3001/public'

// const storageUrl = process.env.STORAGE_URL; 
// const storageUrl = '../../src/public'

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../constants');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    },
  });

export const getImgUrls = (files) => {
    const imgUrls = files.map((file) => {
        return `${fileBaseUrl}/${file.filename}`;
    })

    return imgUrls
}

export const getImgUrl = (file) => {
    return `${fileBaseUrl}/${file.filename}`
}

export const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const multer = Multer({
    storage: storage,
    limits: { fileSize:  FILE_MAX_SIZE},
    fileFilter: fileFilter
})