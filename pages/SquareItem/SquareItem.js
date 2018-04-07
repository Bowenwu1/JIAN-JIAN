// pages/SquareItem/SquareItem.js
import { JJRequest } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCommentAddArea: false,
    newCommentContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      squareId: options.square_id
    });
    var that = this;
    wx.getStorage({
      key: 'squareItem',
      success: function(res) {
        that.setData(res.data);
      },
    });
    JJRequest({
      url: getApp().globalData.baseUrl + '/comment?square_id=' + that.data.squareId,
      method: 'GET',
      success: res => {
        console.log(res);
      }
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
  
  },

  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  
  addComment() {
    this.setData({
      showCommentAddArea: true
    });
  },
  changeCommentContent(e) {
    this.setData({
      newCommentContent: e.detail.value
    })
  },
  cancelComment() {
    this.setData({
      showCommentAddArea: false
    })
  },
  submitComment() {
    let that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/comment',
      method: 'POST',
      data: {
        "squareId": that.data.squareId,
        "comment": that.data.newCommentContent
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '评论成功',
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
      }
    })
  }
})