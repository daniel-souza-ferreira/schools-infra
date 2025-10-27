import express from 'express'

import { getInfo } from './getInfo.js'
import { create } from './create.js'
import { update } from './update.js'
import { deleteOne } from './delete.js'
import { upload } from './upload.js'
import { getMany } from './getMany.js'

import { uploadFile } from '../../middlewares/upload-file.js'

const router = express.Router()

router.get('', getMany)
router.get('/:id', getInfo)

router.post('/', create)
router.post('/upload', uploadFile.single('file'), upload)

router.put('/:id', update)

router.delete('/:id', deleteOne)

export { router as schoolRoutes }