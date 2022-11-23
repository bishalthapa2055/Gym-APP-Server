/*
import { Options, diskStorage } from "multer";
import { resolve } from "path";
import path from "path";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
// export const multerConfig = {
//   dest: resolve(__dirname, "..", "..", "uploads"),
//   storage: diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, resolve(__dirname, "..", "..", "uploads"));
//     },
//     filename: (request, file, callback) => {
//       callback(null, file.fieldname + "-" + Date.now() + ".jpg");
//     },
//   }),
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 5MB
//   },
//   fileFilter: (request, file, callback) => {
//     const formats = ["image/jpeg", "image/jpg", "image/png"];

//     if (formats.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Format not accepted"));
//     }
//   },
// } as Options;

export const multerConfig = {

var storage : multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "./uploads/"); // Uploads is the Upload_folder_name
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
}),

const maxSize: number = 1 * 10000 * 10000;

// File Uploader
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb: any) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Only supports the following filetypes - " + filetypes);
  },
}),
} as Options;
 // mypic is the name of file attribute

*/

import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "E:/11tsc/src/imagemodel/imageuploads/"); // upload file to uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg"); //creation of file names
    },
  }),
}).single("image");
export default upload;
