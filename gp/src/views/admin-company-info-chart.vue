<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-companyInfo-chart">
			<div class="contain-body">
				<div class="company-info-title clearfix">
					<ul class="clearfix">
						<li>
							<router-link  to='/admin/companyInfo'>审核列表</router-link>
						</li>
						<li>
							<router-link to='/admin/companyInfo/search'>企业查找</router-link>
						</li>
						<li>
							<router-link class="active" to='/admin/companyInfo/chart'>信息概况</router-link>
						</li>
					</ul>
				</div>
        <div class="chart-title clearfix">
					<ul>
						<li v-bind:class="{'active':activeName=='职位地域'}" ref="location"  @click="getJobLocation">
							职位地域
						</li>
						<li v-bind:class="{'active':activeName=='职位类别'}" ref="type"  @click="getJobType">
							职位类别
						</li>
					</ul>
				</div>
				<div v-if='jobTypeFlag' class='chart-list'>
					<admin-job-type-chart :jobTypeInfo = 'jobTypeInfo'></admin-job-type-chart>
				</div>
				<div v-if='jobLocationFlag' class="chart-list">
					<admin-job-location-chart :jobLocationInfo = 'jobLocationInfo'></admin-job-location-chart>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from './../components/AdminHeader'
	import CommonFooter from './../components/CommonFooter'
	import AdminJobTypeChart from './../components/AdminJobTypeChart'
	import AdminJobLocationChart from './../components/AdminJobLocationChart'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	import _ from 'lodash'
	
	export default{
		data(){
			return{
        activeName:'职位地域',
        jobList:[],
				jobTypeInfo:[],
				jobLocationInfo:[],
				jobTypeFlag:false,
				jobLocationFlag:false
			}
		},
		mounted(){
      this.getAlljobs();
		},
		components:{
			AdminHeader,
			CommonFooter,
			AdminJobTypeChart,
			AdminJobLocationChart
		},
		methods:{
      getAlljobs() {
				this.jobTypeInfo = [];
				axios.get('/job/list').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobList = res.result;
						this.getJobLocation();
					} else {
						this.jobList = [];
					}
				})
			},
      getJobType(){
				let jobTypeInfo = [];
				_.forEach(this.jobList, (firstLoop) => {
					if (_.findIndex(jobTypeInfo, {name:firstLoop.jobTypeFirst}) < 0) {
						jobTypeInfo.push({name:firstLoop.jobTypeFirst,children:[]})
					}
				})
				_.forEach(jobTypeInfo, (firstLoop) => {
					_.forEach(this.jobList, (secondLoop) => {
						if (firstLoop.name === secondLoop.jobTypeFirst) {
							firstLoop.children.push({name:secondLoop.jobTypeSecond, children:[]})
						}
					})
					firstLoop.children = _.uniqBy(firstLoop.children, 'name');
				})
				_.forEach(jobTypeInfo, (firstLoop) => {
					_.forEach(firstLoop.children, (secondLoop) => {
						_.forEach(this.jobList, (thirdLoop) => {
							if (secondLoop.name === thirdLoop.jobTypeSecond) {
								secondLoop.children.push({name:thirdLoop.jobTypeThird, children:[]})
							}
						})
						secondLoop.children = _.uniqBy(secondLoop.children, 'name');
					})
				})
				_.forEach(jobTypeInfo, (firstLoop) => {
					_.forEach(firstLoop.children, (secondLoop) => {
						_.forEach(secondLoop.children, (thirdLoop) => {
							_.forEach(this.jobList, (forthLoop) => {
								if (thirdLoop.name === forthLoop.jobTypeThird) {
									thirdLoop.children.push({name:forthLoop.jobName})
								}
							})
						})
					})
				})
				this.jobTypeInfo = jobTypeInfo;
				this.jobLocationFlag = false;
				this.jobTypeFlag = true;
        this.activeName = this.$refs.type.innerText; 
      },
			getJobLocation(){
				this.jobLocationInfo = [];
				let jobLocationInfo = [];
				this.jobList.forEach((op)=>{
					if(jobLocationInfo.length > 0){
						let isInside = false;
						for(var og of jobLocationInfo){
							if(op.jobLoaction.jobProvince === og.name){
								og.value++;
								isInside = true;
							}
						};
						if(!isInside){
							jobLocationInfo.push({name:op.jobLoaction.jobProvince,value:1})
						}
					}else{
						jobLocationInfo.push({name:op.jobLoaction.jobProvince,value:1})
					}
				})
				this.jobLocationInfo = jobLocationInfo;
				this.jobLocationFlag = true;
				this.jobTypeFlag = false;
        this.activeName = this.$refs.location.innerText; 
			}
		}
	}
</script>
