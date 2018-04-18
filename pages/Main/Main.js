// pages/Main/Main.js

import {JJRequest} from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    booksChange: -1,
    sentencesChange: -1,
    motto: 'Loading..',
    bookList: [ ],
    book_filter: []
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
    if (this.data.booksChange != getApp().globalData.booksChange ||
        this.data.sentencesChange != getApp().globalData.sentencesChange) {
      this.updateBookList(() => { });
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
    this.updateBookList(() => { wx.stopPullDownRefresh();});
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
    let that = this;
    wx.showActionSheet({
      itemList: ['新增书籍（扫描条形码）','添加摘录'],
      itemColor: '#000000',
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            // new Book
            that.showScanning();
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
  },
  showScanning: function () {
    let that = this;
    wx.scanCode({
      scanType: 'barCode',
      success: (res) => {
        console.log(res)
        let isbn = res.result;
        JJRequest({
          url: getApp().globalData.baseUrl + '/book_info?isbn=' + isbn,
          success: res => {
            console.log('get books information success', res);
            wx.setStorage({
              key: 'addBookInfo',
              data: res,
              success: res=> {
                wx.navigateTo({
                  url: '../newBook/newBook',
                  success: function () {
                  },
                  fail: function () {
                    wx.showToast({
                      title: '获得该书本信息失败',
                      icon: '',
                      image: '../../images/request-fail.png',
                      duration: 1000,
                      mask: true,
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }
                });
              }
            })
          },
          fail: res => {
            console.log('获得该书本信息失败',res);
            wx.showToast({
              title: '获得该书本信息失败',
              icon: '',
              image: '../../icons/request-fail.png',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        });
      }
    });
  },
  updateBookList: function(callback) {
    var that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/books',
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          console.log('get bookList', res);
          that.setData({
            bookList: res.data.data,
            book_filter: res.data.data ? res.data.data.map(() => true) : [],
            booksChange: getApp().globalData.booksChange,
            sentencesChange: getApp().globalData.sentencesChange,
            motto: '您是不是还没有做过书摘呢？点击右下角添加第一本书吧！'
          });
          if (callback) callback();
          wx.setStorage({
            key: 'bookList',
            data: res.data.data,
          });
        } else {
          console.log('failed, statusCode: ' + res.statusCode);
          wx.getStorage({
            key: '',
            success: res => {
              that.setData({
                bookList: res,
                book_filter: res ? res.map(()=>true) : [],
                booksChange: -1,
                sentencesChange: -1 //下次show时要请求数据库
              })
            },
            complete: res => {
              if (callback) callback();
            }
          });
        }
      },
      failed: res => {
        console.log('get booklist request failed');
        if (callback) callback();
      }
    });
  },
  inputTyping(e) {
    this.setData({
      book_filter: this.data.bookList ? this.data.bookList.map((item) => {
        return (item.author.indexOf(e.detail.value) !== -1 ||
          item.title.indexOf(e.detail.value) !== -1 || 
          item.sample_sentence.some(item => {
            return (item.content.indexOf(e.detail.value) !== -1 ||
            item.thought.indexOf(e.detail.value) !== -1);
          })
        );
      }) : []
    })
  },

})