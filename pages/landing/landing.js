// pages/landing/landing.js
Page({


  data: {
    member: false,

  },

  inputChange:function(e){
   
    console.log(e)

  },

  formSubmit(e) {
    let password = e.detail.value.password
    console.log(password)
    console.log(typeof(password))
    let users_information = new wx.BaaS.TableObject("users_information")
    let query = new wx.BaaS.Query()
    query.compare('password', '=', password)
    users_information.setQuery(query).find().then((res)=>{
      if(res.data.objects==0){
        wx.showModal({
          cancelColor: 'cancelColor',
          title:"密码错误，请重新输入",
          confirmText:"确定",
          showCancel: false,
        })
      }else{
        console.log(res)
        let staff_name = res.data.objects[0].staff_name
        wx.setStorageSync('member', staff_name)
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })


   
  },

  
  navigateToUserPage: function(){
    wx.redirectTo({
      url: '../user/user',
    })
      
  },

  relogin: function(){
    this.setData({member:false})
  },

  checkmember: function (){
    let member_name = wx.getStorageSync('member');
    if(member_name) {
      this.setData({member: true})
      this.setData({member_name})
    }
     
  },

  onLoad: function (options) {
    this.checkmember()


  },

  
})