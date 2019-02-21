// pages/my/my.js
import {
  BooksModel
} from '../../modules/books.js'
import {
  ClassicModel
} from '../../modules/classic.js'
const bookModel = new BooksModel()
const classicModel = new ClassicModel()
Page({

  //页面初始数据
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },
  onLoad(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  //用户登陆授权
  userAuthorized() {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  }
})