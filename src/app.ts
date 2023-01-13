import express from 'express'
require('dotenv').config()
import databaseConnection from './models/dbConnection'
import signUp from './routes/signUp/signUp'
import getUser from './routes/getUser/getUser'
import addUrl from './routes/addUrl/addUrl'
import getUrl from './routes/get-url/getUrl'

const app = express()
const port = process.env.PORT || 3000

databaseConnection()
app.use('/get-user', getUser)
app.use('/sign-up', signUp)
app.use('/add-url', addUrl)
app.use('/', getUrl)

app.listen(port, () => {
    console.log(`shortly on port ${port}`)
})
