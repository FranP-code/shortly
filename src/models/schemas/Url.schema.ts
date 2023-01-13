import { model, Model, Schema } from 'mongoose'

export interface IUrl {
    id: string
    url: string
    dateCreated: Date
    uploadedByUser: string
    metaData: Object
}

export const urlSchema = new Schema<IUrl>(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: new Date(),
            required: true,
        },
        uploadedByUser: {
            type: String,
            required: true,
        },
        metaData: {
            type: Object,
            required: true,
        },
    },
    { collection: 'url', timestamps: true }
)

export const UrlModel: Model<IUrl> = model('Url', urlSchema)
