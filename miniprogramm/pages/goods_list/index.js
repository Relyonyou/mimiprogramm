// pages/goods_list/index.js

/**
 * 1 用户上滑页面 滚动条触底 开始加载下一页数据
 *   1 找到滚动条触底事件 开发文档
 *   2 判断有没有下一页数据
 *      1 获取到总页数 只有总条数
 *            总页数  = Math.ceil(总条数 / 页容量)
 *      2 获取当前的页码 pagenum
 *      3 判断一下  当前的页码是否大于等于 总页数
 *          表示没有下一页数据
 *   3 假如没有数据 弹出提示
 *   4 假如还有下一页数据 来加载下页数据 
 *        1 当前的页码 ++
 *        2 重新发送请求
 *        3 数据请求回来 要对data中的数组 进行 拼接 而不是全部的替换
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },{
        id:1,
        value:"销量",
        isActive:false
      },{
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid=options.cid;
   
    this.getGoodsList();
  },

  //获取商品列表的数据
  getGoodsList(){
    //加载中
    wx.showLoading({
      title: '加载中',
      mask:true
    });
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
        data:{
        },
        success:(result) =>{
          console.log(result)
          const total = 23//result.data.message.total;
          this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
          this.setData({
            // QueryParams
            // 拼接数组
            goodsList:[...this.data.goodsList,...result.data.message.goods]
          })
          //关闭图标
          wx.hideLoading();
        }
      })

  },
    // 标题的点击事件
    handletabsItemChange(e){
      // 1 获取被点击的标题索引
      const {index} = e.detail;
      // 修改数据源
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
        this.setData({
          tabs
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
    /**
     * 1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项 找到 触发下拉刷新的事件
     * 2 重置 数据 数组
     * 3 重置页码 设置为1
     * 4 重新发送请求
     * 5 数据请求回来 需要手动关闭 等待效果
     */
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
      
    this.getGoodsList();
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上滑
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      // 判断有没有下一页
      if(this.QueryParams.pagenum>=this.totalPages){
          //没有下一页数据
          wx.showToast({
            title: '暂未更多数据'
          })
      }else{
        //还有下一页
        this.QueryParams.pagenum++;
        this.getGoodsList();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})