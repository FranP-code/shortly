import { Router, Request, Response } from 'express'
import { getUserDataWithId } from '../../models/queries/User.queries'
import checkMissingData from '../../scripts/checkMissingData'
import checkUsernameOrEmail from '../../scripts/checkUsernameOrEmail'
import mongoErrorService from '../../services/mongoErrorService'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const values = ['password']
    const { email, username, password } = req.headers
    try {
        checkMissingData(values, req)
        checkUsernameOrEmail(<string>username, <string>email, res)
        const user = await getUserDataWithId({
            email: <string>email,
            username: <string>username,
            password: <string>password,
        })
        res.status(201).json({
            message: 'user found',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: mongoErrorService(error),
        })
    }
})
export default router
