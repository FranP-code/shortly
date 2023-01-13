import { Response } from 'express'

export default function (username: string, email: string, res: Response) {
    if (![username, email].filter((value) => value).length) {
        res.status(400).json({
            message: 'not username or email',
        })
        return
    }
}
