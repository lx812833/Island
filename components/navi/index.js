// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { // 组件的对外属性，是属性名到属性设置的映射表（属性从组件外部传到内部）
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      if (!this.properties.latest) { /* 判断是否是第一期，是，则禁用 */
        this.triggerEvent('left', {}, {})
      }

    },
    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})