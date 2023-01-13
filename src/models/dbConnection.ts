const mongoose = require('mongoose')

export default function databaseConnection() {
    mongoose
        .connect(
            `mongodb://root:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_LINK}`,
            {
                serverSelectionTimeoutMS: 5000,
            }
        )
        .catch((err: any) => console.log(err))

    mongoose.connection.once('open', async () => {
        console.log('DB connected')
    })
    mongoose.connection.once('error', (err: any) => {
        console.log(err)
    })
}
