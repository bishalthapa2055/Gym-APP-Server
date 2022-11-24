import Payment from "../../models/Payment";
import { Request, Response, NextFunction } from "express";
import path from "path";

const displayPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Payment.find({})
    .populate("userId", "phone")
    .populate("processed_by", "name")
    .populate("packages", "name")
    .then((data) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((e) => res.status(400).json({ status: false, Error: e }));
};

const addPayment = async (req: Request, res: Response, next: NextFunction) => {
  const createPayment = await Payment.create({
    // userId: req.body.userId,
    amount: req.body.amount,
    paid_via: req.body.paid_via,
    // package: req.body.package,
    // processed_by: req.body.processed_by,
  });
  createPayment.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      res.status(200).json({ status: true, data: createPayment });
      // res.redirect("/"); //redirect to the home page
    }
  });
};
const updatePayments = (req: Request, res: Response, next: NextFunction) => {
  Payment.findOneAndUpdate(
    { _id: req.params.id },
    // { $push: { userId: req.body.userId } },
    // { $push: { packages: req.body.packageId } },
    { $push: { processed_by: req.body.userId } },
    (err: any, docs: any) => {
      {
        if (err) throw err;
        else res.json({ data: docs });
      }
    }
  );
};

const patchPayments = async (req: Request, res: Response) => {
  var id = req.params.id;

  await Payment.findByIdAndUpdate(id, {
    amount: req.body.amount,
    paid_via: req.body.paid_via,
  })
    .then((data) => {
      res.status(400).send({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};

const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Payment.findByIdAndRemove(id)
    .then((data) => {
      res.status(400).send({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: false });
    });
};

const getIndividualPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Payment.findById(id)
    .populate("packages")
    .then((payment: any) =>
      payment
        ? res.status(200).json({ status: true, data: payment })
        : res
            .status(400)
            .json({ status: false, message: "No payment  is available" })
    )
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
};
const displayMyPayments = (req: Request, res: Response, next: NextFunction) => {
  const objId = res.locals.number.id.trim();
  // Payment.find({ userId: objId });
  Payment.find({ userId: objId })
    // .populate("userId", "email")
    // .populate("processed_by", "email")
    .populate("packages", "name")
    .then((data) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((e) => res.status(400).json({ status: false, Error: e }));
};
export default {
  displayPayment,
  addPayment,
  updatePayments,
  deletePayment,
  patchPayments,
  getIndividualPayment,
  displayMyPayments,
};
