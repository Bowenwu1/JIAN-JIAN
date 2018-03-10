// pages/SentencesOfBook/SentencesOfBook.js
import { JJRequest } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    author: "",
    isbn: "",
    sentences: [
    ]
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
    var that = this;
    JJRequest({
      url: 'http://111.230.135.232:3000/api/sentence?isbn=' + that.data.isbn,
      method: 'GET',
      success: res => {
        console.log("get sentences successfully");
        console.log(res.data.data);
        that.setData({
          sentences: res.data.data
        });
      }
    })
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

  onAddSentenceClick: function (position) {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍一拍', '读一读', '写一写'],
      itemColor: '#000000',
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            // go to camera
            that.showCamera();
            break;
          case 1:
            // go to talk
            // not good
            that.showWorking();
            break;
          case 2:
            // go to write
            // not good
            wx.navigateTo({
              url: '../newNote/newNote?isbn='+that.data.isbn,
              success: function () {
              },
              fail: function() {
                // ...
              }
            })
            break;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})