// pages/newNote/newNote.js

import { JJRequest } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn: "",
    sentenceContent: "",
    thoughtContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn
    });
    if (options.sentence != null) {
      this.setData({
        sentenceContent: options.sentence
      });
    }
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

  goBack() {
    wx.navigateBack({
      delta:1
    })
  },

  changeSentencePreview(e) {
    this.setData({
      sentenceContent: e.detail.value
    })
  },

  changeThoughtPreview(e) {
    this.setData({
      thoughtContent: e.detail.value
    })
  },

  submitNewNote() {
    var that = this;
    JJRequest({
      url: 'http://111.230.135.232:3000/api/sentence?isbn='+that.data.isbn,
      method: 'POST',
      data: {
        content: that.data.sentenceContent,
        thought: that.data.thoughtContent
      },
      success: res => {
        console.log(res);
        that.goBack();
      },
      fail: {
        // ...
      }
    })
  }
})