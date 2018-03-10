const Cookie = require('./Cookie.js').Cookie;

function Cookies(key) {
  this._cookies = Cookies.initCookiesFromStorage(key);
  this._cookie_key = key;
}

Cookies.prototype.set = function setCookie(value) {
  const key = value.key;
  this._cookies[key] = value;
  wx.setStorage({
    key: this._cookie_key,
    data: this._cookies,
  });
}

Cookies.prototype.setRaw = function setCookieRaw(str) {
  const cookie = this.parseCookie(str);
  this.set(cookie);
}

Cookies.prototype.get = function getCookie(key) {
  return this._cookies[key];
}

Cookies.prototype.toHeader = function getCookieHeader() {
  this.prune();
  const headers = [];
  for (const key in this._cookies) {
    const cookie = this._cookies[key];
    if (cookie.check()) {
      headers.push(cookie.toString());
    }
  }
  return headers.join('; ');
}

Cookies.prototype.prune = function pruneCookie() {
  const self = this;
  const del_keys = [];
  for (const key in self._cookies) {
    if (!(self._cookies[key].check())) {
      del_keys.push(key);
    }
  }
  del_keys.forEach(function (key) {
    delete self._cookies[key];
  });
  wx.setStorage({
    key: this._cookie_key,
    data: self._cookies,
  });
}

Cookies.prototype.parseCookie = function parseCookie(cookie_str) {
  const avs = cookie_str.split(/; */);
  const kp = avs.shift().split('=');
  const key = kp[0];
  const value = kp[1];
  let expires = null;
  for (const av of avs) {
    const maxAge = av.match(/max-age=(.*);?/i);
    if (maxAge) {
      const maxAgeInt = parseInt(maxAge);
      expires = Date.now() + (isNaN(maxAgeInt) ? 0 : 1000 * maxAgeInt);
      break;
    }
    const expiresMatch = av.match(/expires=(.*);?/i);
    if (expiresMatch) {
      expires = (new Date(expiresMatch[1])).getTime();
      break;
    }
  }
  return new Cookie(key, value, expires);
};

Cookies.prototype.setCookies = function setCookies(packed_cookies) {
  const self = this;
  const cookies = packed_cookies.split(/,(?=[^ ])/);
  cookies.forEach(cookie => self.setRaw(cookie));
}

Cookies.initCookiesFromStorage = function initCookiesFromStorage(cookie_key) {
  let raw_cookies = wx.getStorageSync(cookie_key);
  if (raw_cookies === '') {
    wx.setStorageSync(cookie_key, {});
    raw_cookies = {};
  }
  const cookies = {};
  for (const key in raw_cookies) {
    const raw_cookie = raw_cookies[key];
    cookies[key] = new Cookie(raw_cookie.key, raw_cookie.value, raw_cookie.expires);
  }
  return cookies;
}

module.exports = {
  cookies: new Cookies('cookie'),
}
global.cookie = module.exports.cookies;

