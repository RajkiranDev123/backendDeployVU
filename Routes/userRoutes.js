import express from "express"

import {
    userRegister, userLogin

} from "../Controllers/usersControllers.js"


const router = new express.Router()

router.post("/register", userRegister)


router.post("/login", userLogin)




export default router