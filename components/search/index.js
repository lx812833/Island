// components/search/index.js
import {
  KeywordModel
} from '../../modules/keyword.js'

import {
  BooksModel
} from '../../modules/books.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const booksModel = new BooksModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev], // behaviors 是用于组件间代码共享的特性
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      //   observer: function(newVal, oldVal, changedPath) {
      //   属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      //   通常 newVal 就是新设置的数据， oldVal 是旧数据
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false, // false会发送请求,解决重复数据的问题  加载更多动画
    loadingCenter: false //进入首页加载动画
  },

  /**
   * 组件的方法列表
   */
  attached() { //组件生命周期函数，在组件实例进入页面节点树时执行
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res => {
      console.log(res)
      this.setData({
        hotWords: res.hot
      })
    })
  },
  methods: {
    onCancel(event) {
      this.initialSize()
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event) {
      this.initialSize()
      this.setData({
        searching: false,
        q: ''
      })
    },
    // 输入框搜索方法
    onConfirm(event) {
      const q = event.detail.value || event.detail.text //前者是输入框中获取的文本，后者是tag组件标签的文本，获取方式不一样
      this.setData({
        searching: true,
        loadingCenter: true
      })
      booksModel.search(0, q).then(res => {
        console.log(res.books)
        this.setMoreData(res.books),
          this.setTotal(res.total),
          this.setData({
            q,
            loadingCenter: false
          })
        keywordModel.addToHistory(q)
      })
    },
    // search组件下滑到底部时获取新的数组
    loadMore() {
      console.log(123)
      if (!this.data.q) {
        return false
      }
      if (this.isLocked()) { // loading为true时，不能发送请求，return回去
        return
      }
      // const length = this.data.dataArray.length 引用pagination方法里的getCurrentStart替换
      if (this.hasMore()) {
        this.locked()
        booksModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books), //res.books为搜索的结果数组，为空，则不存在
              this.unlocked()
          }, () => { // 请求失败返回的回调
            this.unlocked()
          })
      }
    }
  }
})