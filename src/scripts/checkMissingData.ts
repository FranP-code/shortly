import { Request } from 'express'

export default function (values: string[], req: Request) {
    const missingData = values.reduce((arr: string[], valueName) => {
        if (!req.headers[valueName]) {
            return [...arr, valueName]
        } else {
            return arr
        }
    }, [])
    if (missingData.length) {
        throw new Error(
            JSON.stringify({
                mesasage: 'no data from user',
                properties: missingData,
            })
        )
    }
}
