const cookies = require('./Cookies.js').cookies;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function JJRequest(param) {
  const cookie_header = cookies.toHeader();
  if (cookie_header !== '') {
    if (param.header) {
      param.header.cookie = cookie_header;
    } else {
      param.header = {
        cookie: cookie_header,
      };
    }
  }

  const success = param.success;
  param.success = successWrap;
  wx.request(param);
  function successWrap(res) {
    if (res.header && res.header['Set-Cookie']) {
      cookies.setCookies(res.header['Set-Cookie']);
    }
    // 如果收到401返回信息重新登陆一下...
    if (res.statusCode === 401) {
      if (getApp().globalData) {
        reLogin(param);
      } else {
        wx.getUserInfo({
          success: res => {
            console.log(res);
            app.globalData.userInfo = res.userInfo;
            reLogin(param);
          },
          complete: res => {
            console.log(res);
          }
        });
      }
    }
    else if (success) {
      success(res);
    }
  }
}

const reLogin = function(param) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      let loginData = {
        code: res.code,
        nickname: getApp().globalData.userInfo.nickName,
        avatar: getApp().globalData.avatarUrl
      };
      console.log(loginData.nickname);
      // 发送登录请求
      JJRequest({
        url: getApp().globalData.baseUrl + '/user/login',
        data: loginData,
        method: 'POST',
        success: function (res) {
          console.log('login', res);
          if (res.statusCode === 200) {
            console.log("重新登录成功");
            // 获取userId
            JJRequest({
              url: getApp().globalData.baseUrl + '/user/self',
              method: 'GET',
              success: res => {
                console.log(res);
                getApp().globalData.__userId__ = res.data.data.self['user_id'];
                JJRequest(param);
              }
            });
          }
        }
      });
    }
  });
}
module.exports = {
  formatTime: formatTime,
  JJRequest: JJRequest,
}
