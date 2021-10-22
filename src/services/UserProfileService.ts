import prismaClient from "../prisma";



class UserProfileService{
	async execute(user_id: string){
		const userInfo =  await	prismaClient.user.findFirst({
			where:{
				id: user_id
			}
		})
		
		return userInfo
	}
}


export {UserProfileService}