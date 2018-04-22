// pages/newNote/newNote.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allContent: "我一直认为，在上苍给人类原配的生存元素和美学资源中，“寂静”，乃最贵重的成分之一。音乐未诞生前，它是耳朵最大的福祉，也是唯一的爱情。\n并非无声才叫寂静，深巷夜更、月落乌啼、雨滴石阶、风疾掠竹……寂静之声，更显清幽，更让人神思旷远。美景除了悦目，必营养耳朵。",
    book: {
        bookName: "耳根的清静",
        userName: "-----王开岭",
        showSentences: [
          "音乐未诞生前，它是耳朵最大的福祉，也是唯一的爱情。",
          "美景除了悦目，必营养耳朵。"
        ]
      }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})