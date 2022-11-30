import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import Users from "./models/Users";
import jwt from "jsonwebtoken";

const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https:gymOtp.firebaseio.com",
});

async function decodeIDToken(req: any, res: Response, next: NextFunction) {
  const header = req.headers?.authorization;

  if (header) {
    header !== "Bearer null" &&
      req.headers?.authorization?.startsWith("Bearer ");

    const idToken = req.headers.authorization.split("Bearer ")[1];
    // console.log(idToken);
    try {
      // const decodedToken = await admin.auth().verifyIdToken(idToken);
      // console.log(decodedToken);

      const jwtDecodedToken = jwt.decode(idToken);
      console.log(jwtDecodedToken, ["decoded"]);
      // console.log(jwtDecodedToken);
      /*

      if (decodedToken) {
        req.currentUser = decodedToken;
        res.locals.number = req.currentUser;
        // console.log(res.locals.number);
        next();
      }
      */
      if (jwtDecodedToken) {
        req.currentUser = jwtDecodedToken;
        res.locals.number = req.currentUser;
        console.log(res.locals.number);
        next();
      } else {
        res.send("Token verification Failed");
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ status: false, message: "Firebase ID  token Expired" });
    }
  }
  // next();
}
/*

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  decodeIDToken(req, res, () => {
    const number = res.locals.number.phone_number;
    console.log(number);
    Users.findOne({ phone: number }, (err: any, data: any) => {
      try {
        // console.log(phone);
        if (err) {
          res
            .status(400)
            .json({ status: false, message: "Cannot found user data" });
        } else {
          console.log(data);
          res.locals.number = data;
          next();
        }
      } catch (err) {
        console.log("Error :" + err);
        // res.status(400).json({ status: false, message: "Cannot find User" });
      }
    });
  });
};

*/
const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  decodeIDToken(req, res, () => {
    const number = res.locals.number.phone_number;
    console.log(number, ["number"]);
    Users.findOne({ phone: number }, (err: any, data: any) => {
      try {
        // console.log(phone);
        if (err) {
          res
            .status(400)
            .json({ status: false, message: "Cannot found user data" });
        } else {
          console.log(data);
          res.locals.number = data;
          next();
        }
      } catch (err) {
        // console.log("Error :" + err);
        res
          .status(400)
          .json({ status: false, message: "Cannot find User", Error: err });
      }
    });
  });
};

const verifyTokenAndIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  decodeIDToken(req, res, () => {
    //processing for admin
    const number = res.locals.number.phone_number;

    Users.findOne({ phone: number }, (err: any, data: any) => {
      try {
        if (err) {
          res
            .status(400)
            .json({ status: false, message: "Cannot found user data" });
        } else {
          // console.log(data);
          res.locals.number = data;
          if (res.locals.number.isAdmin) {
            next();
          } else {
            res
              .status(400)
              .json({ status: false, message: "You are not allowded" });
          }
        }
      } catch (err) {
        console.log("Error :" + err);
        // res.status(400).json({ status: false, message: "Cannot find User" });
      }
    });
  });
};

export { verifyTokenAndAuthorization, decodeIDToken, verifyTokenAndIsAdmin };
