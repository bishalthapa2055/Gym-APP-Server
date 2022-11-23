import Token from "../../models/Token";
import { decodeIDToken } from "../../authenticationToken";
import { Request, Response, NextFunction } from "express";

const getAll = async (req: any, res: Response, next: NextFunction) => {
  // const auth = req.currentUser;
  // console.log(auth);
  // if (auth) {
  //   const data = await Token.find({});
  //   return res.status(200).json({ data: auth });
  // }
  res.status(200).json({ message: "hello from token" });
};

const postData = (req: any, res: Response) => {
  const auth = req.currentUser;
  // const data = req.body();
  if (auth) {
    const phone = new Token(req.body);
    const savedPhone = phone.save();

    return res.status(201).json(savedPhone);
  }
  return res.status(403).send("Not authorized");
  // const data = req.body;
  // console.log(req.body);
  // res.status(200).json({ status: true, data: data });
};

// const postData = (req: any, res: Response) => {
//   const auth = req.currentUser;
//   if (auth) {
//     console.log("authenticated!", auth);
//     return res.send("Hi, from within the phones router POST");
//   }
//   return res.status(403).send("Not authorized");
// };

export default { getAll, postData };
