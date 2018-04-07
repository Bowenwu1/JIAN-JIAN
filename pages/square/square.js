// pages/square/square.js

import { JJRequest } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        name: "摘录",
        list: [],
        callback: "getNews",
      },
      {
        name: "漂流",
        list: [
            {
              book_owner_avator: '../../images/avatar1.jpg',
              book_owner_name: '藤椒兔',
              book_avator: '../../images/txx.jpg',
              book_name: '《檀香刑》莫言',
              book_isbn: '9787505735446',
              owner_content: 'abcd@abc.com'
            },
            {
              book_owner_avator: '../../images/avatar1.jpg',
              book_owner_name: '藤椒兔',
              book_avator: '../../images/mss.jpg',
              book_name: '《写给大家的西方美术史》蒋勋',
              book_isbn: '9787123132232',
              owner_content: '123456789110'
            }
        ],
        callback: "getRaft",
      }
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
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
        const callback = tabs[0].callback
        self[callback]()
      }
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

  tabClick(e) {
    const { currentTarget } = e
    const { callback } = this.data.tabs[currentTarget.id]
    this[callback]()
    this.setData({
      sliderOffset: currentTarget.offsetLeft,
      activeIndex: currentTarget.id
    });
  },
  
  
  
  getNews() {
    const self = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/square_sentences',
      method: 'GET',
      success: res => {
        console.log(res);
        self.setData({
          "tabs[0].list": res.data.data
        });
      },
      fail: res => {
        // ...
      }
    });

    const [{ list }] = this.data.tabs
    if (list.length === 0) list.push(...mork());
    this.setData({
      "tabs[0].list": list,
    })
  },
  getHot() {
    const [, { list }] = this.data.tabs
    if (list.length === 0) list.push(...mork());
    this.setData({
      "tabs[1].list": list,
    })
  },
  getSuggest() {
    const [, ,{ list }] = this.data.tabs
    if (list.length === 0) list.push(...mork());
    this.setData({
      "tabs[2].list": list,
    })
  },
  getItems(offset, num, api) {

  },
  toggleLike(e) {
    const { target: { dataset } = {} } = e
    const { tabId, index } = dataset
    const liked = this.data.tabs[tabId].list[index].liked
    const likeKey = `tabs[${tabId}].list[${index}].liked`
    this.setData({
      [likeKey]: !liked,
    })
  },
  selectShareItem(e) {
    var index = e.currentTarget.dataset.share;
    wx.setStorage({
      key: 'squareItem',
      data: this.data.tabs[0].list[index]
    });
    wx.navigateTo({
      url: '../SquareItem/SquareItem?square_id=' + this.data.tabs[0].list[index].square_id,
    })
  },
  getRaft() {

  }

});

function mork() {
  const morkData = [
    {
      name: "藤椒椒",
      time: "2017.9.24",
      avatar: "/images/avatar1.jpg",
      sentence: "梦里我听见莫扎特有似天来的音乐，随颤动的水纹与微风，一波波传来，推动着一艘船",
      book: "有一种候鸟",
      author: "陈少聪",
      liked: false,
    },
    {
      name: "卓君君",
      time: "2017.9.21",
      avatar: "/images/avatar2.jpg",
      sentence: "如果不相信灵魂不死，我们何以堪收这样的悲拗与绝望",
      book: "当年的体温",
      author: "王开岭",
      liked: false,
    },
    {
      name: "抱脖脖",
      time: "2017.9.21",
      avatar: "/images/avatar3.jpg",
      sentence: "我若在朝，必当荡涤奸邪，兴旺盛世！",
      book: "明朝那些事儿",
      author: "当年明月",
      liked: false,
    },
  ]
  return morkData.sort(() => Math.random() > 0.5)
}