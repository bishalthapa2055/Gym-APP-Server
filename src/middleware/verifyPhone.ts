import { Request, Response, NextFunction } from "express";

import Token from "../models/Token";
import Users from "../models/Users";

const tokenPhone = (req: Request, res: Response, next: NextFunction) => {
  // verify phone number
  Token.find()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((e) => res.json({ error: e }));
  //   console.log(token);
};

const verifyPhone = (req: Request, res: Response, next: NextFunction) => {
  //   tokenPhone();
  //   decodeIDToken(req, res, () => {
  //     // Users.find({ phone: "+9779813304886", isAdmin: true })
  //     //   .then((data) => {
  //     //     res.json({ data: data });
  //     //   })
  //     //   .catch((e) => res.json({ error: e }));
  //     //for tokesn
  //     // req.cur;
  //     Token.find({ number: "+9779813304886" })
  //       .then((data) => {
  //         res.json({ data: data });
  //       })
  //       .catch((e) => res.json({ error: e }));
  //     // console.log();
  //   });
};
export default verifyPhone;
