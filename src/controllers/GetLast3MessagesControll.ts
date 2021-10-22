import { GetLas3MessagesService } from "../services/GetLast3MessagesService";
import {Response, Request} from "express"


class GetLast3MessagesControll {
	async handle(req: Request, res: Response){

		const service = new GetLas3MessagesService()
		const messages = await service.execute()

		return res.json(messages)

	}
}


export {GetLast3MessagesControll}