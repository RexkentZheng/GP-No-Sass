<template>
	<div>
		<company-header></company-header>
		<div class="container company-jobs-list">
			<div class="contain-body">
				<div class="recruit-title clearfix">
					<ul class="clearfix">
						<li v-bind:class="{'active':activeName=='在线'}" ref='online' @click="getOnlineJobList">
							在线
						</li>
						<li v-bind:class="{'active':activeName=='已下线'}" ref='offline' @click="getOfflineJobList">
							已下线
						</li>
						<li v-bind:class="{'active':activeName=='全部'}" ref='all' @click="getJobList">
							全部
						</li>
					</ul>
					<router-link to='/company/job/changeDetails'>
						<span class="add-job"><span class="glyphicon glyphicon-plus icon"></span>发布新职位</span>
					</router-link>
				</div>
				<div class="job-list">
					<ul>
						<li v-for="job in changedJobList">
							<div class="top-part clearfix">
								<div class="job-title clearfix">
									<h3>{{job.jobName}}</h3>
									<div class="job-info">
										<span class="department">{{job.jobTypeFirst}}·{{job.jobTypeSecond}}</span>
										<span class="salary">{{job.jobSalary}}</span>
										<span class="requirement">{{job.jobRequirement}}</span>
										<span class="location">{{job.jobLoaction.jobProvince}}·{{job.jobLoaction.jobCity}}</span>
									</div>
								</div>
								<div class="num-box clearfix">
									<a @click="setJobOnlineStatus(job)" v-if="!job.isOnline" class="btn btn-default btn-lg" href="javascript:;">点击上线</a>
									<a @click="setJobOnlineStatus(job)" v-if="job.isOnline" class="btn btn-default btn-lg" href="javascript:;">点击下线</a>
								</div>
							</div>
							<div class="bottom-part clearfix">
								<div class="job-status">
									<p>
										<span class="update-title">发布时间：</span>
										<span class="update-time">{{new Date(job.createdTime).toLocaleString()}}</span>
									</p>
								</div>
								<div class="options">
									<p>
										<span @click="jobDetails(job)" class="change-info">编辑职位</span>
									</p>
								</div>
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
	import CompanyHeader from './../components/CompanyHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'

	export default {
		data() {
			return {
				jobList: [],
				changedJobList: [],
				activeName:'在线'
			}
		},
		components: {
			CompanyHeader,
			CommonFooter
		},
		mounted() {
			this.getJobList();
			this.trigger();
		},
		methods: {
			//查找cookie的方法
			getCookies(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while(c.charAt(0) == ' ') c = c.substring(1);
					if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
				}
				return "";
			},
			trigger() {
				setTimeout(() => {
					this.getOnlineJobList();
				}, 50);
			},
			getJobList() {
				this.activeName = this.$refs.all.innerText; 
				let userId = this.getCookies('userId');
				axios.post('/job/getCompanyJobList', {
					userId: userId
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobList = res.result;
						this.changedJobList = this.jobList;
					}
				});
			},
			getOnlineJobList() {
				this.activeName = this.$refs.online.innerText; 
				this.changedJobList = [];
				let changedOnes = [];
				this.jobList.forEach(function(item) {
					if(item.isOnline) {
						changedOnes.push(item);
					}
				});
				this.changedJobList = changedOnes;
				console.log(this.changedJobList);
			},
			getOfflineJobList() {
				this.activeName = this.$refs.offline.innerText; 
				this.changedJobList = [];
				let changedOnes = [];
				this.jobList.forEach(function(item) {
					if(!item.isOnline) {
						changedOnes.push(item);
					}
				});
				this.changedJobList = changedOnes;
			},
			setJobOnlineStatus(job) {
				let jobId = job.jobId;
				let onlineStatus = !job.isOnline;
				axios.post('/job/changeOnlineStatus', {
					jobId: jobId,
					isOnline: onlineStatus
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						if(onlineStatus) {
							alert('上线成功');
						} else {
							alert('下线成功');
						}
					} else {
						alert('修改失败');
					}
					this.getJobList();
				})
			},
			jobDetails(job) {
				this.$router.push({
					path: '/common/job/details',
					query: ({
						'jobId': job.jobId
					})
				})
			}
		}
	}
</script>