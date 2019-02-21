// components/classic/music/index.js
import {
  classicBeh
} from "../classic-beh"
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  //多继承
  /**
   * 覆盖准则：
   * 如果有同名的属性或方法，组件本身的属性或方法会覆盖 behavior 中的属性或方法，
   * 如果引用了多个 behavior ，在定义段中靠后 behavior 中的属性或方法会覆盖靠前的属性或方法；
   */
  properties: { //外部属性
    // img: String,
    // content: String
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: { //内部属性
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  detached: function (event) { //组件生命周期函数，在组件实例被从页面节点树移除时执行
    //hidden不能触发detach函数
    backgroundAudioManager.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //播放音乐
    onPlay: function (event) {
      if (!this.data.playing) { //播放音乐
        this.setData({
          playing: true
        })
        backgroundAudioManager.src = this.properties.src
      } else { // 暂停音乐
        this.setData({
          playing: false
        })
        backgroundAudioManager.pause()
      }
    }
  }
})