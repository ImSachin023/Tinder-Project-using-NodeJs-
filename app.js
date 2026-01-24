const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

require("dotenv").config();                                                   

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");
const paymentRouter = require("./src/routes/payment");
const initialiseSocket = require("./src/utils/socket");
const chatRouter = require("./src/routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);


const server = http.createServer(app);
initialiseSocket(server);

connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    server.listen(process.env.PORT, () => {
      console.log("the server can listen successfully");
    });
  })
  .catch((err) => {
    console.error("Connection is not establish!!");
  });
