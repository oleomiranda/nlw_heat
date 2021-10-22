import {Router} from "express";
import { checkAuthentication } from "../../middleware/checkAuthentication";
import { UserProfileControll } from "../controllers/UserProfileControll";
const router = Router()

router.get("/profile", checkAuthentication, new UserProfileControll().handle)

export default router