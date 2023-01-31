import { Request, Response, NextFunction } from "express";
import Membership from "../../models/Membership";
import moment from "moment";
import {
  verifyTokenAndAuthorization,
  decodeIDToken,
  verifyTokenAndIsAdmin,
} from "../../authenticationToken";
import mongoose from "mongoose";
import { BadRequestError } from "../../errors/bad_request_error";
import { ApiFeatures } from "../../utils/api-services";
const displayMembership = (req: Request, res: Response, next: NextFunction) => {
  // Membership.create({ package: { name: "gbdsg" } });

  Membership.find({})
    .populate("userId", "name")
    .populate("package", "name price")
    .populate("payment", "paid_via")
    .exec((err, docs) => {
      if (err) throw err;

      res.status(200).json({ stautus: true, data: docs });
    });
};
const addMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const membership = new Membership({
    //user-> model
    // userId: [],
    // package: [],

    start_date: req.body.start_date,
    end_date: req.body.end_date,
    userId: req.body.userId,
    package: req.body.package,
    payment: req.body.payment,
  });

  // const response = await membership.save((err: any) => {
  //   //save is a fxn from mongoose library
  //   if (err) {
  //     res.json({ message: err.message, type: "danger" });
  //   } else {
  //     const data = Membership.findById(membership.id)
  //       .populate("userId", "name")
  //       .populate("package", "name price")
  //       .populate("payment", "paid_via");
  //     console.log(membership.id);
  //     console.log(data);
  //     res.status(200).json({ status: true, data: data });
  //     // res.redirect("/"); //redirect to the home page
  //   }
  // });
  const response = await membership.save();
  const data = await Membership.findById(response.id)
    .populate("userId", "name email")
    .populate("package", "name price")
    .populate("payment", "paid_via")
    .then((members: any) =>
      members
        ? res.status(200).json({ status: true, data: members })
        : res
            .status(400)
            .json({ status: false, message: "No members  is available" })
    )
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
};

const updateMembership = (req: Request, res: Response, next: NextFunction) => {
  Membership.findOneAndUpdate(
    // { _id: req.params.id },
    { _id: req.params.id.trim() },
    // { $push: { userId: req.body.userId } },
    // { package: req.body.packageId },
    // { payment: req.body.paymentId },
    { new: true },
    (err: any, docs: any) => {
      {
        if (err) throw err;
        else res.json({ data: docs });
      }
    }
  );
};

const updateMembershipPackage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Membership.findOneAndUpdate(
    { _id: req.params.id.trim() },
    // { _id: req.params.id },
    { package: req.body.packageId },
    { new: true },
    (err, docs) => {
      {
        if (err) throw err;
        else res.json({ data: docs });
      }
    }
  );
};
const patchMembership = async (req: Request, res: Response) => {
  var id = req.params.id;

  const { userId, packageId, paymentId, start_date, end_date } = req.body;

  const isExistedMembership = await Membership.findById(id);
  if (!isExistedMembership) {
    throw new BadRequestError("Cannot find Membership");
  }

  isExistedMembership.start_date = start_date || isExistedMembership.start_date;
  isExistedMembership.end_date = end_date || isExistedMembership.end_date;
  isExistedMembership.package = packageId || isExistedMembership.package;
  isExistedMembership.payment = paymentId || isExistedMembership.payment;
  isExistedMembership.userId = userId || isExistedMembership.userId;

  // await Membership.findByIdAndUpdate(id, {
  //   start_date: req.body.start_date,
  //   end_date: req.body.end_date,
  //   package: req.body.package,
  //   payment: req.body.payment,
  // })
  //   .then((data) => {
  //     res.status(400).send({ status: true, data: data });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ status: false });
  //   });
  await isExistedMembership.save();
  const data = await Membership.findById(id)
    .populate("userId", "name email")
    .populate("package", "name price")
    .populate("payment", "paid_via")
    .then((members: any) =>
      members
        ? res.status(200).json({ status: true, data: members })
        : res
            .status(400)
            .json({ status: false, message: "No members  is available" })
    )
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
  // res.status(200).json({ status: true, data: isExistedMembership });
};

const deleteMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Membership.findByIdAndRemove(id)
    .then((data) => {
      res.status(200).send({ status: true, data: data });
    })
    .catch((err) => {
      res.status(400).send({ status: false });
    });
};

const getIndividualMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Membership.findById(id)
    .populate("userId", "email")
    .populate("package", "name")
    .populate("payment", "paid_via")
    .then((members: any) =>
      members
        ? res.status(200).json({ status: true, data: members })
        : res
            .status(400)
            .json({ status: false, message: "No members  is available" })
    )
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
};

const displayMyMembership = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const objId = res?.locals?.number.id.trim();

  Membership.find({ userId: objId })
    .populate("userId", "email")
    .populate("package", "name")
    .populate("payment", "paid_via")
    .exec((err, docs) => {
      if (err) throw err;

      res.status(200).json({ stautus: true, data: docs });
    });
};
const countMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const membership = await Membership.find({}).count();
  const membership = await Membership.find({}).count();
  console.log(membership);
  if (!membership) {
    console.log("error");
  }
  res.status(200).json({ status: true, count: membership });
};

const paginateMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // searching items

  // try {
  let documentCount = await Membership.estimatedDocumentCount();
  const searchTerm = req.query.searchTerm as string | undefined;

  //   let features : ApiFeatures;
  //   if(searchTerm{
  //     features = new ApiFeatures(
  //       Membership.find({
  //         $and :[
  //           {
  //             name :{
  //               $regex : searchTerm,
  //               $option :"xi"
  //            }
  //           }
  //         ]
  //       })
  //     )
  //   })
  // } catch (error) {
  //   throw new BadRequestError(
  //     (error as any).message
  //       ? (error as any).message
  //       : "failed to get Memberships"
  //   );
  // }
};

const findSum = async (req: Request, res: Response) => {
  // processing for summ

  try {
    const data = await Membership.find({}).populate("package", "price");

    console.log("data", data);

    const mapper = data.map((item) => {
      console.log(item.package);
      return item.package;
    });
    // console.log("maper", mapper);
    const sum = mapper.reduce((accumulator, items: any) => {
      return accumulator + items.price;
    }, 0);
    res.status(200).json({ status: true, data: sum });
  } catch (e) {
    res
      .status(400)
      .json({ status: false, message: "Unable to find total Earning" });
  }
};

const checkDate = async (req: Request, res: Response) => {
  //processing for datevalidity checking

  try {
    const data = await Membership.find();

    let date = new Date();
    let options: any = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    let formattedDate = date.toLocaleString("en-US", options);

    let dateStamp = new Date(formattedDate);

    let unixTimestamp = dateStamp.getTime() / 1000;

    const arr: any = [];
    const numbers = data.map((item) => {
      // var count = 0;

      if (Number(item.end_date) >= unixTimestamp) {
        // console.log(item.end_date);
        arr.push(item.end_date);
        return item.end_date;
      }
    });
    // console.log("numbers", numbers);
    // console.log("arr", arr.length);

    res.status(200).json({ status: true, data: numbers, count: arr.length });
  } catch (error) {
    res.status(400).json({ status: false, message: "No Available data" });
  }
};
export default {
  displayMembership,
  addMembership,
  updateMembership,
  deleteMembership,
  patchMembership,
  updateMembershipPackage,
  getIndividualMembership,
  displayMyMembership,
  countMembership,
  paginateMembership,
  findSum,
  checkDate,
};
