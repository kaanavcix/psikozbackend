import fs from 'fs';
import multer from 'multer';



function FileFilter(req: any, file: Express.Multer.File, cb: any) {

  const MineTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf","audio/mpeg","audio/wav"]


  if (!MineTypes.includes(file.mimetype)) {
    cb(new Error("Bu dosya tipi desteklenmemektedir" + " " + file.mimetype), false);

  }
  cb(null, true);



}



const strogae = multer.diskStorage({
  destination: (req, file, callback) => {
    const filePath = "./uploads";

    fs.mkdirSync(filePath, {
      recursive: true,
    });

    callback(null, filePath);

  },
  filename: (req, file, callback) => {


    const extension = file.mimetype.split("/")[1];


    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    callback(null, file.originalname.split(".")[0] + "-" + "psikoz" + uniqueSuffix + "." + "." + extension);
  },
});


export const upload = multer({

  storage: strogae,

  fileFilter: FileFilter,
  // dest?:"/uploads"  



});



