import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";
import Booking from "./api/Booking";
import Series from "./api/Series";
import Event from "./api/Event";
import auth from "./api/auth";
import { createServer } from "http";
import { Server, Socket } from "socket.io";




const app = express();
const port = process.env.PORT || 5432;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
	origin:true,
	credentials:true,
	methods:["GET","POST"]
  }
});


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

app.use('/api/users', User)
app.use('/api/bookings', Booking)
app.use('/api/series', Series)
app.use('/api/events', Event)
app.use('/api/auth', auth)

app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

io.on("connection", (socket: Socket) => {
	console.log("new user connected");
	socket.on("sendMessage",(messageInfo) => {
		console.log("sending message");
		socket.broadcast.emit("receiveMessage", messageInfo);
	});
});
httpServer.listen(3000);

//mongo
mongoose.connect('mongodb://mongo/TVTracker', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log('Server corriendo en el puerto ' + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
