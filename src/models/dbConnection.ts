const mongoose = require('mongoose')

export default function databaseConnection() {
    mongoose
        .connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_LINK}`,
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
