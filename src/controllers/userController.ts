import fs from "fs";
import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";
import { BadRequestError } from "../errors/bad_request_error";
import moment from "moment";
import { ApiFeatures } from "../utils/api-services";
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

const aggregrate = (req: Request, res: Response, next: NextFunction) => {
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

  const data = Users.aggregate([
    {
      $lookup: {
        from: "Membership",
        localField: "_id",
        foreignField: "Users",
        as: "conversion",
      },
    },
  ]);
  res.status(200).json({ status: true, data: data });
  console.log(data);
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

const displayMe = (req: Request, res: Response, next: NextFunction) => {
  const number = res.locals.number.phone;

  Users.findOne({ phone: number }, (err: any, data: any) => {
    if (err) {
      res
        .status(400)
        .json({ status: false, message: "Not valid users", Error: err });
    } else {
      res.status(200).json({ status: true, data: data });
    }
  });
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
  const data = res.locals.number;
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
              // isAdmin: {
              //   $regex: false,
              // },
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

    res.status(200).json({
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
};
