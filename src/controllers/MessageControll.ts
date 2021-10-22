import { Response, Request } from "express"
import { CreateMessageService } from "../services/createMessageService"


class MessageControll {
	async handle(req: Request, res: Response) {
		const { message } = req.body

		const service = new CreateMessageService()
		
		const result = await service.execute(message, req.user_id)
		
		return res.json(result)
	}
}


export {MessageControll}