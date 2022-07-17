import { getImgUrl } from "../utils/file"



export const uploadSingleFile = async (req, res) => {
    try {
        const file = req.file
        
        if(!file){
            res.badRequest('file is required')
        }

        return res.status(200).json({
            success: true,
            message: 'Upload file successfully',
            data: {
                link: getImgUrl(file)
            }
        })

    } catch (error) {
        if(error.code === 'LIMIT_FILE_SIZE') {
            return res.internalServer('File size to cannot large 5MB')
        }  

        res.internalServer(`Cannot upload to file: ${error.message}`)
    }
}