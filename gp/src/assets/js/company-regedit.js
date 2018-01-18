var clipArea_company_lisence = new bjj.PhotoClip("#clipArea-company-lisence", {
	size: [1000, 1000], // 截取框的宽和高组成的数组。默认值为[260,260]
	outputSize: [0, 0], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
	//outputType: "jpg", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
	file: "#upload-company-lisence", // 上传图片的<input type="file">控件的选择器或者DOM对象
	view: "#place-company-lisence", // 显示截取后图像的容器的选择器或者DOM对象
	ok: "#clipBtn-company-lisence", // 确认截图按钮的选择器或者DOM对象
	loadStart: function() {
		// 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
		$('.cover-company-lisence-wrap').fadeIn();
		console.log("照片读取中");
	},
	loadComplete: function() {
		// 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
		console.log("照片读取完成");
	},
	//loadError: function(event) {}, // 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
	clipFinish: function(dataURL) {
		// 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
		$('.cover-company-lisence-wrap').fadeOut();
		$('.upload-company-lisence-tips').fadeOut();
		$('#place-company-lisence').css('background-size', '100% 100%');
		console.log(dataURL);
	}
});