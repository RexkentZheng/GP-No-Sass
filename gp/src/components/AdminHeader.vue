<template>
	<div class="header">
		<div class="bar-wraper">
			<div class="bar">
				<a class="enterpriseVison kill-decoration header-a" href="javascript:;">进入企业版</a>
				<ul class="login">
					<li v-if="nickName">
						<router-link class="kill-decoration header-a" to='/admin'>{{nickName}}</router-link>
					</li>
					<li v-if="!nickName">
						<a class="kill-decoration header-a" href="javascript:;" @click="loginWrapFlag=true" >登录</a>
					</li>
					<li v-if="!nickName">
						<a class="kill-decoration header-a" href="javascript:;" >注册</a>
					</li>
					<li v-if="nickName">
						<a id="logOut" class="kill-decoration header-a" href="javascript:;" @click="logout()" >登出</a>						
					</li>
				</ul>
			</div>
		</div>
		<div class="person-nav-wraper">
			<div class="person-nav admin-nav clearfix">
				<div class="logo-part">
					<router-link to='/'>
						<img  src="./../../static/img/header-logo.png" />
					</router-link>
				</div>
				<ul class="clearfix kill-type">
					<li>
						<router-link to='/admin/studentInfo/'>学生信息</router-link>
					</li>
					<li>
						<router-link to='/admin/companyInfo/'>企业信息</router-link>
					</li>
					<li>
						<router-link to='/admin/setting'>设置</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	
	export default{
		data(){
			return{
				nickName:'',
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
						if (res.result.userType != 1) {
							this.$router.push({
								path:'/'
							});
						}
					}else{
						this.$router.push({
							path:'/'
						})
					}
				})
			},
			logout(){
				axios.post('/user/logout').then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.nickName = '';
						this.$router.push({
							path:'/'
						})
					}
				})
			}
		}
	}
</script>