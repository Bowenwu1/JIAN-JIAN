// pages/BookList/BookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '您的书架上还没有书籍噢，先去添加一些吧！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookList: wx.getStorageSync('bookList')
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
  showCamera: function (isbn) {
    var that = this;
    wx.navigateTo({
      url: '../Camera/Camera?isbn=' + isbn,
      success: function (res) {
      },
      fail: function () {
        wx.showToast({
          title: '失败',
          icon: '',
          image: '../../icons/working.png',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
  selectBook: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍一拍', '写一写'],
      itemColor: '#000000',
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            // go to camera
            that.showCamera(e.currentTarget.dataset.isbn);
            break;
          case 1:
            // go to write
            // not good
            wx.navigateTo({
              url: '../newNote/newNote?isbn=' + e.currentTarget.dataset.isbn,
              success: function () {
              },
              fail: function () {
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