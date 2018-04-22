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
    if (success) {
      success(res);
    }
  }
}

module.exports = {
  formatTime: formatTime,
  JJRequest: JJRequest,
}
