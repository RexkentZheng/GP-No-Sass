<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-companyInfo-audit">
			<div class="contain-body">
				<div class="audit-title clearfix">
					<ul>
						<li v-bind:class="{'active':activeName=='全部'}" ref="all"  @click="getAuditList">
							全部
						</li>
						<li v-bind:class="{'active':activeName=='未审核'}" ref="unChecked"  @click="getUncheckedauditList">
							未审核
						</li>
						<li v-bind:class="{'active':activeName=='已审核'}" ref="checked"  @click="getCheckedAuditList">
							已审核
						</li>
					</ul>
				</div>
				<div class="audit-list">
					<ul class="clearfix">
						<li v-for="audit in changedAuditList">
							<div class="top-part clearfix">
								<div class="left-part">
									<h3>{{audit.companyName}}</h3>
									<div class="company-info">
										<span class="company-type">{{audit.hrName}}</span>
										<span class="company-num">{{audit.hrTel}}</span>
										<span class="company-loaction">{{audit.hrEmail}}</span>
									</div>
								</div>
								<div class="right-part ">
									<a class="btn btn-info" @click="getToDetails(audit)">详情</a>
								</div>
							</div>
							<div class="bottom-part">
								<span class="apply-time">{{audit.applyDate}}</span>
							</div>
						</li>
					</ul>
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
				originalAuditList:[],
				changedAuditList:[],
				currentHrTel:'',
				activeName:'全部'
			}
		},
		mounted(){
			this.getAuditList();
		},
		components:{
			AdminHeader,
			CommonFooter
		},
		methods:{
			getAuditList(){
				axios.get('/apply').then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.originalAuditList = res.result;
						this.changedAuditList = this.originalAuditList;
						this.test = this.changedAuditList;
					}else{
						
					}
				})
				this.activeName = this.$refs.all.innerText; 
			},
			getUncheckedauditList(){
				let changeOne = [];
				this.originalAuditList.forEach(function (item,index) {
					if (!item.isChecked) {
						changeOne.push(item);
					}
				});
				this.changedAuditList = changeOne;
				this.activeName = this.$refs.unChecked.innerText; 
			},
			getCheckedAuditList(){
				let changeOne = [];
				this.originalAuditList.forEach(function (item,index) {
					if (item.isChecked) {
						changeOne.push(item);
					}
				});
				this.changedAuditList = changeOne;
				this.activeName = this.$refs.checked.innerText; 
			},
			getToDetails(item){
				this.$router.push({
					path:'/admin/audit/details',
					query:{'hrTel':item.hrTel}
				})
			}
		}
	}
</script>
