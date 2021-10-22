import { Router } from "express";
import { AuthenticateUserControll } from "../controllers/AuthenticateUserControll";
const router = Router()

router.post("/authenticate", new AuthenticateUserControll().handle)

export default router
