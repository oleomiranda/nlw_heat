import prismaClient from "../prisma";


class GetLas3MessagesService {
	async execute(){
		const messages = await prismaClient.message.findMany({
			take: 3,
			orderBy:{
				created_at: "desc"
			},
			include: {
				user: true
			}
		})
	
		return messages
	}
}


export {GetLas3MessagesService}