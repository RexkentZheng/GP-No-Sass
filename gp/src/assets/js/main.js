//日期插件
$(function() {
	$("#choose-date").jeDate({
		format: "YYYY-MM-DD",
		skinCell: "jedateblue",
	});
	$("#change-btn-student-resume-end-date").jeDate({
		format: "YYYY-MM-DD"
	});
	$("#add-btn-student-resume-start-date").jeDate({
		format: "YYYY-MM-DD"
	});
	$("#add-btn-student-resume-end-date").jeDate({
		format: "YYYY-MM-DD"
	});
})
//学生简历页
	//绑定点击事件
$('#place-portrait').on('click', function() {
	$('#upload-portrait').trigger('click');
})

//公司主页
	//绑定事件
$('#place-company-logo').on('click', function() {
	$('#upload-company-logo').trigger('click');
})
$('#place-production-img').on('click', function() {
	$('#upload-production-img').trigger('click');
})

//公司注册页面
	//绑定事件
$('#place-company-lisence').on('click',function () {
	$('#upload-company-lisence').trigger('click');
})
