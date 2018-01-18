<template>
	<div>
		<student-header></student-header>
		<div class="container student-index">
			<div class="contain-body student-setting">
				<ul>
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
	import StudentHeader from './../components/StudentHeader'
	import CommonFooter from './../components/CommonFooter'
	import ChangePwd from './../components/ChangePwd'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'

	export default {
		data() {
			return {
				isPasswordShow: false,
			}
		},
		mounted() {
		},
		components: {
			StudentHeader,
			CommonFooter,
			ChangePwd,
		},
		methods: {
			cancelSubmitPwd(){
				this.isPasswordShow = !this.isPasswordShow;
			}
		}
	}
</script>