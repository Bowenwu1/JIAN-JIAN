// pages/shareNote/shareNote.js
import { JJRequest } from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    thoughts: "",
    sentences_content: [],
    sentences_id: [],
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
      sentences_content: share_info.sentences_content,
      sentences_id: share_info.sentences_id
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
    console.log(that.data.sentences_id);
    JJRequest({
      url: getApp().globalData.baseUrl + '/square_sentences',
      method: 'POST',
      data: {
        sentence_ids: that.data.sentences_id,
        isbn: that.data.isbn,
        thoughts: that.data.thoughts
      },
      success: res => {
        console.log(res);
        console.log("share to square successfully")
        wx.showToast({
          title: '分享成功',
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
      fail: res => {
        console.log('fail: ', res);
        // ...
      }
    });
  }
})