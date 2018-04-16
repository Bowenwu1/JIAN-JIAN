//index.js
//获取应用实例
import { JJRequest } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    motto: '笺笺登录中...',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showButtons: false
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    /*
    if (app.globalData.userInfo) {
      console.log('globaldata');
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.userLogin();
    } else if (this.data.canIUse){
      console.log('caniuse');
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(this.data);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.userLogin();
      }
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.userLogin();
        }
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.userLogin();
        }
      })
    }
    */
    wx.getUserInfo({
      success: res => {
        console.log(res);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.userLogin();
      },
      complete: res => {
        console.log(res);
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  userLogin: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var loginData = {
          code: res.code,
          nickname: that.data.userInfo.nickName,
          avatar: that.data.userInfo.avatarUrl
        }; 
        console.log(loginData.nickname);
        if (res.code) {
          JJRequest({
            url: getApp().globalData.baseUrl+'/user/login',
            data: loginData,
            method: 'POST',
            success: function (res) {
              console.log('login',res);
              if (res.statusCode === 200) {
                console.log("登录成功");
                JJRequest({
                  url: getApp().globalData.baseUrl + '/user/self',
                  method: 'GET',
                  success: res => {
                    console.log(res);
                    getApp().globalData.__userId__ = res.data.data.self['user_id'];
                    wx.switchTab({
                      url: '/pages/Main/Main',
                    });
                  }
                })
              } else {
                that.setData({
                  motto: "登录失败，请重试",
                  showButtons: true
                })
                console.log('fail to login');
                console.log(res);
              }
            },
            fail: function (res) {
              // don't know what to do yet.....
              that.setData({
                motto: "登录失败，请重试",
                showButtons: true
              })
              console.log('fail to login');
              console.log(res);
            }

          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          that.setData({
            motto: "登录失败，请重试",
            showButtons: true
          })
        }
      },
      fail: res => {
        that.setData({
          motto: "登录失败，请重试",
          showButtons: true
        })
        console.log('fail to login');
      }
    })
  },
  onRetryTap() {
    this.setData({
      motto: '笺笺登录中...',
      showButtons: false
    });
    this.onLoad();
  },
  onOfflineTap() {
    wx.navigateTo({
      url: '../OfflineVersion/Main/Main'
    })
  }
})
