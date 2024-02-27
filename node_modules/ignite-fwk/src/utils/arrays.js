export function withoutNulls(arr) {
    return arr.filter((item) => item !== null && item !== undefined)
}

console.log(null != undefined)