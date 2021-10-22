import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';


export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({
			"error": "Invalid token"
		})
	}

	const [, token] = authToken.split(" ")
	
	try {

		const {sub} = verify(token, process.env.JWT_SECRET)
		
		req.user_id = sub

		return next()
	} catch (err) {
	
		return res.status(401).json({"error": "Expired token"})
	
	}





}