// pages/goods_detail/index.js
/** 
 * 点击轮播图 预览大图
 *    1 给轮播图绑定点击事件
 *    2 调用小程序的api previewImage
 * 
 * 2 点击 加入购物车
 *    1 先绑定点击事件
 *    2 获取缓存中的购物车数据 数组格式 
 *    3 先判断 当前的商品是否已经存在于 购物车
 *    4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充会缓存 中 
 *    5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素带上 购买数量属性 num 重新把购物车数组 填充会缓存 中 
 *    6 弹出提示
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
const {goods_id} = options
console.log(goods_id)
this.getGoodDetail(goods_id);
  },
  //点击轮播图放大预览
  handlePreviewImage(e){
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    // 2 接受转递过来的图片url
    const current = e.currentTarget.dataset.url;
      wx.previewImage({
        current:current,
        urls: urls,
      })

  },
  getGoodDetail(goods_id){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data:{
        goods_id
      },
      success:(result) =>{
        this.GoodsInfo=result.data.message;
        this.setData({
          goodsObj:{
            goods_name:result.data.message.goods_name,
            goods_price:result.data.message.goods_price,
            goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
            // iphone 部分手机不识别webp图片格式
            pics:result.data.message.pics
          
          }
        })
        
      }
    })
  },
  //点击加入购物车
  handleCartAdd(){
    // 1 获取缓存中的购物车 数组(|| 转化格式)
    let cart = wx.getStorageSync('cart')||[];
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      //3 不存在 第一次添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo);
    }else{
      //4 已经存在购物车数据 执行num++
      cart[index].num++;
    }
    //5 添加完之后 重新将购物车的数据添加回缓存中
    wx.setStorageSync('cart', cart)
    //6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon:'success',
      //true 防止用户手抖疯狂点击 1.5 秒后可以再次点击
      mask:true
    });
    
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