import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: '无效的开发者key',
  3000: '暂无新期刊'
}

class HTTP { //ES6 定义一个HTTP类
  request(params) { // request 实例方法(函数)
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_blink_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // 判断以2（2xx)开头的状态码为正确
        let code = res.statusCode.toString() //开发者服务器返回的 HTTP 状态码
        if (code.startsWith('2')) { // 表示参数字符串是否在源字符串的头部
          params.success && params.success(res.data)
          /**
           *  params.success && params.success(res.data)
           *  判断params.success是否为空
           *  当不为空时执行params.success回调函数
           *  等同于
           *  if(params.success) {
           *    params.success(res.data)
           *  }
           */
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }
  //下划线代表自定义私有方法
  _show_error(error_code) { 
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}