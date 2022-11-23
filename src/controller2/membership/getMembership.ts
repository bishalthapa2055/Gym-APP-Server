import { Request, Response, NextFunction } from "express";
import Membership from "../../models/Membership";

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
export { displayMembership as Display };
