import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
const v8 = require("v8");
const totalHeapSize = v8.getHeapStatistics().total_available_size;
const totalHeapSizeGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
console.log("totalHeapSizeGb: ", totalHeapSizeGb);
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);

//we easily pass these two to create a real time socket io server as well
const io = require("socket.io")(http, {
	cors: {
		origin: [`${process.env.CLIENT_URL}`],
		methods: ["GET", "POST"],
		allowedHeders: ["Content-type"],
	},
});

// at this time we only have express server but we want to un
//socket.io also for one time connection and real time connection for that
//we are using the core node module that are come with nodejs and called as http
// db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,

		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB CONNECTION ERROR => ", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: [process.env.CLIENT_URL],
	})
);
// app.use(express.cookieParser("your secret here"));
// app.use(express.session());
// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//socketio
io.on("connect", (socket) => {
	// console.log("SOCKET.IO", socket.id);
	socket.on("new-post", (newPost) => {
		socket.broadcast.emit("new-post", newPost);
	});
});
const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
