<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-index">
			<div class="contain-body admin-setting">
				<ul>
					<li v-bind:class="{'active':isBannerShow}">
						<span @click="isBannerShow = !isBannerShow">修改Banner图片</span>
						<div v-if="isBannerShow" class="change-part">
							<div class="top-part clearfix">
								<span class="tips">点击图片即可替换图片</span>
								<a class="btn btn-info">
									<vue-core-image-upload class="" text="添加" inputOfFile="bannerImg" cropRatio="24:10" crop="local" resize="local" @imageuploaded="addBannerImg" :max-file-size="5242880" url="/upload/addBannerImg">
									</vue-core-image-upload>
								</a>
							</div>
							<div v-for="bannerImg in bannerImgs" class="banner-one-piece clearfix">
								<div class="left-part">
									<vue-core-image-upload class="" inputOfFile="bannerImg" cropRatio="24:10" crop="local" resize="local" :data="{'imgName':bannerImg.imgName}" @imageuploaded="changeBannerImg" :max-file-size="5242880" url="/upload/changeBannerImg">
										<img style="width: 300px; height: 127px;" :src="'../../static/banner/'+bannerImg.imgName" />
									</vue-core-image-upload>
								</div>
								<div class="right-part">
									<a @click="delBannerImg(bannerImg.imgName)" class="btn btn-danger">删除</a>
								</div>
							</div>
						</div>
					</li>
					<li v-bind:class="{'active':isPasswordShow}">
						<span @click="isPasswordShow = !isPasswordShow">修改密码</span>
						<!--确定cancelSubmitPwd这个方法意味什么，同时传给子组件isPasswordShow这个参数-->
						<change-pwd v-on:cancelSubmitPwd='cancelSubmitPwd' v-bind:isPasswordShow=isPasswordShow></change-pwd>
					</li>
				</ul>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from './../components/AdminHeader'
	import CommonFooter from './../components/CommonFooter'
	import ChangePwd from './../components/ChangePwd'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	import VueCoreImageUpload from 'vue-core-image-upload'

	export default {
		data() {
			return {
				isBannerShow: false,
				isPasswordShow: false,
				bannerImgs: [],
			}
		},
		mounted() {
			this.init();
		},
		components: {
			AdminHeader,
			CommonFooter,
			ChangePwd,
			'vue-core-image-upload': VueCoreImageUpload
		},
		methods: {
			init() {
				axios.get('/conf/jobType').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.bannerImgs = res.result.bannerImg;
					} else {}
				})
			},
			changeBannerImg(res) {
				let result = res.result;
				console.log(res);
				if(res.status == 0) {
					alert('修改成功')
					this.$router.go(0);
				}
			},
			addBannerImg(res) {
				let result = res.result;
				console.log(res);
				if(res.status == 0) {
					alert('添加成功')
					this.$router.go(0);
				}
			},
			delBannerImg(imgName) {
				axios.post('/conf/delBannerImg', {
					imgName: imgName
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						console.log(res);
					}
				})
			},
			cancelSubmitPwd(){
				this.isPasswordShow = !this.isPasswordShow;
			}
		}
	}
</script>