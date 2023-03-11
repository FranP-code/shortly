const mongoose = require('mongoose')

export default function databaseConnection() {
    mongoose
        .connect(
            `
            mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_LINK}/?ssl=true&replicaSet=atlas-dz6t8u-shard-0&authSource=admin&retryWrites=true&w=majority
            `,
            { useNewUrlParser: true }
        )
        .catch((err: any) => console.log(err))

    mongoose.connection.once('open', async () => {
        console.log('DB connected')
    })
    mongoose.connection.once('error', (err: any) => {
        console.log(err)
    })
}
