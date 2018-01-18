<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-index">
			<div class="contain-body">
				<div class="creat-student-count">
					<router-link to='/admin/creat/student'>创建学生账号</router-link>						
				</div>
				<div class="creat-admin-count">
					<router-link to='/admin/creat/admin'>创建管理员账号</router-link>						
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from './../components/AdminHeader'
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
			AdminHeader,
			CommonFooter
		}
	}
</script>