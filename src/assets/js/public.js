Date.prototype.Format = function(fmt)//日期格式
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))  {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
function getUrlParam1(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = (decodeURI(window.location.href).split('?')[1]+"").match(reg); //匹配目标参数(注意用的是href而不是search，因为search只能获取问好以后文字结束)
	if (r != null) return unescape(r[2]); return ''; //返回参数值
}
function getTimeArr(begin, end,type){  //获取两个时间相邻的数组  type:目前可传"yyyy-MM-dd hh" "yyyy-MM-dd" "yyyy-MM"格式的时间
    var arr=[];
    if(type=="yyyy-MM-dd hh"){
        var beginDate=new Date(begin+":00");
        var endDate=new Date(end+":00");
        var msCount=60*60*1000;  //每隔一小时相加数(可改变基数)
    }else if(type=="yyyy-MM-dd hh:mm"){
    	var beginDate=new Date(begin+":00");
        var endDate=new Date(end+":00");
        var msCount=30*60*1000;  //30分钟 10分钟 5分钟 15分钟
    }else if(type=="yyyy-MM-dd"){
        var beginDate=new Date(begin+" 00:00");
        var endDate=new Date(end+" 00:00");
        var msCount=24*60*60*1000;  //每隔一天相加数(可改变技术)
    }else if(type=="yyyy-MM"){
    	var startDate=begin.split("-");
    	var endDate1=end.split("-");
    	 var intervalMonth = (parseInt(endDate1[0]*12)+parseInt(endDate1[1])) - (parseInt(startDate[0]*12)+parseInt(startDate[1]));
    	 arr=getMonthArr(end,intervalMonth+1);
    	 return arr;
    }else if(type=="yyyy"){
    	for(var i=parseInt(begin);i<=parseInt(end);i++){
    		arr.push(i.toString());
    	}
    	return arr;
    }
    var beginMs=beginDate.getTime();
    var endMs=endDate.getTime();
    for(var i=beginMs;i<=endMs;i+=msCount){
    	if(type=="yyyy-MM-dd hh"){
    		arr.push(new Date(i).Format(type)+":00");
    	}else if(type=="yyyy-MM-dd hh:mm"){
    		arr.push(new Date(i).Format(type));
    	}
    	else if(type=="yyyy-MM-dd"){
            arr.push(new Date(i).Format(type));
    	}
    }
    return arr;
}
function getMonthArr(sDate,n){//得到最近n个月份的数组
    var arr=[];
    arr.push(sDate);
    while(n>1){
        arr.unshift(getBeforMonth(sDate));
        sDate=getBeforMonth(sDate);
        n--;
    }
    return arr;
}
function getBeforMonth(date){
    var lastMonth="";
    var year=date.split("-")[0],month=date.split("-")[1];
    if(month==1){
        lastMonth=(year-1)+"-"+12;
    }else{
        lastMonth=year+"-"+add0(month-1);
    }
    return lastMonth;
}