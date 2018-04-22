// community.js
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
        bookImgPath: '../../images/hn.jpg'
      }, {
        identity: 'BOB',
        leader: 'BOB粉丝后援团',
        memberNum: 7,
        reason: '热门',
        bookImgPath: '../../images/mss.jpg'
      }, {
        identity: '笺笺粉丝会',
        leader: 'Nobody',
        memberNum: 5,
        reason: '热门',
        bookImgPath: '../../images/lc.jpg'
      }
    ],
    myCommunityList: [
      {
        identity: 'ToBeNo.2',
        leader: 'BBB',
        memberNum: 5,
        bookImgPath: '../../images/hn.jpg'
      }, {
        identity: 'DOD',
        leader: 'DDD',
        memberNum: 4,
        bookImgPath: '../../images/mss.jpg'
      }
    ]
  },
  onLoad: function () {
    let self = this;
    wx.getSystemInfo({
      success(res) {
        const {
          tabs,
          activeIndex,
        } = self.data
        const { windowWidth } = res
        const tabWidth = windowWidth / tabs.length
        const sliderWidth = tabWidth * 0.75
        const sliderLeft = tabWidth * 0.125
        self.setData({
          sliderLeft,
          sliderOffset: tabWidth * activeIndex,
          sliderWidth,
        });
        //const callback = tabs[0].callback
        //self[callback]()
      }
    });
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  },
  showWorking: function () {
    wx.showToast({
      title: '正在开发中',
      icon: '',
      image: '../../icons/working.png',
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
});