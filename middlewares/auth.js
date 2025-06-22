import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization?.split(" ")[1] //"Bearer ujghfh"
        // console.log("token from auth middleware ==> ",token)
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decodedToken ==>", decodedToken)
        if (req.body) { req.body.userId = decodedToken.userId }
        req.userId = decodedToken.userId
        next()

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: error.message })
    }
}