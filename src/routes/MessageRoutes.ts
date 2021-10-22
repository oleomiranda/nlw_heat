import {Router} from 'express'
import { checkAuthentication } from '../../middleware/checkAuthentication'
import { GetLast3MessagesControll } from '../controllers/GetLast3MessagesControll'
import { MessageControll } from '../controllers/MessageControll'
const router = Router()

router.post("/messages", checkAuthentication, new MessageControll().handle)
router.get("/messages/last3", new GetLast3MessagesControll().handle)

export default router