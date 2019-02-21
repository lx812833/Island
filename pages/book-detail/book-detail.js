// components/book-detail/book-detail.js
import {
  BooksModel
} from '../../modules/books.js'
import {
  LikeModel
} from '../../modules/like.js'
let booksModel = new BooksModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid //接收从外部(book组件)传入页面的数据
    console.log(bid)
    const detail = booksModel.getDetail(bid)
    const likeStatus = booksModel.getLikeStatus(bid)
    const comments = booksModel.getComments(bid)
    wx.showLoading()

    Promise.all([detail, likeStatus, comments])
      .then(res => {
        console.log(res)
        this.setData({
          book: res[0],
          likeStatus: res[1].like_status,
          likeCount: res[1].fav_nums,
          comments: res[2].comments
        })
        wx.hideLoading()
      })

    // 上一种promise.all 方法更为简洁有效
    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400) // 400 代表书籍类型
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    const comment = event.detail.text || event.detail.value
    // const commentInput = event.detail.value 这里本来是对input输入框输入评论的，结合在一起  // 小程序规定，event.detail = {value: value}	
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12字',
        icon: 'none'
      })
      return
    }
    booksModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        })
        this.data.comments.unshift({ // 把新增评论加入数组第一位
          content: comment,
          nums: 1
        })
        this.setData({ //更新数据
          comments: this.data.comments,
          posting: false
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