// pages/newBook/newBook.js
import {JJRequest} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "暂无",
    author: "暂无",
    isbn: "暂无",
    title_page_url: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getStorageSync('addBookInfo');
    this.setData({
      title: res.data.data.title,
      author: res.data.data.author,
      isbn: res.data.data.isbn,
      title_page_url: res.data.data.title_page_image
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

  showScanning: function() {
    var that = this;
    wx.scanCode({
      scanType: 'barCode',
      success: (res) => {
        console.log(res)
        var isbn = res.result;
        JJRequest({
          url: getApp().globalData.baseUrl + '/book_info?isbn=' + isbn,
          success: res => {
            console.log(res);
            that.setData({
              title: res.data.data.title,
              author: res.data.data.author,
              isbn: res.data.data.isbn,
              title_page_url: res.data.data.title_page_image
            });
          },
          fail: res => {
            console.log('fail');
            console.log(res);
          }
        });
      }
    });
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  submitNewBook() {
    var that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/books',
      method: 'POST',
      data: {
        isbn: that.data.isbn
      },
      success: res => {
        getApp().globalData.booksChange++;
        console.log(res);
        that.goBack();
      },
      fail: {
        // ...
      }
    })
  }

})