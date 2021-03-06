//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dateOption:[],
    pickedDate:[],

    qdDialog: {
      show: false, //是否显示
      title: "确认以下报餐日期", 
      content:"", 
      buttonsShowVertical:true,//按钮横排还是竖排
      showinput:false,//是否显示输入框
 
    },


 
  },

  openDialog: function (e) {
    console.log(e)
    let qdDialog = this.data.qdDialog;
    let pickedDate = this.data.pickedDate
    qdDialog.show = true;
    qdDialog.content = pickedDate;
    this.setData({ qdDialog: qdDialog })
  },

  //关闭弹框
  closeDialog: function () {
    let qdDialog = this.data.qdDialog;
    qdDialog.show = false;
    qdDialog.buttons = [];
    this.setData({ qdDialog: qdDialog })
    this.setData({pickedDate:[]})
  },

pickDate: function (e){
 console.log(e)
 let dateOption=this.data.dateOption
 let index = e.currentTarget.dataset.index;
 let pickedOption = this.data.dateOption[index].active
 this.data.dateOption[index].active = !pickedOption
 this.setData({dateOption})
 
 
 console.log(index)
 console.log(pickedOption)
},

loadRecord: function(record_date){
  let dateOption=[];
  let date = new Date();
  let time = date.toString().split(" ")[4].split(":")[0]
  if(time>12){
    date = new Date(date.setDate(date.getDate()+1));
  }
  for(let i=1; i<30;i++){
    date = new Date(date.setDate(date.getDate()+1));
    let datestring = date.toString().split(" ")
    let week = datestring[0];
     week = this.getweek(week) 
    let month = datestring[1]
    month=this.getmonth(month)  
    datestring = datestring[3]+"年"+month+datestring[2]+"日"+"("+week+")"
    if(datestring.indexOf("星期日")==-1){
      let length = dateOption.length
      dateOption.push({datestring,active:false,index:length})
    }
}
  this.setData({dateOption})
  this.updateRecord(dateOption,record_date)
},

updateRecord: function (dateOption,record_date){

  for (let item of dateOption){
    let datestring = item.datestring
    if (record_date.indexOf(datestring)!=-1){
      item.active = true
    }
  }

this.setData({dateOption})

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


dateSubmit: function(){
  let pickedDate = this.data.pickedDate
  let dateOption = this.data.dateOption
  let pickedOption = dateOption.filter(item=>item.active==true)
  for(let item of pickedOption) {
    console.log(item)
    let date = item.datestring
    pickedDate.push(date)
  }
  if(pickedDate.length ==0) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"请选择报餐日期",
      showCancel: false,
    })
    return;
  }
  
  console.log(pickedDate)
  this.setData({pickedDate})
  wx.setStorageSync('pickedDate', pickedDate)
  this.openDialog()
},

dateReset: function(){
  let dateOption = this.data.dateOption;
  for (let item of dateOption){
    item.active = false;
  }
  this.setData({dateOption})

},

pushDatatoBaas:function(e){
  let member_name = wx.getStorageSync('member')
  let record_date = wx.getStorageSync('record_date')
  let pickedDate = this.data.pickedDate;
  if(!record_date){let User_record = new wx.BaaS.TableObject("user_record")
  let user_record = User_record.create()
  let record = {user_name: member_name, record_date:pickedDate}
  user_record.set(record).save().then(res => {
    wx.redirectTo({
      url: '../user/user',
    })
    wx.showToast({
      title: '报餐成功！',
    })
  }, err => {
  })}else{
    
  }
  
    
},


// pushDatatoBaas:function(e){
//   let member_name = wx.getStorageSync('member')
//   let pickedDate = this.data.pickedDate;
//   let User_record = new wx.BaaS.TableObject("user_record")
//    for (let item of pickedDate){
//     let user_record = User_record.create()
//     let record = {user_name: member_name, record_date:item}
//     user_record.set(record).save().then(res => {
//       wx.redirectTo({
//         url: '../user/user',
//       })
//       wx.showToast({
//         title: '报餐成功！',
//       })
//     }, err => {
//     })
    
//   } 
// },

navigateToUserPage: function (){
  wx.navigateTo({
    url: '../user/user',
  })
},

  onLoad:function(){
    let record_date = wx.getStorageSync('record_date')
    this.setData({record_date})
    this.loadRecord(record_date)
    
  
  }
  
})
