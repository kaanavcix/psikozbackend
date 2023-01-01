import fs from 'fs';
import multer from 'multer';



function FileFilter(req: any, file: Express.Multer.File, cb: any) {

  const MineTypes = ["image/png", "image/jpg", "image/jpeg","application/pdf"]


  if (!MineTypes.includes(file.mimetype)) {
    cb(new Error("Bu dosya tipi desteklenmemektedir" + " " + file.mimetype), false);

  }
  cb(null, true);


}


const storage = multer.diskStorage(
  {

    destination: (req, file, cb) => {
      const filePath = "./uploads"; //metehanın pathe ekleriz diye böyle yaptım

      if (!fs.existsSync(filePath)) { //file system bulamazsa oluşturucak klasör çokluğu olmasın burda toplarız

        fs.mkdirSync(filePath, {
          recursive: true
        });
      }
      cb(null, filePath);

    },
    filename: (req, file, cb) => {

      const uniquePath = Date.now() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1];

      cb(null, file.originalname.split(".")[0] + "-" + uniquePath);

    }

  }
);


export const upload = multer({

  storage: storage,
  
 // fileFilter: FileFilter,
  // dest?:"/uploads"  



});


//middleware yazdım image upload için




/* const upload = multer({
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            const directory = `./uploads/`

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true })
            }

            cb(null, directory)
        },
        filename: (req: Request, file: any, cb: any) => {
            cb(null, `${Date.now()}.${file.originalname.split(".")[file.originalname.split(".").length - 1]}`)
        }
    })
});
*/