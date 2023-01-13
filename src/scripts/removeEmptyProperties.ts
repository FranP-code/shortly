export default function (obj: Object) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const nonEmptyEntries = Object.entries(obj).filter(([key, value]) => value)
    return Object.fromEntries(nonEmptyEntries)
}
