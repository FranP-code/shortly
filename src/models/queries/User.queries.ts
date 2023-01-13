/* eslint-disable quotes */
import { IUser, UserModel } from '../schemas/User.schema'
import { ulid } from 'ulid'
import { decrypt, encrypt } from '../../scripts/crypto'
import { UserRoles } from '../../utils/constants'
import removeEmptyProperties from '../../scripts/removeEmptyProperties'

export async function getUserData(
    data: {
        userId?: number
        username?: string
        email?: string
    } & ({ username: string } | { email: string })
) {
    return UserModel.find(removeEmptyProperties(data))
}

export async function getUserDataWithId(
    data: {
        username?: string
        email?: string
        password?: string
    } & ({ username: string } | { email: string })
) {
    const { username, email, password } = data
    const user = await UserModel.findOne(
        removeEmptyProperties({ username, email })
    )
    if (!user) {
        throw new Error(JSON.stringify({ message: "user don't found" }))
    }
    if (
        decrypt({
            content: user.password,
            iv: user.crypto.iv,
        }) === password
    ) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    } else {
        throw new Error(JSON.stringify({ message: "password don't match" }))
    }
}

export async function createUser(data: {
    email: string
    password: string
    username: string
    role: UserRoles
    sponsorUid: string
    firstUserPassword?: string
}) {
    const { email, password, username, role, sponsorUid } = data
    const { iv, content: encryptedPassword } = encrypt(password)
    const ulidSeed = process.env.ULID_SEED && parseInt(process.env.ULID_SEED)
    const newUser: IUser = {
        id: typeof ulidSeed === 'number' ? ulid(ulidSeed) : ulid(),
        dateCreated: new Date(),
        email,
        password: encryptedPassword,
        role,
        username,
        crypto: { iv },
    }
    const existingUsername = await UserModel.countDocuments({ username })
    const existingEmail = await UserModel.countDocuments({ email })
    if (existingUsername || existingEmail) {
        throw new Error(
            JSON.stringify({
                message: 'fields duplicated',
                fieldsDuplicated: [
                    existingUsername && 'username',
                    existingEmail && 'email',
                ],
            })
        )
    }
    const firstUserCreated = !(await UserModel.count())
    if (firstUserCreated) {
        if (data.firstUserPassword !== process.env.FIRST_USER_PASSWORD) {
            throw new Error(
                JSON.stringify({
                    message: 'wrong first user password',
                })
            )
        }
    } else {
        console.log(sponsorUid)
        if (!sponsorUid) {
            throw new Error(
                JSON.stringify({
                    message: 'no sponsor user param',
                })
            )
        }
        const sponsorUser = await UserModel.findOne({ id: sponsorUid })
        if (!sponsorUser) {
            throw new Error(
                JSON.stringify({
                    message: 'no sponsor user',
                })
            )
        }
    }
    const userModelCreation = new UserModel(newUser)
    await userModelCreation.save()
}
