import multer from "multer";
import path from "path";

const image = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../storage/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

export { image };
