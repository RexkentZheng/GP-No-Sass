<template>
	<div class="header">
		<div class="bar-wraper">
			<div class="bar">
				<ul class="login">
					<li v-if="nickName">
						<a class="kill-decoration header-a" href="javascript:;" @click="userLink()" >{{nickName}}</a>
					</li>
					<li v-if="!nickName">
						<a class="kill-decoration header-a" href="javascript:;" @click="loginWrapFlag=true" >登录</a>
					</li>
					<li v-if="!nickName">
						<router-link class="kill-decoration header-a" to='/regedit'>注册</router-link>
					</li>
					<li v-if="nickName">
						<a class="kill-decoration header-a" href="javascript:;" @click="logout()" >登出</a>						
					</li>
				</ul>
			</div>
		</div>
		<div class="nav-wraper">
			<div class="nav ">
				<div class="logo-part">
					<router-link to='/'>
						<img  src="./../../static/img/header-logo.png" />
					</router-link>
				</div>
				
			</div>
		</div>
		<div class="login-wraper" v-if="loginWrapFlag">
			<div class="login-part">
				<div class="login-main">
					<dl class="clearfix userName">
						<dt>用户名：</dt>
						<dd>
							<input class="form-control" v-model="userName" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<span class="errorTip" v-if="errorTipFlag">{{errorTipContent}}</span>
					<dl class="clearfix userPwd">
						<dt>密&nbsp;&nbsp;&nbsp;码：</dt>
						<dd>
							<input class="form-control" v-model="userPwd" type="password" name="" id="" value="" />
						</dd>
					</dl>
					<div class="btn-line">
						<a class="btn btn-info" href="javascript:;" @click="login()">登录</a>
						<a class="btn btn-default" href="javascript:;" @click="loginWrapFlag=false">取消</a>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	
	export default{
		data(){
			return{
				userName:'',
				userPwd:'',
				userType:'',
				errorTipFlag:false,
				errorTipContent:"",
				loginWrapFlag:false,
				nickName:''
			}
		},
		mounted(){
			this.checkLogin();
		},
		methods:{
			checkLogin(){
				axios.get('/user/checkLogin').then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.nickName = res.result.userName;
						this.userType = res.result.userType;
					}else{
						
					}
				})
			},
			userLink(){
				if (this.userType == 1) {
					this.$router.push({
						path:'/admin'
					});
				}else if (this.userType == 2) {
					this.$router.push({
						path:'/student'
					});
				}else{
					this.$router.push({
						path:'/company'
					});
				}
			},
			login(){
				if (!this.userName || !this.userPwd) {
					this.errorTipFlag = true;
					this.errorTipContent = "用户名或密码不能为空";
				}
				axios.post('/user/login',{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.loginWrapFlag = false;
						this.nickName = res.result.userName;
						this.userType = res.result.userType;
						this.$router.go(0);
						this.$router.push({
							path:'/'
						})
					}else if (res.status == 2) {
						this.$router.push({
							path:'/company/waitting'
						});
					}else if (res.status == 3) {
						this.$router.push({
							path:'/company/refused',
							query:{
								'userName' : res.result
							}
						});
					}else{
						this.errorTipFlag = true;
						this.errorTipContent = "用户名或密码错误";
					}
				})
			},
			logout(){
				axios.post('/user/logout').then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.nickName = '';
					}
				})
			},
			toIndex(){
				this.$router.push({
					path:'/'
				})
			}
		}
	}
</script>

<style>

</style>