import { Request, Response, NextFunction } from "express";
import Packages from "../../models/Packages";
import Payment from "../../models/Payment";

const displayPackages = (req: Request, res: Response, next: NextFunction) => {
  Packages.find({}).exec((err, docs) => {
    if (err) throw err;

    res.status(200).json({ stautus: true, data: docs });
  });
};
const addPackages = async (req: Request, res: Response, next: NextFunction) => {
  const packages = new Packages({
    //user-> model

    discount_percentage: req.body.discount_percentage,
    duration_in_days: req.body.duration_in_days,
    name: req.body.name,
    photo_url: req.body.photo_url,
    price: req.body.price,
  });

  await packages.save((err: any) => {
    //save is a fxn from mongoose library
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      res.status(200).json({ status: true, data: packages });
      // res.redirect("/"); //redirect to the home page
    }
  });
};
const getIndividualPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Packages.findById(id)
    .then((packages: any) =>
      packages
        ? res.status(200).json({ status: true, data: packages })
        : res
            .status(400)
            .json({ status: false, message: "No package is available" })
    )
    .catch((err: any) => res.status(400).json({ status: false, message: err }));
};

const updatePackages = async (req: Request, res: Response) => {
  var id = req.params.id;
  await Packages.findByIdAndUpdate(id, {
    discount_percentage: req.body.discount_percentage,
    duration_in_days: req.body.duration_in_days,
    name: req.body.name,
    photo_url: req.body.photo_url,
    price: req.body.price,
  })
    .then((data) => {
      res.status(400).json({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: false });
    });
};

const deletePackages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  await Packages.findByIdAndRemove(id)
    .then((data) => {
      res.status(400).json({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: false });
    });
};

const getMyPackage = (req: Request, res: Response, next: NextFunction) => {
  //get my package details\
  const objId = res.locals.number.id.trim();
  console.log(objId, ["data"]);
  // Packages.find({});
  Payment.find({ userId: objId })
    .populate("packages")
    .exec((err: any, docs: any) => {
      if (err)
        res.status(400).json({ status: false, message: "cannot find details" });
      else {
        // Packages.find({id:})
        console.log(docs, ["payment"]);
        let packageId = docs.map((item: any) => item.packages);
        // packageId.id.toString();
        console.log(packageId, ["package"]);
        Packages.findById(packageId, (err: any, docs: any) => {
          if (err) throw err;
          res.status(200).json({ status: true, data: docs });
        });
      }
    });
};
const updateMyPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //updating my package
  //determing the userId
  var id = res.locals.number.id.trim();
  await Packages.findByIdAndUpdate(id, {
    // discount_percentage: req.body.discount_percentage,
    duration_in_days: req.body.duration_in_days,
    name: req.body.name,
    photo_url: req.body.photo_url,
    price: req.body.price,
  })
    .then((data) => {
      res.status(400).json({ status: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: false });
    });
};
export default {
  displayPackages,
  addPackages,
  getIndividualPackage,
  updatePackages,
  deletePackages,
  getMyPackage,
  updateMyPackage,
};
