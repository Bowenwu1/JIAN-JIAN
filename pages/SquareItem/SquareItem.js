// pages/SquareItem/SquareItem.js
import { JJRequest } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareId: '',
    showCommentAddArea: false,
    newCommentContent: '',
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      squareId: options.square_id
    });
    var that = this;
    wx.getStorage({
      key: 'squareItem',
      success: function(res) {
        that.setData(res.data);
        that.getComment();
      },
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

  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  toggleLike(e) {
    let that = this;
    console.log(`点赞操作id为${that.data.square_id}`);
    if (that.data.whetherZanByMe === 0) {
      JJRequest({
        url: getApp().globalData.baseUrl + '/zan?squareId=' + that.data.square_id,
        method: 'POST',
        success: res => {
          if (res.statusCode == '200' && res.data.data.result == true) {
            that.setData({
              whetherZanByMe: 1,
              zan_num: that.data.zan_num+1
            })
          }
        }
      });
    } else {
      JJRequest({
        url: getApp().globalData.baseUrl + '/zan?squareId=' + that.data.square_id,
        method: 'DELETE',
        success: res => {
          if (res.statusCode == '200' && res.data.data.result == true) {
            that.setData({
              whetherZanByMe: 0,
              zan_num: that.data.zan_num-1
            })
          }
        }
      });
    }
  },
  addComment() {
    if (this.data.showCommentAddArea === true) {
      this.cancelComment();
    } else {
      this.setData({
        showCommentAddArea: true
      });
    }
  },
  changeCommentContent(e) {
    this.setData({
      newCommentContent: e.detail.value
    })
  },
  cancelComment() {
    this.setData({
      showCommentAddArea: false
    })
  },
  submitComment() {
    let that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/comment?squareId=' + that.data.squareId,
      method: 'POST',
      data: {
        "comment": that.data.newCommentContent
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) {
            setTimeout(()=>{
              that.getComment();
              that.cancelComment();
              that.setData({
                newCommentContent: ''
              })
            }, 1000);
          },
        });
      }
    })
  },
  digestItem() {
    if (this.data.squareId !== '') {
      let that = this;
      console.log(`摘走id为${that.data.squareId}`);
      JJRequest({
        url: getApp().globalData.baseUrl + '/sentence/' + that.data.squareId,
        method: 'POST',
        success: res => {
          console.log('摘走', res);
          getApp().globalData.sentencesChange++;
          wx.showToast({
            title: '摘录成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          });
        }
      })
    }
  },
  getComment() {
    let that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/comment?squareId=' + that.data.squareId,
      method: 'GET',
      success: res => {
        console.log('get comment', res);
        that.setData({
          comments: res.data.data.comments
        })
      }
    })
  }
})