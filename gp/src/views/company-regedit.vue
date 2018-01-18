<template>
	<div>
		<common-header></common-header>
		<div class="container company-regedit">
			<div class="contain-body">
				<dl class="clearfix">
					<dt>用户名：</dt>
					<dd>
						<input v-model="userName" class="form-control" type="text" name="" value="" />
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>密码：</dt>
					<dd>
						<input @blur="isPwdRight" v-model="userPwd" class="form-control" type="password" name="" value="" />
					</dd>
				</dl>
				<dl v-if="pwdTip" class="clearfix tips">
					<dt>&nbsp;</dt>
					<dd>
						<span class="error-tip">请输入6-16位密码，字母区分大小写</span>
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>HR姓名：</dt>
					<dd>
						<input v-model="hrName" class="form-control" type="text" name="" value="" />
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>HR电话：</dt>
					<dd>
						<input @blur="isTelRight" v-model="hrTel" class="form-control" type="text" name="" value="" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" />
					</dd>
				</dl>
				<dl v-if="telTip" class="clearfix tips">
					<dt>&nbsp;</dt>
					<dd>
						<span class="error-tip">请输入正确电话</span>
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>HR邮箱：</dt>
					<dd>
						<input @blur="isEmailRight" v-model="hrEmail" class="form-control" type="text" name="" value="" />
					</dd>
				</dl>
				<dl v-if="emailTip" class="clearfix tips">
					<dt>&nbsp;</dt>
					<dd>
						<span class="error-tip">请输入正确的邮箱</span>
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>公司名称：</dt>
					<dd>
						<input v-model="companyName" class="form-control" type="text" name="" value="" />
					</dd>
				</dl>
				<dl class="clearfix">
					<dt>公司执照：</dt>
					<dd>
						<div class="upload-company-license" id="place-company-license">
							<vue-core-image-upload class="" inputOfFile="companyLicense" cropRatio="16:9" crop="local" resize="local" :data="data" @imageuploaded="changeProductionImg" :max-file-size="5242880" url="upload/addCompanyLicense">
								<img style="width: 300px; height: 127px;" :src="'../../static/companyLicense/'+data.license" />
							</vue-core-image-upload>
						</div>
					</dd>
				</dl>
				<div class="btn-line">
					<a @click="submitInfo" class="btn btn-info" href="javacript:;">确定</a>
					<a @click="delImg" class="btn btn-default" href="javacript:;">取消</a>
				</div>
			</div>
		</div>
		<common-footer></common-footer>

	</div>
</template>

<script>
	import CommonHeader from './../components/CommonHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	import VueCoreImageUpload from 'vue-core-image-upload'

	export default {
		data() {
			return {
				userName: '',
				userPwd: '',
				hrName: '',
				hrTel: '', //这里的格式有问题，应该是num
				hrEmail: '',
				companyName: '',
				data: {
					license: 'default.jpg'
				},
				telTip:false,
				pwdTip:false,
				emailTip:false,
			}
		},
		computed:{
		},
		components: {
			CommonHeader,
			CommonFooter,
			'vue-core-image-upload': VueCoreImageUpload
		},
		methods: {
			submitInfo() {
				if(this.userName != '' && this.userPwd != '' && this.hrName != '' && this.hrTel != '' && this.hrEmail != '' && this.companyName != '' && this.data.license != 'default.jpg' && !this.telTip && !this.emailTip && !this.pwdTip) {
					axios.post('/apply/regedit', {
						userName: this.userName,
						userPwd: this.userPwd,
						hrName: this.hrName,
						hrTel: this.hrTel,
						hrEmail: this.hrEmail,
						companyName: this.companyName,
						license: this.data.license,
						userType: 3,
						isChecked: false
					}).then((response) => {
						let res = response.data;
						if(res.status == 1) {
							confirm('系统错误，请重新注册');
							this.$router.push({
								path:'/'
							})
						} else if(res.status == 2) {
							confirm(res.msg);
						} else {
							confirm(res.msg);
							this.$router.push({
								path:'/'
							})
						}
					})
				} else {
					alert('请完善数据，所有项都为必填项');
				}

			},
			changeProductionImg(res) {
				let result = res.result;
				console.log(res);
				if(res.status == 0) {
					this.data.license = result.filename;
					console.log(this.data.license);
				}
			},
			delImg() {
				if(this.data.license != 'default.jpg') {
					axios.post('/upload/cancelCompanyLicense', {
						imgName: this.data.license
					})
				}
				this.$router.push({
					path: '/'
				})
			},
			isTelRight(){
				if (this.hrTel.split('').length != 11) {
					this.telTip = true;
				}else{
					this.telTip = false;
				}
				
			},
			isPwdRight(){
				if (this.userPwd.split('').length < 6 || this.userPwd.split('').length > 16) {
					this.pwdTip = true;
				}else{
					this.pwdTip = false;
				}
			},
			isEmailRight(){
				//正则验证邮箱
				let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
				if (reg.test(this.hrEmail)) {
					this.emailTip = false;
				}else{
					this.emailTip = true;
				}
			},
		}
	}
</script>