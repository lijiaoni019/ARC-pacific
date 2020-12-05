App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,)

    wx.BaaS.init('f0003755dc4f0747ce5a')
    wx.BaaS.auth.loginWithWechat() // 静默登录
  },
})