import fs from "fs";
import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";
import { BadRequestError } from "../errors/bad_request_error";
import moment from "moment";
import { ApiFeatures } from "../utils/api-services";
import { countReset } from "console";
import { check } from "express-validator";
// import decodeIDToken from "../authenticationToken";

const createUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const date = new Date();
  const formattedDate = moment(date).format("YYYY-MM-DD");
  console.log(
    "🚀 ~ file: userController.ts:12 ~ createUsers ~ formattedDate",
    formattedDate
  );
  // console.log(req.file);
  const user = new Users({
    //user-> model
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    // image: req.file?.filename,
    // image: req.file?.filename,
    // isAdmin: req.body.isAdmin,
    emergency_number: req.body.emergency_number,
    created: formattedDate,
  });

  // user = JSON.parse(user);

  await user.save((err) => {
    if (err) {
      res.status(400).json({ message: err.message, type: "danger" });
      // throw new BadRequestError((err as any).message)
      //   ? (err as any).message
      //   : "Failed to get Users. Consult to backend ";
    } else {
      res.status(200).json({ status: true, data: user });
    }
  });
};

const aggregrate = async (req: Request, res: Response, next: NextFunction) => {
  // aggregration
  //   db.students.aggregate([
  // {
  // $lookup:
  // {
  // from : “sports”,
  // localField : “pupil”,
  // foreignField : “winner”,
  // as : “games”
  // } } ] )

  // const data = Users.aggregate([
  //   {
  //     $lookup: {
  //       from: "Membership",
  //       localField: "_id",
  //       foreignField: "Users",
  //       as: "conversion",
  //     },
  //   },
  // ]);
  // res.status(200).json({ status: true, data: data });
  // console.log(data);
  //matching of datas
  const data = await Users.aggregate([
    // {
    //   $group: {
    //     _id: { name: "$name", phone: "$phone", isAdmin: "$isAdmin" },
    //   },
    // },
    // // { $match: { "_id.isAdmin": false } },
    // { $count: "_id" },
    // { $match: { isAdmin: false } },
    // { $group: { _id: { name: "$name", phone: "$phone" } } },
    // { $group: { _id: { name: "$name", isAdmin: "$isAdmin" } } },
    // { $sort: { "_id.name": 1 } },
    // for projet agg
    // {
    //   $project: {
    //     id: 0,
    //     // isAdmin: 1,
    //     info: {
    //       name: "$name",
    //       phone: "$phone",
    //     },
    //   },
    // },
    // { $count: "name" },

    // { $limit: 2 },
    // { $match: { isAdmin: !true } },
    // { $group: { _id: { name: "$name", email: "$email" } } },

    //asum

    // { $group: { _id: "$name", count: { $sum: 1 } } },

    // tye
    // { $type: { name: "$name" } },

    { $project: { name: 1, _id: 0, email: { $type: "$email" } } },
  ]);
  console.log(data);
  if (data) {
    res.status(200).json({ status: true, data: data });
  } else {
    res.status(400).json({ status: false, message: "unable to find" });
  }
};

const displayUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await Users.find({ isAdmin: !true })
    .then((data: any) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((err: any) => {
      // res.status(400).json({ status: false, Error: err });
      throw new BadRequestError((err as any).message)
        ? (err as any).message
        : "Failed to get Users. Consult to backend ";
    });
};

const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
  // const { name, email, phone, emergency_number } = req.body;
  const id = req.params.id;
  let new_image = "";

  if (req.file) {
    new_image = req.file?.filename; //assign and then remove
    console.log(new_image);
    try {
      fs.unlinkSync(
        "E:/11tsc/src/imagemodel/imageuploads/" + req.body.old_image
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image; //if image not want to change
  }

  Users.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      emergency_number: req.body.emergency_number,
      // image: new_image,
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
};

const getIndividualUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Users.findById(id)
    .then((user: any) =>
      user
        ? res.status(200).json({ status: true, data: user })
        : res
            .status(400)
            .json({ status: false, message: "No user is available" })
    )
    .catch((err: any) => {
      res
        .status(400)
        .json({ status: false, message: "Unable to find the user" });

      // throw new BadRequestError("Failed to get Users. Consult to backend ");
    });
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  Users.findByIdAndDelete(id, (err: any, result: any) => {
    // if (result.image != "") {
    //   //if image is not empty
    //   try {
    //     fs.unlinkSync("E:/11tsc/src/imagemodel/imageuploads/" + result.image);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    if (err) {
      res.json({ message: err.message });
    } else {
      res
        .status(200)
        .json({ status: true, message: "sucessfully deleted", data: result });
    }
  });
};
const displayMe = async (req: Request, res: Response, next: NextFunction) => {
  console.log(
    "🚀 ~ file: userController.ts:218 ~ displayMe ~ displayMe:",
    displayMe
  );
  const number = res.locals.number.phone;
  console.log("🚀 ~ file: userController.ts:219 ~ displayMe ~ number", number);
  try {
    const data = await Users.findOne({ phone: number });
    console.log("🚀 ~ file: userController.ts:223 ~ displayMe ~ data:", data);
    //    (err: any, data: any) => {
    //   if (err) {
    //     res
    //       .status(400)
    //       .json({ status: false, message: "Not valid users", Error: err });
    //   } else {
    //     res.status(200).json({ status: true, data: data });
    //   }
    // });
    if (!data) {
      throw new BadRequestError("Unable to find User");
    }
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: (error as any).message ? (error as any).message : "Debug Backend",
    });
  }
};

const updateMyDetails = (req: Request, res: Response, next: NextFunction) => {
  const objId = res?.locals?.number.id.trim();

  let new_image = "";

  if (req.file) {
    new_image = req.file?.filename; //assign and then remove
    console.log(new_image);
    try {
      fs.unlinkSync(
        "E:/11tsc/src/imagemodel/imageuploads/" + req.body.old_image
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image; //if image not want to change
  }

  Users.findByIdAndUpdate(
    objId,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      emergency_number: req.body.emergency_number,
      // req.body,
      // image: new_image,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
};

const countUser = async (req: Request, res: Response, next: NextFunction) => {
  // to count number of users in our gym
  // const user = await Users.find({}).count();
  // console.log("hit");
  const user = await Users.find({ isAdmin: !true }).count();
  res.send({ status: true, count: user });
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  //login credentials
  const number = res.locals.number.name;
  console.log("🚀 ~ file: userController.ts:280 ~ login ~ number", number);
  const data = res.locals.number;
  console.log("🚀 ~ file: userController.ts:282 ~ login ~ data", data);
  // console.log(number);
  try {
    if (number) {
      res.status(200).json({
        status: true,
        message: `Welcome : ${number}`,
        isAdmin: data.isAdmin,
        data: data,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Not a valid user number",
        data: data,
      });
    }
  } catch (err: any) {
    res.status(400).json({ status: false, message: err.message });
  }
};
const admin = (req: Request, res: Response, next: NextFunction) => {
  const data = res.locals.number;
  if (data) {
    console.log(data.phone);
    res.status(200).json({
      status: true,
      message: "Welcome admin",
      isAdmin: data.isAdmin,
      datas: data,
    });
  }
};
const searchUser = async (req: Request, res: Response, next: NextFunction) => {
  // searching the users
  try {
    let documentCount = await Users.estimatedDocumentCount();
    const searchTerm = req.query.searchTerm as string | undefined;

    // advance features within users
    let features: ApiFeatures;
    if (searchTerm) {
      features = new ApiFeatures(
        Users.find({
          $and: [
            {
              name: {
                $regex: searchTerm,
                $options: "xi",
              },
              isAdmin: false,
            },
          ],
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
    } else {
      features = new ApiFeatures(Users.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    }

    let doc = await features.query;
    // console.log(doc);
    console.log(typeof searchTerm);

    // model_type === "UBT" || model_type === "CBT"
    //   ? await ModelSet.find({
    //       $text: { $search: model_type },
    //       status: "published",
    //     }).countDocuments()
    //   : documentCount,

    res.status(200).json({
      // countType: Users.find({
      //   $text: { $search: searchTerm },
      // }).countDocuments(),
      result: doc.length,
      total: documentCount,
      data: doc,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message ? (error as any).message : "failed to get Users "
    );
  }
};
const nameSearch = async (req: Request, res: Response) => {
  try {
    const number = req.body.phone;

    if (!number) {
      throw new BadRequestError("Please send Number");
    }
    const regex = new RegExp(/^\+97798\d{8}$/);
    if (!regex.test(number)) {
      throw new BadRequestError(
        "Number must be starting with +977 followed by 98 and shoud be length of 14 digits"
      );
    }

    // if (!phoneNumberRegex.test(number)) {
    //   throw new BadRequestError("Number must stars with +977");
    // }
    const data = await Users.findOne({ phone: number }).select("name phone image");
    if (!data) {
      throw new BadRequestError("Unable to Find Number");
    }

    res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: (error as any).message ? (error as any).message : "Debug Backend",
    });
  }
};
const createUserHimself = async (req: Request, res: Response) => {
  const { name, email, phone, emergency_number } = req.body;
  try {
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (!name || !email || !phone) {
      throw new BadRequestError(
        "All fields Name , Email and Phone Numbers are necessary"
      );
    }
    if (email) {
      if (!check(email).isEmail()) {
        throw new BadRequestError("Email must be valid email format");
      }
      const user = await Users.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists ,Try another email");
      }
    }
    if (phone) {
      const regex = new RegExp(/^\+97798\d{8}$/);
      if (!regex.test(phone)) {
        throw new BadRequestError(
          "Number must be starting with +977 followed by 98 and shoud be length of 14 digits"
        );
      }
      const number = await Users.findOne({ phone });
      if (number) {
        throw new BadRequestError("Phone number already exists");
      }
    }
    if (emergency_number) {
      const regex = new RegExp(/^\+97798\d{8}$/);
      if (!regex.test(emergency_number)) {
        throw new BadRequestError(
          "Emergency Number must be starting with +977 followed by 98 and shoud be length of 14 digits"
        );
      }
    }
    const data = await Users.build({
      name,
      email,
      phone,
      emergency_number,
      created: formattedDate,
    }).save();
    if (!data) {
      throw new BadRequestError("Failed to create User");
    }
    res.status(201).json({ status: true, user: data });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: (error as any).message
        ? (error as any).message
        : "Failed to create User. Debug Backend!",
    });
  }
};
export default {
  createUsers,
  displayUsers,
  getIndividualUsers,
  deleteUsers,
  updateUsers,
  displayMe,
  updateMyDetails,
  countUser,
  aggregrate,
  login,
  admin,
  searchUser,
  nameSearch,
  createUserHimself,
};
