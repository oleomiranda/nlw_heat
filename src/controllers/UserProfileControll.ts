import {Request, Response} from "express"
import { UserProfileService } from "../services/UserProfileService"


class UserProfileControll {
	async handle(req: Request, res: Response){
		const service = new UserProfileService()
		const {user_id} = req
		const userInfo = await service.execute(user_id)
		
		return res.json(userInfo)
	
	}
}


export {UserProfileControll}