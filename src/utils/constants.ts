export type Crypto = {
    iv: string
}
export type CryptoWithContent = {
    iv: string
    content: string
}
export type UserRoles = 'admin' | 'user'
export const charactersForIdGeneration =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-()!_><'
export const isUrlRegex = new RegExp(
    '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
)
