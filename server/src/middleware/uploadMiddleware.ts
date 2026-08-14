import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_req, file, cb) => {
        cb(null, true)
    }, 
    limits: {
        fileSize: 10 * 1024 * 1024,   // 10MB
    }
})

export default upload;
