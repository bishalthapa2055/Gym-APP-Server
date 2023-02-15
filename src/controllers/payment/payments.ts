import Payment from "../../models/Payment";
import { Request, Response, NextFunction } from "express";
import path from "path";
import { BadRequestError } from "../../errors/bad_request_error";

const displayPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Payment.find({})
    .populate("userId", "phone")
    .populate("processed_by", "name")
    .populate("package", "name")
    .then((data) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((e) => res.status(400).json({ status: false, Error: e }));
};

const addPayment = async (req: Request, res: Response, next: NextFunction) => {
  const createPayment = await Payment.create({
    userId: req.body.userId,
    amount: req.body.amount,
    paid_via: req.body.paid_via,
    package: req.body.package,
    processed_by: req.body.processed_by,
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

  // const update = await Payment.findByIdAndUpdate(id, {
  //   package: req.body.package,
  //   amount: req.body.amount,
  //   paid_via: req.body.paid_via,
  // })
  //   .then((data) => {
  //     res.status(400).send({ status: true, data: data });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ status: false });
  //   });
  try {
    const { packageId, amount, paid_via, userId, processed_by } = req.body;
    console.log(req.body);
    console.log(id);
    const isExistedPayment = await Payment.findById(id);
    console.log(
      "🚀 ~ file: payments.ts:72 ~ patchPayments ~ isExistedPayment",
      isExistedPayment
    );
    if (!isExistedPayment) {
      throw new BadRequestError("Cannot find the payment ");
    }

    isExistedPayment.package = packageId || isExistedPayment.package;
    isExistedPayment.amount = amount || isExistedPayment.amount;
    isExistedPayment.paid_via = paid_via || isExistedPayment.paid_via;
    isExistedPayment.userId = userId || isExistedPayment.userId;
    isExistedPayment.processed_by =
      processed_by || isExistedPayment.processed_by;

    await isExistedPayment.save();
    console.log(isExistedPayment);
    res.status(200).json({ status: true, data: isExistedPayment });
  } catch (e) {
    console.log(e);
  }
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
  console.log(id);
  const data = await Payment.findById(id)
    .populate("package", "name")
    .populate("processed_by", "id")
    .populate("userId", "name");
  res.status(200).json({ status: true, data: data });
  console.log(data);
  // await Payment.findById(id)
  //   .populate("packages", "name")
  //   .populate("processed_by", "id")
  //   .populate("userId", "name")
  //   .then((payment: any) =>
  //     payment
  //       ? res.status(200).json({ status: true, data: payment })
  //       : res
  //           .status(400)
  //           .json({ status: false, message: "No payment  is available" })
  //   )
  //   .catch((err: any) => res.status(400).json({ status: false, message: err }));
};
const displayMyPayments = (req: Request, res: Response, next: NextFunction) => {
  const objId = res.locals.number.id.trim();
  console.log("🚀 ~ file: payments.ts:138 ~ displayMyPayments ~ objId", objId);
  // Payment.find({ userId: objId });
  Payment.findOne({ userId: objId })
    // .populate("userId", "email")
    // .populate("processed_by", "email")
    .populate("package", "name")
    .then((data: any) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((e: any) => res.status(400).json({ status: false, Error: e }));
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
