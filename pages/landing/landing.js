// pages/landing/landing.js
Page({


  data: {

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
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })

   
  },

  onLoad: function (options) {

  },

  
})