import { Schema, model, Model } from 'mongoose'
import { Crypto, UserRoles } from '../../utils/constants'
export interface IUser {
    id: string
    username: string
    email: string
    password: string
    dateCreated: Date
    role: UserRoles
    crypto: Crypto
}

export const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: new Date(),
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        crypto: {
            type: Object,
            required: true,
        },
    },
    { collection: 'user', timestamps: true }
)

export const UserModel: Model<IUser> = model('User', userSchema)
