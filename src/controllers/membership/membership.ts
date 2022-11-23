import { Request, Response, NextFunction } from "express";
import Membership from "../../models/Membership";
import {
  verifyTokenAndAuthorization,
  decodeIDToken,
  verifyTokenAndIsAdmin,
} from "../../authenticationToken";
import mongoose from "mongoose";
const displayMembership = (req: Request, res: Response, next: NextFunction) => {
  // Membership.create({ package: { name: "gbdsg" } });

  Membership.find({})
    .populate("userId", "email")
    .populate("package", "name")
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
    package: req.body.package,
    payment: req.body.payment,
  });

  await membership.save((err: any) => {
    //save is a fxn from mongoose library
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      res.status(200).json({ status: true, data: membership });
      // res.redirect("/"); //redirect to the home page
    }
  });
};

const updateMembership = (req: Request, res: Response, next: NextFunction) => {
  Membership.findOneAndUpdate(
    // { _id: req.params.id },
    { _id: req.params.id.trim() },
    // { $push: { userId: req.body.userId } },
    // { package: req.body.packageId },
    { payment: req.body.paymentId },
    { new: true },
    (err, docs) => {
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

  await Membership.findByIdAndUpdate(id, {
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    package: req.body.package,
    payment: req.body.payment,
  })
    .then((data) => {
      res.status(400).send({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};

const deleteMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Membership.findByIdAndRemove(id)
    .then((data) => {
      res.status(400).send({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
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
  const membership = await Membership.find({}).count();
  res.status(200).json({ status: true, count: membership });
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
};
