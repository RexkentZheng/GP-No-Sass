	    function createOldDateUserId(userType, nowNum) {
	    	let systimePart = new Date().Format('yyyyMMdd');	//获取系统当前时间
	    	let userTypePart = "0" + userType.toString();		//获取用户类型部分
	    	//先数字转化成字符串，然后截取后面5位，然后转化成数字，增加1，然后转化成字符串
	    	let increamentNumPart = (parseInt(nowNum.toString().slice(-5)) + 1).toString();  //获取增加部分
	    	let all = parseInt(systimePart + userTypePart + increamentNumPart);  //拼接
	    	return all;
	    }
	    function createNewDateUserId(userType, nowNum) {
	    	let systimePart = new Date().Format('yyyyMMdd');
	    	let userTypePart = "0" + userType.toString();
	    	let increamentNumPart = "10000";
	    	let all = parseInt(systimePart + userTypePart + increamentNumPart);
	    	return all;
	    }
	    module.exports = {
	    	createUserId: function(maxDate, userType) {
	    		let realUserId = '';
	    		let nowDate = new Date().Format('yyyyMMdd');//获取最新时间
	    		nowDate = parseInt(nowDate.toString());
	    		let maxDateInside = maxDate
	    		//先转换成字符串然后截取前8个，最后再转化成数字
	    		maxDateInside = parseInt(maxDateInside.toString().slice(0, 8));//获取最大时间
	    		if(nowDate == maxDateInside) {   //对比两个数是否一样
	    			realUserId = createOldDateUserId(userType, maxDate);  //如果一样执行第一个函数
	    		} else {
	    			realUserId = createNewDateUserId(userType, nowDate);  //如果不一样执行第二个函数
	    		}
	    		return realUserId;
	    	}
	    }