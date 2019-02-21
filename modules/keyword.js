import {
    HTTP
} from "../util/http-p"
class KeywordModel extends HTTP {
    key = 'q' // 实例属性 搜索关键字 key
    maxLength = 10
    getHistory() {
        const words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }

    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }

    addToHistory(keyword) { // 搜索关键字写入查询历史缓存中
        let words = this.getHistory() // 获取历史关键字数组
        const has = words.includes(keyword)
        if (!has) {
            // 缓存数组长度大于maxLength,删除数组末尾的，再添加到首尾
            const length = words.length
            if (length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words) // wx.setStorageSync(key, value)
        }
    }
}

export {
    KeywordModel
}