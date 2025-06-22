
import { users } from "../models/usersSchema.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//////////////////////////////////////////////// register ///////////////////////////////////////////////////////////////
export const userRegister = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        let user = await users.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: "user email already exists!" })
        } else {

            const hashedpassword = await bcrypt.hash(password, 10)

            const userData = new users({
                email, password: hashedpassword
            })

            await userData.save()
            return res.status(201).json({ userData, message: "Account Created!" })
        }
    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}
///////////////////////////////////////////////////////login//////////////////////////////////////////////////////////////////////////

export const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!", })
        }
        const user = await users.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: "User does not exists!", })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password!", })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "6d" })


        return res.status(200).json({ message: "User logged-in Successfully!", token: token, email: email,userId:user?._id })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

