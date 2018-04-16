const app = getApp()
// pages/Mine/Mine.js
import { JJRequest } from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    booksChange: 0,
    groupsChange: 0,

    bookshelf_image:[  ],
    join_community:[
      {
        avator: '/images/hn.jpg',
        title: '《有一种候鸟》陈少聪',
        owner:'群主：BOB',
        number_partner:'群成员：4人'
      },
      {
        avator: '/images/lc.jpg',
        title: '《东方快车》阿加莎·克里斯蒂',
        owner: '群主：藤椒鸡',
        number_partner: '群成员：4人'
      }
    ],
    personal_avator: '',
    username:'',
    read_book:0,
    read_hour:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;

    JJRequest({
      url: getApp().globalData.baseUrl + '/books',
      method: 'GET',
      success: res => {
        console.log("get bookList successful");
        that.setData({
          booksChange: getApp().globalData.booksChange,
          groupsChange: getApp().globalData.groupsChange,
          booksList: res.data.data
        });
      }
    });

    wx.getUserInfo({
      success:res=> {
        this.setData({
          username: res.userInfo.nickName,
          personal_avator: res.userInfo.avatarUrl
        })
      },
      fail:function() {
        console.log('fail to get userinfo')
      }
    })
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
    if (this.data.booksChange != getApp().globalData.booksChange ||
      this.data.groupsChange != getApp().globalData.groupsChange) {
      this.updateData();
    }
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

  onBookItemClick: function (e) {
    wx.navigateTo({
      url: '../SentencesOfBook/SentencesOfBook?isbn=' + e.currentTarget.dataset.isbn + '&title=' + e.currentTarget.dataset.title + '&author=' + e.currentTarget.dataset.author
    })
  },

  updateData: function() {
    var that = this;
    JJRequest({
      url: getApp().globalData.baseUrl + '/books',
      method: 'GET',
      success: res => {
        console.log("get bookList successful");
        that.setData({
          booksChange: getApp().globalData.booksChange,
          groupsChange: getApp().globalData.groupsChange,
          booksList: res.data.data
        });
      }
    });
  }

})