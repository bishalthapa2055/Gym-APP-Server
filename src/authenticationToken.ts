import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import Users from "./models/Users";
import jwt from "jsonwebtoken";
import { async } from "@firebase/util";
import { NotAuthorizedError } from "./errors/not_authorized_error";
import { BadRequestError } from "./errors/bad_request_error";

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
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);

      // const jwtDecodedToken = jwt.decode(idToken);
      // console.log(idToken);
      // console.log(jwtDecodedToken, ["decoded"]);
      // console.log(jwtDecodedToken);

      if (decodedToken) {
        req.currentUser = decodedToken;
        res.locals.number = req.currentUser;
        console.log(res.locals.number);
        next();
      }

      // if (jwtDecodedToken) {
      //   req.currentUser = jwtDecodedToken;
      //   res.locals.number = req.currentUser;
      //   console.log(res.locals.number);
      //   next();
      // }
      else {
        res.status(404).send("Token Decode failed  !!!!");
      }
    } catch (err) {
      // console.log(err);
      res.status(400).json({
        status: false,
        message: "Firebase ID  token Expired / Token verification failed ",
      });
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
  decodeIDToken(req, res, async () => {
    const number = res.locals.number.phone_number;
    console.log(number);
    await Users.findOne({ phone: number }, (err: any, data: any) => {
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
        res.status(400).json({ status: false, message: "Cannot find User" });
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
  decodeIDToken(req, res, async () => {
    try {
      const number = res.locals.number.phone_number;
      if (number) {
        const data = await Users.findOne({ phone: number });
        if (!data) {
          throw new BadRequestError("Unable to Find Number in database");
        }
      }

      console.log(number, ["number"]);

      await Users.findOne({ phone: number }, (err: any, data: any) => {
        // try {
        // console.log(phone);
        if (err) {
          // console.log(err, ["err"]);
          res
            .status(400)
            .json({ status: false, message: "Cannot found user data" });
          // throw new Error("Cannot find data");
        } else {
          console.log(data);
          res.locals.number = data;
          // console.log(
          //   "🚀 ~ file: authenticationToken.ts:110 ~ Users.findOne ~ res.locals.number ",
          //   res.locals.number
          // );

          next();
        }
        // } catch (err) {
        // console.log("Error :" + err);
        // res
        // .status(400)
        // .json({ status: false, message: "Cannot find Valid users" });
        // }
      });
    } catch (e) {
      res
        .status(400)
        .json({
          status: false,
          message: (e as any).message ? (e as any).message : "Debug Backend",
        });
    }
  });
};

const verifyTokenAndIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  decodeIDToken(req, res, async () => {
    //processing for admin
    const number = res.locals.number.phone_number;

    await Users.findOne({ phone: number }, (err: any, data: any) => {
      try {
        if (err) {
          res
            .status(400)
            .json({ status: false, message: "Cannot found user data" });
        } else {
          // console.log(data);
          res.locals.number = data;
          if (res.locals.number.isAdmin === true) {
            next();
          } else if (res.locals.number.isAdmin === false) {
            res.status(400).json({
              status: false,
              message: "You are not allowded",
              data: data,
            });
          }
        }
      } catch (err) {
        // console.log("Error :" + err);
        res.status(400).json({
          status: false,
          message: "You are not allowded to do that",
          data: data,
        });
        // throw new NotAuthorizedError();
        // res.status(400).json({ status: false, message: "Cannot find User" });
      }
    })
      .clone()
      .exec();
  });
};

export { verifyTokenAndAuthorization, decodeIDToken, verifyTokenAndIsAdmin };
