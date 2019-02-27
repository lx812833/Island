import {
  HTTP
} from '../util/http.js'

// 继承HTTP类
class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res)
        this._setLatestIndex(res.index) 
        // 缓存的写入
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrprevious, sCallBack) {
    //从缓存中 or API中获取数据并写入缓存中
    //1、确定key
    let key = nextOrprevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    //2、从缓存中读取数据
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrprevious}`, //模板字符串
        success: (res) => {
          //3、写入缓存中
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res)
        }
      })
    } else {
      sCallBack(classic)
    }
  }
  // 当前期刊是否是第一个
  isFirst(index) {
    return index == 1 ? true : false
  }
  // 当前期刊是否是最新的
  isLatest(index) { //传入的index
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false //判断latestIndex是否等于传入的index
  }
  //缓存最新期刊
  _setLatestIndex(index) { //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
    wx.setStorageSync('latest', index)
  }
  //获取最新期刊
  _getLatestIndex() { //从本地缓存中同步获取指定 key 对应的内容。
    let index = wx.getStorageSync('latest')
    return index
  }
  //第一步：获取(设置)key （期刊序号）
  _getKey(index) { //私有方法(以下划线开始)
    let key = 'classic-' + index
    return key
  }
  getMyFavor(success) {
    const parmas = {
      url: 'classic/favor',
      success: success
    }
    this.request(parmas)
  }
}

export {
  ClassicModel
}