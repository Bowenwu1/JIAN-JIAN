// pages/OfflineVersion/Main/Main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    motto: "小程序上没有相关离线数据呢..",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookList = wx.getStorageSync('bookList');
    console.log(bookList);
    this.setData({
      bookList
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
  onBookItemClick: function (e) {
    wx.navigateTo({
      url: '../SentencesOfBook/SentencesOfBook?isbn=' + e.currentTarget.dataset.isbn + '&title=' + e.currentTarget.dataset.title + '&author=' + e.currentTarget.dataset.author
    })
  },
})