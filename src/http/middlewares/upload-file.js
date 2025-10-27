import multer from 'multer'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, './temp-uploads'),
        filename: (req, file, callback) => callback(null, randomUUID() + path.extname(file.originalname))
    })
})