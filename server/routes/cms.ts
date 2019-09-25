import * as express from 'express'
import { checkCSRF } from '../middlewares/check'
import { fixedsearch, search, searchone } from '../controllers/cms'
import { refreshToken } from '../middlewares/auth'

const cmsRouter = express.Router()

cmsRouter.post('/cms/search', checkCSRF(), refreshToken(false), search)
cmsRouter.post('/cms/searchone', checkCSRF(), refreshToken(false), searchone)
cmsRouter.post(
  '/cms/fixedsearch',
  checkCSRF(),
  refreshToken(false),
  fixedsearch
)

export default cmsRouter
