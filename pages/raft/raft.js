// pages/raft/raft.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    raft_book_list:[
      {
        book_owner_avator: '../../images/sample-avator.png',
        book_owner_name:'藤椒兔',
        book_avator: '../../images/txx.jpg',
        book_name:'《檀香刑》莫言',
        book_isbn:'ISBN:9787505735446'
      },
      {
        book_owner_avator: '../../images/sample-avator.png',
        book_owner_name: '藤椒兔',
        book_avator: '../../images/mss.jpg',
        book_name: '《写给大家的西方美术史》蒋勋',
        book_isbn: 'ISBN:9787123132232'
      }
    ]
  },
  showWorking: function () {
    wx.showToast({
      title: '正在开发中',
      icon: '',
      image: '../../icons/working.png',
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  
  }
})