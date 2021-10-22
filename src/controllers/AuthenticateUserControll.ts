import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserControll {

	async handle(req: Request, res: Response) {
		const { code } = req.body

		const service = new AuthenticateUserService(); //cria nova instancia do service
		try {

			const result = await service.execute(code) //passa o codigo que veio do git 
			//para a funçao execute 
			return res.json(result) // retorna a resposta que veio do git atraves da funçao `execute`

		} catch (err) {
			res.json(err.message)
		}

	}
}


export { AuthenticateUserControll }