// import { Request } from "express-serve-static-core";
import { findUserProfilePic, getContentType, upload } from "../services/imageServices";
import { Response, Request } from "express";
import fs from 'fs'
import path from "path";
import { registerProfilePhoto } from "../services/userService";

export const handleImageUpload = (req:Request, res:Response) => {
    console.log(`tryna upload the image`)
    //const { userId } = req.params
    upload(req, res, async (err) => { 
        if (err) {
        res.status(400).send({ message: err });
        } else {
        if (req.file == undefined) {
            res.status(400).send({ message: "No file selected!" });
        } else {
           /*  const updatedUser = await registerProfilePhoto(userId, req.file.filename)
            res.send({
            message: "File uploaded!",
            file: `avatars/${req.file.filename}`,
            updatedUser
            });*/
            
            // Process the uploaded file as needed
            res.status(200).send({
                message: 'File uploaded!',
                file: `avatars/${req.file.filename}`, // Adjust the path as necessary
            });
        } 
        }
    });
    };

export const handleImageRetrieval = async (req: Request, res:Response) => {
    console.log(`retrieving image ...hold on`)
    const { fileName } = req.params
    // console.log(fileName)
    const file: any = await findUserProfilePic(fileName)
    // console.log(file)
    const contentType = getContentType(fileName)
    // console.log(contentType)
    res.status(200)
    res.setHeader('content-type', contentType)
    res.send(file)
    
}




