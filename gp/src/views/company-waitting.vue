<template>
	<div>
		<common-header></common-header>
		<div class="container company-waiting">
			<div class="contain-body">
				<div class="blue-bg">
					
				</div>
				<div class="main-info">
					<h3>审核中</h3>
					<p>当前用户正在审核中，请稍后</p>
					<div class="spinner loading">
					  <div class="dot1"></div>
					  <div class="dot2"></div>
					</div>
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
		}
	}
</script>

<style>
</style>