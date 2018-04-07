// pages/shareBook/shareBook.js
import { JJRequest } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownerContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn,
      title: options.title,
      author: options.author
    })
    var that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/book_info?isbn=' + that.data.isbn,
      success: res => {
        console.log(res);
        that.setData({
          title_page_url: res.data.data.title_page_image
        });
      },
      fail: res => {
        console.log('fail');
        console.log(res);
      }
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
  
  },

  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  shareToSquare() {
    var that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/driftings',
      method: 'POST',
      data: {
        "isbn": that.data.isbn,
        "content": that.ownerContent
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '漂流成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) {
            setTimeout(that.goBack, 1000);
          },
        });
      },
    });
  },

  changeOwnerContent(e) {
    this.setData({
      ownerContent: e.detail.value
    })
  }
})