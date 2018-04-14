// pages/Camera/Camera.js

import { JJRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraHidden: false,
    windowWidth:0,
    windowHeight:0,
    tmpImgSrc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight
        })
      },
    })
    this.setData({
      isbn: options.isbn
    })
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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

  takePhoto() {
    const ctx = wx.createCameraContext()
    console.log('take photo')
    ctx.takePhoto({
      quality: 'normal',
      success: (res) => {
        this.setData({
          cameraHidden: true,
          tmpImgSrc: res.tempImagePath
        })
      },
      complete: (res) => {
        var that = this;
        wx.uploadFile({
          url: getApp().globalData.baseUrl + '/OCR',
          filePath: res.tempImagePath,
          name: 'test',
          success: (res) => {
            console.log(res);
            res.data = JSON.parse(res.data);
            var recSentence = res.data.data.content;
            console.log('识别成功');
            console.log(recSentence);
            wx.setStorage({
              key: 'recSentence',
              data: recSentence
            });
            wx.redirectTo({
              url: '../newNote/newNote?isbn='+ this.data.isbn +'&rec=true',
            })
          }
        })
      }
    })
  },
  error : function(e) {
    console.log(e.detail)
  }
})