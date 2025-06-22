import express from "express"
import { uploadVideo ,getVideos,deleteVideo} from "../Controllers/videoController.js"
import {upload} from "../middlewares/multer.js"
import { auth } from "../middlewares/auth.js"


const router = new express.Router()

router.post("/uploadVideoToServer",upload.single('videoFile'),auth, uploadVideo)
router.get("/getVideosFromServer",auth, getVideos)
router.delete("/delVideoFromServer",auth, deleteVideo)








export default router