// pages/OfflineVersion/SentencesOfBook/SentencesOfBook.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sentencesChange: 0,

    share_or_delete: true, // true for share and false for delete 
    show_checkbox: false,
    rafted: false,
    checked_index: [],

    title: "",
    author: "",
    isbn: "",
    sentences: [
    ],

    motto: "小程序上没有这本书的摘录数据呢..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sentences = wx.getStorageSync(`sentece-isbn${options.isbn}`);
    this.setData({
      isbn: options.isbn,
      title: options.title,
      author: options.author,
      sentences,
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


  inputTyping(e) {

  }

})