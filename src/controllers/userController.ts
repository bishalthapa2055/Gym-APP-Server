import Users from "../models/Users";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
// import decodeIDToken from "../authenticationToken";

const createUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const user = new Users({
    //user-> model
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file?.filename,
    // image: req.body.image,
    isAdmin: req.body.isAdmin,
    emergency_number: req.body.emergency_number,
  });

  // user = JSON.parse(user);

  await user.save((err) => {
    if (err) {
      res.status(400).json({ message: err.message, type: "danger" });
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
  return await Users.find()
    .then((data: any) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((err: any) => {
      res.status(400).json({ status: false, Error: err });
    });
};

const updateUsers = (req: Request, res: Response, next: NextFunction) => {
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
      image: new_image,
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
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  Users.findByIdAndDelete(id, (err: any, result: any) => {
    if (result.image != "") {
      //if image is not empty
      try {
        fs.unlinkSync("E:/11tsc/src/imagemodel/imageuploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }

    if (err) {
      res.json({ message: err.message });
    } else {
      res.status(200).json({ status: true, message: "sucessfully deleted" });
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
  const user = await Users.find({}).count();
  res.send({ status: true, count: user });
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  //login credentials
  const number = res.locals.number.name;
  // console.log(number);
  if (number) {
    res.status(200).json({ status: true, message: `Welcome : ${number}` });
  } else {
    res.status(400).json({ status: false, message: "Not a valid user number" });
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
};
