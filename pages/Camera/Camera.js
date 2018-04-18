// pages/Camera/Camera.js

import { JJRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // for drawing ROI
    rectPos_begin: {
      x: 0,
      y: 0
    },
    rectPos_end: {
      x: 0,
      y: 0
    },
    imageWidth: 0,
    imageHeight: 0,
    context: {},

    cameraHidden: false,
    windowWidth:0,
    windowHeight:0,
    tmpImgSrc: "",
    motto: '请在图片上划动选择现需要识别的区域，若区域过小将识别全图',
    showHint: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
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


  takePhoto() {
    const ctx = wx.createCameraContext();
    let that = this;
    console.log('take photo')
    ctx.takePhoto({
      quality: getApp().globalData.imageQuality,
      success: (res) => {
        var context = wx.createCanvasContext("drawROICanvas");
        that.setData({
          cameraHidden: true,
          tmpImgSrc: res.tempImagePath,
          context: wx.createCanvasContext('drawROICanvas')
        });
        wx.getImageInfo({
          src: res.tempImagePath,
          success: res => {
            that.setData({
              imageWidth: res.width,
              imageHeight: res.height,
              motto: '请在图片上划动选择现需要识别的区域，若区域过小将识别全图',
              showHint: true,
            })
          },
          fail: res => {

          }
        })
      },
      complete: (res) => {   }
    })
  },
  error : function(e) {
    console.log(e.detail)
  },
  reTake() {
    this.setData({
      cameraHidden: false,
      showHint: false
    })
  },
  uploadImage() {
    this.setData({motto:'图片上传中，请稍候...'});
    let that = this;
    let A = this.data.rectPos_begin;
    let B = this.data.rectPos_end;
    // 1rpx = windowWidth / 750 px
    let scaleFactor = this.data.imageWidth / (640 * this.data.windowWidth / 750);
    // 计算 x, y, width, height
    let x = Math.min(A.x, B.x) * scaleFactor;
    let y = Math.min(A.y, B.y) * scaleFactor;
    let width = Math.abs(A.x - B.x) * scaleFactor;
    let height = Math.abs(A.y - B.y) * scaleFactor;
    // 区域过小识别全图
    if (width*height <= 1000) {
      x = 0;
      y = 0;
      width = this.data.imageWidth;
      height = this.data.imageHeight;
    }
    console.log(x, y, width, height);
    wx.uploadFile({
      url: getApp().globalData.baseUrl + `/OCR?x=${x}&y=${y}&width=${width}&height=${height}`,
      filePath: that.data.tmpImgSrc,
      name: 'test',
      success: (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          if (res.data.data == undefined) {
            res.data = JSON.parse(res.data);
          }
          let recSentence = res.data.data.content;
          console.log('识别成功');
          console.log(recSentence);
          wx.setStorage({
            key: 'recSentence',
            data: recSentence
          });
          wx.redirectTo({
            url: '../newNote/newNote?isbn=' + that.data.isbn + '&rec=true',
          })
        } else {
          if (res.statusCode === 413) {
            that.setData({
              motto: '图片过大无法上传，重新拍摄将降低图片质量'
            }),
            getApp().globalData.imageQuality = 'low';
          }
          wx.showToast({
            title: '上传失败了',
            icon: '',
            image: '../../images/request-fail.png',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) {  },
          });
        }
      }
    })
  },
  startDrawing: function (e) {
    this.setData({
      rectPos_begin: {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y
      }
    });
  },
  onDrawing: function (e) {
    let A = this.data.rectPos_begin;
    let B = e.changedTouches[0];
    if (Math.abs(A.x-B.x) >= 10 || Math.abs(A.y-B.y) >= 10) {
      this.data.context.setStrokeStyle('#8f7b76');
      this.data.context.strokeRect(Math.min(A.x, B.x), Math.min(A.y, B.y), Math.abs(A.x - B.x), Math.abs(A.y - B.y));
      this.data.context.draw();
      this.setData({
        rectPos_end: {
          x: B.x,
          y: B.y
        }
      });
    }
  },
  endDrawing: function (e) {
    this.data.context.setStrokeStyle('#fff7c4');
    let A = this.data.rectPos_begin;
    let B = e.changedTouches[0];
    this.data.context.strokeRect(Math.min(A.x, B.x), Math.min(A.y, B.y), Math.abs(A.x - B.x), Math.abs(A.y - B.y));
    this.data.context.draw();
    this.setData({
      rectPos_end: {
        x: B.x,
        y: B.y
      }
    });
  }
})