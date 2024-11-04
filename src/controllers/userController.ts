import {Response, Request, NextFunction} from "express"
import { userService } from "../services/userService";
import { HttpException } from "../utils/httpError";
import { HttpStatus } from "../utils/httpStatusCode";
import { ErrorResponse } from './../utils/types';
import { userDto } from "../validators/userSchema";
import cloudinary from "../utils/cloudinary"
import { generateOtp, sendOtpEmail } from "../utils/otpSender";



export const userController = {
    signUp: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const data  = req.body satisfies userDto;
          const photo = req.file ? req.file.path : undefined;
          const picture = {
            photoUrl: "",
            photoKey: "",
          };
          if (photo) {
            const uploaded = await cloudinary.uploader.upload(photo, {
              folder: "users/",
            });
            if (uploaded) {
              picture.photoUrl = uploaded.secure_url;
              picture.photoKey = uploaded.public_id;
            }
          }
          const user = await userService.createUser(data, picture)
          res.status(HttpStatus.CREATED).json({message:"registeration successful", user})
        } catch(error){
        const err = error as ErrorResponse; 
            next(
            new HttpException(
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          err.message
        )
      );

        }
    },

    login: async(req: Request, res: Response, next: NextFunction)=>{
      try{
        const {email, password } = req.body
        const user = await userService.signIn(email, password)
        const otp = generateOtp();
        await userService.updateUser(user.id, {otp})
        await sendOtpEmail(email, otp)
        res.status(HttpStatus.OK).json({message: " OTP sent to your email. PLease verify to complete the login"})

      }catch(error){
        const err = error as ErrorResponse;
        next(
          new HttpException(
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            err.message
          )
        )
      }
    }
}