//index.js
//0 引入 用来发送请求的
import {} from "../../request/index.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图数组
    swiperList:[
    ],
    CatesList:[],
    floorList:[]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面开始加载的时候触发的事件
  onLoad: function () {
    // 发送异步请求 优化的手段es6 ： promise
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      data:{
      },
      success:(result) =>{
        this.setData({
          swiperList:result.data.message
        })
      }
    })
    // 获取轮播图
    this.getCateList();
    //获取楼层数据
    this.getfloorList();
    // request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"}).then(
    //   result=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // )
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取轮播图
  getCateList(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      data:{
      },
      success:(result) =>{
        this.setData({
          CatesList:result.data.message
        })
      }
    })
  },
  getfloorList(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      data:{
      },
      success:(result) =>{
        this.setData({
          floorList:result.data.message
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
