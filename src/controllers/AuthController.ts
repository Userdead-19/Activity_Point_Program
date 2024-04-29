import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let authTokenHeader: string | string[] | undefined = req.headers["authToken"]

        const authToken = authTokenHeader?.toString().split(" ")[1]
        if (!authToken) {
            return res.status(401).json({ message: "Unauthorized" })
        } else {
            const verification = jwt.verify(authToken, JWT_SECRET as string)
            if (verification) {
                next()
            } else {
                return res.status(401).json({ message: "Unauthorized" })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized" })
    }
}