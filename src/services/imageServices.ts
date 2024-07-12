import multer from 'multer'
import path from 'path'
import { promises as fsPromises} from 'fs'
import fs from 'fs'
const avatarsPath = path.join(__dirname, "..", "avatar")

const configureAvatarPath = async () => {
    try {
        if (!fs.existsSync(avatarsPath)) {
            await fsPromises.mkdir(avatarsPath)
        }
    } catch (err) {
        console.log(err)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        configureAvatarPath()
        cb(null, avatarsPath);
    },
    filename: (req, file, cb) => { //configures req.file
        cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
    });

    
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Error: Images Only!"));
    }
}

export const upload = multer({
storage: storage,
limits: { fileSize: 50000000 }, // 50MB limit
fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
},
}).single("avatar");


export const findUserProfilePic = async (fileName: string) => {
    const imagePath = path.join(avatarsPath, fileName)
    console.log(imagePath)
        const file = await fsPromises.readFile(imagePath);
        return file
}

export const getContentType = (filename: string) => {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.jpeg':
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
};
