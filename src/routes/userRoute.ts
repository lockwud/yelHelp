import {Router} from "express"
import { userController } from "../controllers/userController"
const userRouter = Router();

userRouter.post('/signUp', userController.signUp)


export default userRouter;