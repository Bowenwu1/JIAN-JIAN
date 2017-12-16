// community.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["推荐", "我的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    recCommunityList: [
      {
        identity: 'ToBeNo.1',
        leader: '抱脖脖',
        memberNum: 4,
        reason: '看过的书',
        bookImgPath: '../../images/example1.jpg'
      }, {
        identity: 'BOB',
        leader: '李看山',
        memberNum: 7,
        reason: '热门',
        bookImgPath: '../../images/example2.jpg'
      }, {
        identity: '笺笺粉丝会',
        leader: 'Nobody',
        memberNum: 5,
        reason: '热门',
        bookImgPath: '../../images/example3.jpg'
      }
    ],
    myCommunityList: [
      {
        identity: 'ToBeNo.2',
        leader: 'BBB',
        memberNum: 5,
        bookImgPath: '../../images/example1.jpg'
      }, {
        identity: 'DOD',
        leader: 'DDD',
        memberNum: 4,
        bookImgPath: '../../images/example2.jpg'
      }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  communityDetail() {
    wx.navigateTo({
      url: './detail/detail'
    })
  }
});