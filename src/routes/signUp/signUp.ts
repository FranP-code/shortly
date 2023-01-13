import { Router, Request, Response } from 'express'
import { createUser } from '../../models/queries/User.queries'
import checkMissingData from '../../scripts/checkMissingData'
import mongoErrorService from '../../services/mongoErrorService'
import { UserRoles } from '../../utils/constants'
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const values = ['email', 'password', 'username', 'role']
    const {
        email,
        first_user_password,
        password,
        role,
        sponsor_uid,
        username,
    } = req.headers
    try {
        checkMissingData(values, req)
        await createUser({
            email: <string>email,
            password: <string>password,
            username: <string>username,
            role: <UserRoles>role,
            sponsorUid: <string>sponsor_uid,
            firstUserPassword: <string>first_user_password,
        })
        res.status(201).json({
            message: 'user added',
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: mongoErrorService(error),
        })
    }
})

export default router
