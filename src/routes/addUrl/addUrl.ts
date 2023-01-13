import { Router, Request, Response } from 'express'
import { createUrl } from '../../models/queries/Url.queries'
import checkMissingData from '../../scripts/checkMissingData'
import checkUsernameOrEmail from '../../scripts/checkUsernameOrEmail'
import mongoErrorService from '../../services/mongoErrorService'
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const values = ['url', 'password']
    const { url, email, username, password } = req.headers
    try {
        checkMissingData(values, req)
        checkUsernameOrEmail(<string>username, <string>email, res)
        const createdUrl = await createUrl({
            email: <string>email,
            password: <string>password,
            url: <string>url,
            username: <string>username,
        })
        res.status(200).json({
            message: 'url created',
            url: createdUrl,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: mongoErrorService(error),
        })
    }
    return
})

export default router
