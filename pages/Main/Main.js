// pages/Main/Main.js

import {JJRequest} from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    booksChange: -1,
    sentencesChange: -1,

    booksList: [
      /*{
        "isbn": "9787534155550",
        "title": "健康养生堂",
        "author": "张银柱",
        "title_page_image": "https://img1.doubanio.com/lpic/s29590968.jpg",
        "sample_sentence": ["一句", "两句"]
      }, {
        "isbn": "9787534155550",
        "title": "健康养生堂",
        "author": "张银柱",
        "title_page_image": "https://img1.doubanio.com/lpic/s29590968.jpg",
        "sample_sentence": ["一句", "两句"]
      }*/
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    JJRequest({
      url: getApp().globalData.baseUrl+'/books',
      method: 'GET',
      success: res => {
        console.log('get bookList success');
        that.setData({
          booksList: res.data.data,
          booksChange: getApp().globalData.booksChange,
          sentencesChange: getApp().globalData.sentencesChange
        });
        wx.setStorage({
          key: 'bookList',
          data: res.data.data,
        })
      },
      failed: res => {
        console.log('fail to get bookList');
      }
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
    if (this.data.booksChange != getApp().globalData.booksChange ||
        this.data.sentencesChange != getApp().globalData.sentencesChange) {
      this.onLoad();
    }
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
            that.showWorking();
            break;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onAddBookClick: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['新增书籍','添加书摘'],
      itemColor: '#000000',
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            // new Book
            wx.navigateTo({
              url: '../newBook/newBook',
              success: function () {
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
            break;
          case 1:
            // new Note
            //that.showWorking();
            wx.navigateTo({
              url:"../BookList/BookList"
            });
            break;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  onBookItemClick: function(e) {
    wx.navigateTo({
      url: '../SentencesOfBook/SentencesOfBook?isbn=' + e.currentTarget.dataset.isbn +'&title=' + e.currentTarget.dataset.title + '&author=' + e.currentTarget.dataset.author
    })
  }
})