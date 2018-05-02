<template>
	<div>
		<common-header></common-header>
		<div class="container company-waiting">
			<div class="contain-body">
				<div class="blue-bg">
					
				</div>
				<div class="main-info">
					<h3>未通过</h3>
					<p>当前用户的审核未通过，点击删除申请记录</p>
					<a @click="clearUserInfo" class="btn btn-info">确定</a>
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
	
	export default{
		data(){
			return{
				
			}
		},
		components:{
			CommonHeader,
			CommonFooter
		},
		methods:{
			clearUserInfo(){
				axios.post('/user/clearUserInfo',{
					userName:this.$route.query.userName
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						});
						this.$router.push({
							path:'/'
						})
					}else{
						this.$message({
							showClose: true,
							message: '删除失败',
							type: 'warning'
						});
					}
				})
			}
		}
	}
</script>

<style>
</style>