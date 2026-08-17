import multer from "multer";
import path from "path";
import fs from "fs";

// Uploads folder agar exist nahi karta to bana dete hain
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer ko batate hain image kahan aur kis naam se save karni hai
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Unique naam banate hain taake 2 alag images ka naam kabhi clash na ho
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Sirf image files allow karte hain (security ke liye)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const isAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Sirf image files (jpg, png, webp, gif) allowed hain"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;