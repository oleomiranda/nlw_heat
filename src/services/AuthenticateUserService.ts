import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken"
interface IAccessTokenResponse {
	access_token: string
}

interface IUserResponse {
	avatar_url: string,
	login: string,
	id: number,
	name: string,
}


class AuthenticateUserService {
	async execute(code: string) {

		const url = "https://github.com/login/oauth/access_token"
		//usa interface para filtar os dados que deseja pegar da resposta		
		const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {    //faz request para o github
			params: {
				client_id: process.env.GITHUB_CLIENT_ID, //passa o client id que foi gerado no git
				client_secret: process.env.GITHUB_CLIENT_SECRET, //passa o client secret 
				code // passa o codigo que veio do controller 
			},
			headers: {
				"Accept": "application/json"
			}
		})

		//usa interface para filtrar os dados do usuario que deseja pegar
		const response = await axios.get<IUserResponse>("https://api.github.com/user", { //faz o request para api do git
			// passando o access_token que veio do request anterior
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`
			}
		})

		//git retorna informaçoes do usuario
		// retorna a resposta do git 
		const { login, id, avatar_url } = response.data
		const name = response.data.name || `user${id}`

		let user = await prismaClient.user.findFirst({
			where: {
				github_id: id
			}
		})
		
		if (!user) {
			user = await prismaClient.user.create({
				data:{
					github_id: id,
					login, 
					avatar_url,
					name
				}
			})
			
		}

		const token = sign({
			user: {
				name: user.name,
				avatar_url: user.avatar_url,
				id: user.id
			}
		}, process.env.JWT_SECRET, { subject:  user.id, expiresIn: "1d" })

		return { token, user }
	}
}

export { AuthenticateUserService }