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
    if (res.statusCode === 401) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let loginData = {
            code: res.code,
            nickname: getApp().globalData.userInfo.nickName,
            avatar: getApp().globalData.avatarUrl
          };
          console.log(loginData.nickname);
          JJRequest({
            url: getApp().globalData.baseUrl + '/user/login',
            data: loginData,
            method: 'POST',
            success: function (res) {
              console.log('login', res);
              if (res.statusCode === 200) {
                console.log("重新登录成功");
                JJRequest(param);
              }
            }
          });
        }
      });
    }
    else if (success) {
      success(res);
    }
  }
}

module.exports = {
  formatTime: formatTime,
  JJRequest: JJRequest,
}
