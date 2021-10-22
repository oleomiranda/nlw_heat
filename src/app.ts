import express from "express";
const app = express()
var server = app.listen(8081, () => console.log('RUNNING...'))
import "dotenv/config";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes"
import MessageRoutes from "./routes/MessageRoutes"
import UserRoutes from "./routes/UserRoutes"
import { Server } from "socket.io";

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", AuthRoutes)
app.use("/", MessageRoutes)
app.use("/", UserRoutes)

 
const io = new Server(server, {
	cors: {
		origin: "*"
	}
})

io.on("connection", socket => {
	console.log(`Usuario conectado com id ${socket.id}`)
})

app.get("/github", (req, res) => {

	res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)

})


app.get("/signin/callback", (req, res) => {
	const { code } = req.query
	return res.json(code)
})

export { io }