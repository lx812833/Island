import {
    HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
    like(behavior, artID, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category // category 类型
            }
        })
    }
    // 单独获取点赞数据信息
    getClassicLikeStatus(artID, category, sCallback) {
        this.request({
            url: `classic/${category}/${artID}/favor`, //模板字符串用法
            success: sCallback
        })
    }
}

export {
    LikeModel
}