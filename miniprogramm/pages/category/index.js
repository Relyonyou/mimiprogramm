// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单
      leftMenuList:[],
      //右侧
      rightContent:[],
      //被点击的左侧菜单
      currentIndex:0,
      //右侧内容的滚动条距离顶部的距离
      scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1 先判断一下本地存储中是否有旧数据
     * {time:Date.now(),data:[...]}
     * 2 没有旧数据 直接发送新请求
     * 
     * 3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
     * 
     */
      // 1 获取本地存储中的数据 （小程序中也是存在本地存储 技术的）
      const Cates = wx.getStorageSync('cates');
      //2 判断
      if(!Cates){
          //不存在 则发送请求获取数据
      this.getCate();
      console.log("不存在 则发送请求获取数据");
      }
      else{
        // 有旧的数据 定义过期
        if(Date.now()-Cates.time>1000*10){
            //重新发送请求
          this.getCate();
        }else{
          // 可以使用旧的数据
          console.log("可以使用旧的数据");
          this.Cates = Cates.data;
          let  leftMenuList = this.Cates.map(v=>v.cat_name);
          let  rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        }
      }
     //---------------------------------------
  },
  getCate(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      data:{
      },
      success:(result) =>{
        // 为什么这样写
       this.Cates = result.data.message

        //把接口中的数据存入到本地存储中
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});

        let  leftMenuList = this.Cates.map(v=>v.cat_name);
        let  rightContent = this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    })

    // //使用es7的async awiat发送异步请求
    //  const res = await wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    //   success:(result) =>{
    //     // 为什么这样写
    //    this.Cates = result.data.message

    //     //把接口中的数据存入到本地存储中
    //     wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});

    //     let  leftMenuList = this.Cates.map(v=>v.cat_name);
    //     let  rightContent = this.Cates[0].children;

    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   }
    // })
  },
  //左侧菜单栏的点击事件
  handleItemTap(e){
    /**
     * 1 获取被点击的标题身上的索引
     * 2 给data中的currentIndex赋值即可
     * 3 根据不同的索引来渲染右侧的商品内容
     * 
     */
    const {index} = e.currentTarget.dataset;
    let  rightContent = this.Cates[index].children;

        this.setData({
          currentIndex:index,
          rightContent,
          //重新设置置顶 右侧内容的滚动条距离顶部的距离
          scrollTop:0
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