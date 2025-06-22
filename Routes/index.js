import { Router } from "express";

import userRouter from "./userRoutes.js"
import videorouter from "./videoRoutes.js"



const router = Router()
router.use("/users", userRouter)
router.use("/video", videorouter)


export default router