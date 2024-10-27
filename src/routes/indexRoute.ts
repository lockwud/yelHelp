import { Router } from "express";
import userRouter from "./userRoute";
const mainRouter = Router();

mainRouter.use('/user', userRouter)

export default mainRouter;