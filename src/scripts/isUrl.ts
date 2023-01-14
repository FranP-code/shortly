import { isUrlRegex } from '../utils/constants'

export default function (url: string) {
    return !!isUrlRegex.test(url)
}
