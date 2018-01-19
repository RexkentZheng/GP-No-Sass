<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-companyInfo-audit">
			<div class="contain-body">
				<div class="company-info-title clearfix">
					<ul class="clearfix">
						<li>
							<router-link to='/admin/companyInfo'>审核列表</router-link>
						</li>
						<li>
							<router-link class="active" to='/admin/companyInfo/search'>企业查找</router-link>
						</li>
					</ul>
				</div>
				<div class="audit-list">
					
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
		mounted(){
		},
		components:{
			AdminHeader,
			CommonFooter
		},
		methods:{
    }
	}
</script>
