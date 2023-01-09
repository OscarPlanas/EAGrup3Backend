"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./api/User"));
const Booking_1 = __importDefault(require("./api/Booking"));
const Series_1 = __importDefault(require("./api/Series"));
const Event_1 = __importDefault(require("./api/Event"));
const auth_1 = __importDefault(require("./api/auth"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
//const app = express();
const port = process.env.PORT || 5432;
/** Server Handling */
const httpServer = http_1.default.createServer(app);
//const httpServer = createServer();
/** Start Socket */
//new ServerSocket(httpServer);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', User_1.default);
app.use('/api/bookings', Booking_1.default);
app.use('/api/series', Series_1.default);
app.use('/api/events', Event_1.default);
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
io.on("connection", (socket) => {
    console.log('new user connected ' + socket.id);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
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
//mongodb://mongo/TVTracker
//mongodb://localhost/TVTracker
mongoose_1.default.connect('mongodb://localhost/TVTracker', { useNewUrlParser: true })
    .then(() => {
    // tslint:disable-next-line:no-console
    app.listen(port, () => console.log('Server corriendo en el puerto ' + port));
})
    .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
//# sourceMappingURL=server.js.map