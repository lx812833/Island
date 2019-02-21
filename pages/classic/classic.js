import {
  ClassicModel
} from '../../modules/classic.js'
import {
  LikeModel
} from '../../modules/like.js'
let classicModel = new ClassicModel() //实例化
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res) //获取的数据
      this.setData({
        classic: res, // 数据绑定
        // ...res  扩展字符串 引用时去掉classic
        likeStatus: res.like_status, //页面初始化时数据渲染
        likeCount: res.fav_nums
      })
    })
  },
  /**  不使用HTTP封装演示
    example(event) {
      wx.request({
        url: 'http://www.baidu.com',
        data: {},
        header: {
          'content-type': 'application/json',
          'appkey': 'AbhC31IG7ruCDp57'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {  // 回调函数 
          console.log(this.data.likeStatus)  // 使用箭头函数，this没有被指代，可以访问data中的定义
        },
        fail: () => {},
        complete: () => {}
      });
    },
  */
  //自定义函数，判断是否点赞
  onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function (event) {
    this._updateClassic('next')
  },
  onPrevious: function (event) {
    this._updateClassic('previous')
  },
  _updateClassic: function (nextOrprevious) { //函数重构
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrprevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      //更新classic数据
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },
  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})