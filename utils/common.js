const charts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const random = function generateMixed(n) {
    let res = ''
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35) // Math.ceil() 对一个数舍入
        res += charts[id]
    }
    return res
}
export {
    random
}