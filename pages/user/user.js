// pages/user/user.js
Page({


  data: {
    member_name: "",
    active:0,

  },

  checkmember: function(){
   let member_name= wx.getStorageSync('member');
   this.setData({member_name})

  },

  switchTab: function (e) {
    let active = e.currentTarget.dataset.index;
    this.setData({ active });
  },

  getRecordFromBaas: function (upcomingDate){
    let user_name = wx.getStorageSync('member')
    let user_record = new wx.BaaS.TableObject("user_record")
    let query = new wx.BaaS.Query()
        query.compare('user_name', '=', user_name)
        user_record.setQuery(query).find().then(res => {
          let record_date = res.data.objects[0].record_date;
          this.upcomingMeal(record_date,upcomingDate)
          this.thisMonthRecord(record_date)
          wx.setStorageSync('record_date', record_date)
        }, err => {
          // err
        })

  },
 
  upcomingMeal: function(record_date,upcomingDate){
    var upcomingMeal = upcomingDate.filter(function(item){ return record_date.indexOf(item) > -1 });
    this.setData({upcomingMeal})
  },

  thisMonthRecord: function(record_date){
    let Month = new Date().toString().split(" ")[1];
    let month=this.getmonth(Month)

    let thisMonthRecord = record_date.filter(item=>{
 
      return item.indexOf(month)!=-1
    })
    this.setData({thisMonthRecord})

  },




  upcomingRecord(){
    let upcomingDate=[];
    let date = new Date();
    date = new Date(date.setDate(date.getDate()-1));
    for(let i=1; i<30;i++){
      date = new Date(date.setDate(date.getDate()+1));
      let datestring = date.toString().split(" ")
      let week = datestring[0];
       week = this.getweek(week) 
      let month = datestring[1]
      month=this.getmonth(month)  
      datestring = datestring[3]+"年"+month+datestring[2]+"日"+"("+week+")"
      upcomingDate.push(datestring)
  }
    this.setData({upcomingDate})
    this.getRecordFromBaas(upcomingDate)
  },

  getweek: function(week){
    let x;
    switch (week) { 
      case "Sun":x="星期日"; 
      break; 
      case "Mon":x="星期一"; 
      break; 
      case "Tue":x="星期二"; 
      break; 
      case "Wed":x="星期三"; 
      break; 
      case "Thu":x="星期四"; 
      break; 
      case "Fri":x="星期五"; 
      break; 
      case "Sat":x="星期六"; 
      break; }
  
      return x;
  
  },
  
  getmonth: function (month) {
  
    let x;
    switch (month) { 
      case "Jan":x="1月"; 
      break; 
      case "Feb":x="2月"; 
      break; 
      case "Mar":x="3月"; 
      break; 
      case "Apr":x="4月"; 
      break; 
      case "May":x="5月"; 
      break; 
      case "Jun":x="6月"; 
      break; 
      case "Jul":x="7月"; 
      break; 
      case "Aug":x="8月"; 
      break; 
      case "Sep":x="9月"; 
      break; 
      case "Oct":x="10月"; 
      break; 
      case "Nov":x="11月"; 
      break; 
      case "Dec":x="12月"; 
      break; 
    }
  
      return x;
  
  },

  navigateToindex:function(){
   wx.redirectTo({
     url: '../index/index',
   })
  },

  onShow:function(){
    this.upcomingRecord()
  },

  
  onLoad: function (options) {    
    this.checkmember()
  },
})