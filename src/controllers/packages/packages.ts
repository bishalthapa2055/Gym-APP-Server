import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/bad_request_error";
import Packages from "../../models/Packages";
import Payment from "../../models/Payment";
import { ApiFeatures } from "../../utils/api-services";

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

  const { discount_percentage, duration_in_days, name, price, status } =
    req.body;
  const isExistPackage = await Packages.findById(id);
  if (!isExistPackage) {
    throw new BadRequestError("cannot find package");
  }
  isExistPackage.discount_percentage =
    discount_percentage || isExistPackage.discount_percentage;
  isExistPackage.duration_in_days =
    duration_in_days || isExistPackage.duration_in_days;
  isExistPackage.name = name || isExistPackage.name;
  isExistPackage.price = price || isExistPackage.price;
  // isExistPackage.status = status || isExistPackage.status;
  isExistPackage.status = status || isExistPackage.status;

  await isExistPackage.save();
  res.status(200).json({
    data: isExistPackage,
  });

  try {
  } catch {
    throw new BadRequestError("failed to update");
  }
};
const statusCheck = (req: Request, res: Response, next: NextFunction) => {
  Packages.find({ status: "published" }).exec((err, docs) => {
    if (err) throw err;

    res.status(200).json({ stautus: true, data: docs });
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
      res.status(200).json({ status: true, data: data });
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
      res.status(200).json({ status: true, data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: false });
    });
};
const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var id = req.params.id;

  const { status } = req.body;
  const isExistPackage = await Packages.findById(id);
  if (!isExistPackage) {
    throw new BadRequestError("cannot find package");
  }

  // isExistPackage.status = status || isExistPackage.status;
  isExistPackage.status = status || isExistPackage.status;

  await isExistPackage.save();
  res.status(200).json({
    data: isExistPackage,
  });

  try {
  } catch {
    throw new BadRequestError("failed to update");
  }
};

const searchPublishedPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // searching the packages
  try {
    let documentCount = await Packages.estimatedDocumentCount();
    const searchTerm = req.query.searchTerm as string | undefined;

    // advance features within users
    let features: ApiFeatures;
    if (searchTerm) {
      features = new ApiFeatures(
        Packages.find({
          $and: [
            {
              name: {
                $regex: searchTerm,
                $options: "xi",
              },
              status: {
                $regex: "published",
                $options: "xi",
              },
              // status: "published",
              // u: id,
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
      features = new ApiFeatures(
        Packages.find({ status: "published" }),
        req.query
      )
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
      (error as any).message
        ? (error as any).message
        : "failed to get Packages "
    );
  }

  /*

ModelSet.find({
          $or: [
            {
              title: {
                $regex: `/\b${searchTerm}\b/i`,
                $options: "xi",
              },
            },
            {
              status: {
                $eq: "published",
              },
            },
          ],
        }),
        req.query
      )


*/
};

const searchPackages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //for searhcing and getting data for pagination
    let documentCount = await Packages.estimatedDocumentCount();
    const searchTerm = req.query.searchTerm as string | undefined;
    let features: ApiFeatures;
    if (searchTerm) {
      features = new ApiFeatures(
        Packages.find({
          $and: [
            {
              name: {
                $regex: searchTerm,
                $options: "xi",
              },
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
      features = new ApiFeatures(Packages.find(), req.query)
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
      (error as any).message ? (error as any).message : "Faild to get Packages"
    );
  }
};

export default {
  displayPackages,
  addPackages,
  getIndividualPackage,
  updatePackages,
  deletePackages,
  getMyPackage,
  updateMyPackage,
  statusCheck,
  updateStatus,
  searchPublishedPackage,
  searchPackages,
};
