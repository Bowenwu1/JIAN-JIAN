function Cookie(key, value, expires) {
  this.key = key;
  this.value = value;
  this.expires = expires;
}

Cookie.prototype.check = function () {
  return !this.expires || this.expires > Date.now();
}

Cookie.prototype.toString = function () {
  return `${this.key}=${this.value}`;
}

module.exports = {
  Cookie: Cookie,
};