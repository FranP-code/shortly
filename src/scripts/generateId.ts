import { charactersForIdGeneration } from '../utils/constants'

export default function (length: number) {
    let result = ''
    const charactersLength = charactersForIdGeneration.length
    for (let i = 0; i < length; i++) {
        result += charactersForIdGeneration.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}
