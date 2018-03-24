// pages/shareNote/shareNote.js
import { JJRequest } from '../../utils/util.js'

Page({
  host: "http://111.230.135.232:3000/api",
  /**
   * 页面的初始数据
   */
  data: {
    thoughts: "",
    snetences_content: [],
    title: "",
    author: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var share_info = (wx.getStorageSync('share_info') || {});
    console.log(share_info);
    this.setData({
      isbn: share_info.isbn,
      title: share_info.title,
      author: share_info.author,
      sentences_content: share_info.sentences_content
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

  changeThought: function(e) {
    this.setData({
      thoughts: e.detail.value
    })
  },

  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  shareToSquare: function() {
    var that = this;
    console.log({
      sentences: that.data.sentences_content,
      isbn: that.data.isbn,
      thoughts: that.data.thoughts
    });
    JJRequest({
      url: that.host + '/square_sentences',
      method: 'POST',
      data: {
        sentences: that.data.sentences_content,
        isbn: that.data.isbn,
        thoughts: that.data.thoughts
      },
      success: res => {
        console.log(res);
        console.log("share to square successfully")
        that.goBack();
      },
      fail: res => {
        console.log('fail: ', res);
        // ...
      }
    });
  }
})