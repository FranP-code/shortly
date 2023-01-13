/* eslint-disable quotes */
import { decrypt } from '../../scripts/crypto'
import generateId from '../../scripts/generateId'
import isUrl from '../../scripts/isUrl'
import removeEmptyProperties from '../../scripts/removeEmptyProperties'
import { IUrl, UrlModel } from '../schemas/Url.schema'
import { UserModel } from '../schemas/User.schema'

export async function createUrl(
    data: {
        id?: string
        url: string
        username?: string
        email?: string
        password: string
    } & ({ username: string } | { email: string })
) {
    const { id, url, username, email, password } = data
    if (!isUrl(url)) {
        throw new Error('url invalid')
    }
    if (process.env.ALLOW_DUPLICATED_LINKS !== 'true') {
        const existingUrl = await UrlModel.findOne({
            url,
        })
        if (existingUrl) {
            return existingUrl
        }
        const user = await UserModel.findOne(
            removeEmptyProperties({ id, username, email })
        )
        if (!user) {
            throw new Error(JSON.stringify({ message: "user don't found" }))
        }
        if (
            decrypt({ content: user.password, iv: user.crypto.iv }) === password
        ) {
            const newUrl: IUrl = {
                id: generateId(5),
                url,
                dateCreated: new Date(),
                uploadedByUser: user.id,
            }
            return UrlModel.create(newUrl)
        }
    } else {
        throw new Error(JSON.stringify({ message: "user don't found" }))
    }
}

export async function getUrlById(data: { id: string }) {
    const { id } = data
    const url = await UrlModel.findOne({ id })
    if (!url) {
        throw new Error('no url')
    }
    return url
}
