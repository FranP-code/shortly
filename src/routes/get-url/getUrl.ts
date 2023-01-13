import { Router, Request, Response } from 'express'
import { getUrlById } from '../../models/queries/Url.queries'
import generateGetUrlPage from '../../pages/getUrl/generateGetUrlPage'
import mongoErrorService from '../../services/mongoErrorService'
import { ids as forbiddenIds } from './forbidden-ids.json'
const router = Router()

router.get('/:urlId', async (req: Request, res: Response) => {
    const { urlId } = req.params
    if (!urlId || forbiddenIds.includes(urlId)) {
        res.status(400).json({
            message: 'forbidden id',
        })
    }
    try {
        const { metaData, url } = await getUrlById({
            id: urlId,
        })
        res.send(generateGetUrlPage(metaData, url))
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: mongoErrorService(error),
        })
    }
})

export default router
