// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   *外部样式externalClasses 
   */
  externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping',{  //自定义组件触发事件时，需要使用 triggerEvent 方法，
        text: this.properties.text   //指定事件名、detail对象和事件选项：在book-detail页面引用
      })
    }
  }
})

