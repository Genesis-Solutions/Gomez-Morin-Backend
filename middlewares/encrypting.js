import multer from "multer";
import { encryptFile } from "../securityUtils/security.js";
/**
 * This file imports the "multer" package to handle file uploads, and the "Security" module to encrypt the uploaded files.
 * It defines a "storage" object that specifies the destination and filename for the uploaded files.
 * The "encrypt" function exports a middleware function that first calls "multer" to upload the files, then uses the "Security"
 * module to encrypt each uploaded file in the specified destination folder.
 *
 * @module fileUtils
 * @requires multer
 * @requires Security
 */

const storage = multer.diskStorage({
  /**
   * The "destination" function specifies the directory where uploaded files should be stored.
   *
   * @function
   * @name destination
   * @param {Object} req - The HTTP request object.
   * @param {Object} file - The uploaded file object.
   * @param {function} callback - The callback function to be called with the destination directory.
   */
  destination: function (req, file, callback) {
    callback(null, "./public/");
  },
  /**
   * The "filename" function specifies the name of the uploaded file.
   *
   * @function
   * @name filename
   * @param {Object} req - The HTTP request object.
   * @param {Object} file - The uploaded file object.
   * @param {function} callback - The callback function to be called with the filename.
   */
  filename: function (req, file, callback) {
    const timestamp = Date.now();
    return callback(null, timestamp + "-" + file.originalname);
  },
});

/**
 * The "encrypt" function exports a middleware function that handles the file upload and encryption process.
 * It first uses the "multer" package to upload the files to the specified destination folder.
 * Then it loops through each uploaded file, and uses the "Security" module to encrypt it.
 *
 * @function
 * @name encrypt
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {function} next - The next middleware function to be called.
 */
export const encrypt = (req, res, next) => {
  const upload = multer({ storage: storage }).array("file");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }

    // const pathDest = req.files[0].destination.slice(1);

    // const finalPath = path.join(__dirname, "../../" + pathDest);

    const original = process.env.SECRET_KEY_FILE;
    req.files.map((file) => {
      encryptFile("./public/", file.filename, original).then(function (
        results
      ) {
        // res.status(200).json({ code: 200, msg: "Ok" });
      });
    });
    next();
  });
};
