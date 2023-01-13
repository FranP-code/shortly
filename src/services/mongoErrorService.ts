import { MongoServerError } from 'mongodb'

export default function mongoErrorService(error: any) {
    let responseMessage: any
    if (error instanceof MongoServerError) {
        switch (error.code) {
            case 1:
                responseMessage = '1'
                break

            default:
                responseMessage = error.message
                break
        }
    } else {
        try {
            responseMessage = JSON.parse(error.message)
        } catch {
            responseMessage = error
        }
    }
    return responseMessage
}
