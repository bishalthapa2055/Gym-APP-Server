import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import membershipRoutes from "./routes/membershipRoutes";
import packagesRoutes from "./routes/packagesRoutes";
import { config } from "./config/config";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import bodyParser from "body-parser";
import tokenRoutes from "./routes/tokenRoutes";
import adminRoutes from "./routes/adminRoutes";
// import decodeIDToken from "./authenticationToken";
// import verifyTokenAndAuthorization from "./authenticationToken";
// import verifyPhone from "./middleware/verifyPhone";
import { Users } from "./routes/Users";
import { web } from "./routes/Admin";

const app = express();
app.use(cors());

//connect to mongodb

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "52428800" }));

app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 5000000,
  })
);

// for checking otp from server to firebase
// app.use(decodeIDToken);

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
    startServer();
  })
  .catch((err: any) => {
    console.log(`Error: ${err}`);
  });
// app.listen(() => {
//   console.log(`server started at http://localhost:${config.server.port}`);
// });
function startServer() {
  http.createServer(app).listen(config.server.port, () => {
    console.log(`server started at http://localhost:${config.server.port}`);
  });

  app.use("/users", userRoutes);
  app.use("/membership", membershipRoutes);
  app.use("/package", packagesRoutes);
  app.use("/payment", paymentRoutes);

  app.use("/admin", adminRoutes);
  app.use("/api", tokenRoutes);
  //for checking phone nunmber
  // app.use("/verify", verifyPhone);
  app.use("/api/phone", Users);
  app.use("/api/web", web);
  app.get("/", (req, res) => {
    res.send({ status: true, message: "ok" });
  });
}
