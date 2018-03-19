// pages/Camera/Camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rectPos: {
      x: 0,
      y: 0
    },
    rectPos_end: {
      x: 0,
      y: 0
    },
    cameraHidden: false,
    windowWidth: 0,
    windowHeight: 0,
    tmpImgSrc: "",
    context: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext("firstCanvas");
    this.setData({
      context: wx.createCanvasContext('firstCanvas')
    });

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
      quality: 'high',
      success: (res) => {
        this.setData({
          cameraHidden: true,
          tmpImgSrc: res.tempImagePath
        })
        console.log(res.tempImagePath)
      },
      complete: (res) => {
        /*
        wx.redirectTo({
          url: '../newNote/newNote',
          fail: () => {
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
        })  */

      }
    })
  },
  error: function (e) {
    console.log(e.detail);
  },

  startDrawing: function(e) {
    console.log(e);
    this.setData({
      rectPos: {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y
      }
    });
  },
  onDrawing: function (e) {
    this.data.context.setStrokeStyle('#FF0000');
    this.data.context.strokeRect(this.data.rectPos.x, this.data.rectPos.y, e.changedTouches[0].x - this.data.rectPos.x, e.changedTouches[0].y - this.data.rectPos.y);
    this.data.context.draw();

  },
  endDrawing: function (e) {
    this.data.context.setStrokeStyle('#FF0000');
    this.data.context.strokeRect(this.data.rectPos.x, this.data.rectPos.y, e.changedTouches[0].x - this.data.rectPos.x, e.changedTouches[0].y - this.data.rectPos.y);
    this.data.context.draw();
    this.setData({
      rectPos_end: {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y
      }
    });
  }
})