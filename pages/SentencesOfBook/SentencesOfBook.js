// pages/SentencesOfBook/SentencesOfBook.js
import { JJRequest } from '../../utils/util.js'

Page({
  host: "http://111.230.135.232:3000/api",
  /**
   * 页面的初始数据
   */
  data: {
    share_or_delete: true, // true for share and false for delete 
    show_checkbox: false,
    checked_value: [],
    title: "",
    author: "",
    isbn: "",
    sentences: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn,
      title: options.title,
      author: options.author
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
    var that = this;
    JJRequest({
      url: that.host + '/sentence?isbn=' + that.data.isbn,
      method: 'GET',
      success: res => {
        console.log("get sentences successfully");
        console.log(res.data.data);
        that.setData({
          sentences: res.data.data
        });
      }
    })
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

  checkboxChange: function(e) {
    this.setData({
      checked_value: this.data.checked_value.concat(e.detail.value)
    });
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
            wx.navigateTo({
              url: '../newNote/newNote?isbn='+that.data.isbn,
              success: function () {
              },
              fail: function() {
                // ...
              }
            })
            break;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onDeleteSentenceClick: function(e) {
    this.setData({
      show_checkbox: true,
      share_or_delete: false
    });
  },

  onShareSentenceClick: function(e) {
    this.setData({
      show_checkbox: true,
      share_or_delete: true
    });
  },

  cancelChecking: function(e) {
    this.setData({
      show_checkbox: false,
      checked_value: []
    });
  },

  shareCheckinng: function(e) {

  },

  deleteChecking: function(e) {
    console.log(this.data.checked_value);
    var that = this;
    wx.showModal({
      title: '删除',
      content: '您将要删除这' + that.data.checked_value.length + '条书摘。',
      success: function(res) {
        if (res.confirm) {
          console.log("删除");
          JJRequest({
            url: that.host + '/sentence',
            method: 'DELETE',
            data: {
              sentence_id: that.data.checked_value
            },
            success: res => {
              console.log("delete seccessfully");
              wx.redirectTo({
                url: '../SentencesOfBook/SentencesOfBook?isbn=' + that.data.isbn + '&title=' + that.data.title + '&author=' + that.data.author
              })
            },
            fail: res => {
              console.log(res);
            }
          })
        } else if (res.cancel) {
          console.log("取消删除操作");
        }

      }

    });
  },
  

})