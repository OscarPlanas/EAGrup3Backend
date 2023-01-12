import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";
import Booking from "./api/Booking";
import Series from "./api/Series";
import Event from "./api/Event";
import Report from "./api/Report";
import auth from "./api/auth";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import http from 'http';

const app = express();



//const app = express();
const port = process.env.PORT || 5432;
/** Server Handling */
const httpServer = http.createServer(app);
//const httpServer = createServer();
/** Start Socket */
//new ServerSocket(httpServer);
const io = new Server(httpServer, {
  cors: {
	origin:'http://localhost:3000',
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
app.use('/api/report', Report)

app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

io.on("connection", (socket: Socket) => {
	console.log('new user connected ' + socket.id);
	 socket.on("join_room", (data) => {
	 	socket.join(data);
	 	console.log(`User with ID: ${socket.id} joined room: ${data}`);
	});
	socket.on("send_message",(data) => {
		socket.to(data.room).emit("receive_message", data);
	 	console.log(data);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	  });
});
httpServer.listen(3001, () => {
	console.log("SERVER RUNNING");
});

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
