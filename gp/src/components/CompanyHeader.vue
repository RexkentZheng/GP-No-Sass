<template>
	<div class="header">
		<div class="bar-wraper">
			<div class="bar">
				<ul class="login">
					<li v-if="nickName">
						<router-link class="kill-decoration header-a" to='/company'>{{nickName}}</router-link>
					</li>
					<li v-if="!nickName">
						<a class="kill-decoration header-a" href="javascript:;" @click="loginWrapFlag=true">登录</a>
					</li>
					<li v-if="!nickName">
						<a class="kill-decoration header-a" href="javascript:;">注册</a>
					</li>
					<li v-if="nickName">
						<a id="logOut" class="kill-decoration header-a" href="javascript:;" @click="logout()">登出</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="person-nav-wraper">
			<div class="person-nav clearfix">
				<div class="logo-part">
					<router-link to='/'>
						<img src="./../../static/img/header-logo.png" />
					</router-link>
				</div>
				<ul class="clearfix kill-type">
					<li>
						<router-link to='/company'>企业简介</router-link>
					</li>
					<li>
						<router-link to='/company/job/list'>职位列表</router-link>
					</li>
					<li>
						<router-link to='/company/receive'>投递箱</router-link>
					</li>
					<li>
						<router-link to='/company/setting'>设置</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				nickName: '',
			}
		},
		mounted() {
			this.checkLogin();
		},
		methods: {
			checkLogin() {
				axios.get('/user/checkLogin').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.nickName = res.result.userName;
						if(res.result.userType != 3) {
							this.$router.push({
								path: '/'
							});
						}
					} else {
						this.$router.push({
							path: '/'
						})
					}
				})
			},
			logout() {
				axios.post('/user/logout').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.nickName = '';
						this.$router.push({
							path: '/'
						})
					}
				})
			}
		}
	}
</script>