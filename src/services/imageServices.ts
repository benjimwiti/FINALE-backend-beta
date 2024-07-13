import multer from 'multer'
import path from 'path'
import { promises as fsPromises} from 'fs'
import fs from 'fs'
import { ErrorReadingAvatarImageFile, ErrorUnlinkingAvatarImageFile } from '../utils/userErrors'
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
        const newFileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        cb(
        null,
        newFileName
        );
        console.log(`configured file name to; ${newFileName}`)
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
    try {
        const imagePath = path.join(avatarsPath, fileName)
        console.log("reading", imagePath)
        const file = await fsPromises.readFile(imagePath);
        return file
    } catch (error:any) {
        throw new ErrorReadingAvatarImageFile(`error reading avatar image File ${error.message}`)
    }
}

export const deleteProfilePic = async (fileName: string) => {
    try {
        const imagePath = path.join(avatarsPath, fileName)
        console.log("deleting",imagePath)
        await fsPromises.unlink(imagePath);
    } catch (error:any) {
        throw new ErrorUnlinkingAvatarImageFile(`error deleting avatar image File ${error.message}`)
    }
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