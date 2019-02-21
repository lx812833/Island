// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String, //千万不要在observer中修改自身属性
      observer: function (newVal, oldVal, changePath) { //observer 表示属性值被更改时的响应函数
        let val = newVal < 10 ? '0' + newVal : newVal
        console.log(typeof val)
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
    ],
    year: 0,
    month: '',
    _index: ''
  },

  attached: function () { // Component构造器 组件生命周期函数，在组件实例进入页面节点树时执行
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})