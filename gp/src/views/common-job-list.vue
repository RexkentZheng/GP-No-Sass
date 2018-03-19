<template>
	<div>
		<common-header></common-header>
		<div class="container job-list">
			<div class="contain-header">
				<div class="search-wraper clearfix">
					<div class="input-group">
						<input v-model="keyWords" class="form-control" type="text" name="" id="" placeholder="请输入小屎球子" />
						<span @click="search()" class="input-group-addon">搜索</span>
					</div>
					<div class="popular-search">
						<p><span class="title">热门搜索：</span><span class="details">
							<a @click="searchType('JavaScript')">JavaScript</a>
							<a @click="searchType('JavaScript')">JavaScript</a>
						</span></p>
					</div>
				</div>
			</div>
			<div class="details">
				<div class="multi-chosen clearfix">
					<span>学历要求：</span>
					<a :class="{active: jobRequirementAc == condition}" @click="jobFilter('jobRequirement',condition)" v-for="condition in jobInfo.jobRequirement" href="javascript:;">{{condition}}</a>
				</div>
				<div class="multi-chosen clearfix">
					<span>职位形式：</span>
					<a :class="{active: jobFormAc == condition}" @click="jobFilter('jobType',condition)" v-for="condition in jobInfo.jobType" href="javascript:;">{{condition}}</a>
				</div>
				<!--<div class="multi-chosen clearfix">
					<span>职位类型：</span>
					<a class="active" href="javascript:;">不限</a>
					<a v-for="condition in jobType" href="javascript:;">{{condition.mainName}}</a>
				</div>-->
				<div class="multi-chosen clearfix">
					<span>职位薪资：</span>
					<a :class="{active: jobSalaryAc == condition}" @click="jobFilter('jobSalary',condition)" v-for="condition in jobInfo.jobSalary" href="javascript:;">{{condition}}</a>
				</div>
			</div>
			<div v-if="realJobs.length == 0" class="none-list">
				<span class="empty-tips">没有职位</span>
			</div>
			<div v-if="realJobs.length >= 0" class="main-list">
				<div v-for="job in realJobs" class="job-one clearfix">
					<div class="top">
						<div class="left">
							<div @click="linkDeatils('job',job)" class="jobName clearfix">
								<h3>{{job.jobName}}</h3>
								<span>[{{job.jobType}}]</span>
							</div>
							<div class="salary clearfix">
								<span>{{job.jobSalary}}</span>
								<span>{{job.jobTypeThird}}</span>
								<span>/</span>
								<span>{{job.jobRequirement}}</span>
							</div>
						</div>
						<div class="middle">
							<div @click="linkDeatils('company',job)" class="companyName">
								<span>{{job.companyInfo.companyBaseInfo.companyName}}</span>
							</div>
							<div class="companyInfo">
								<span>{{job.companyInfo.companyBaseInfo.companyType}}</span>
								<span>/</span>
								<span>{{job.jobLoaction.jobProvince}}·{{job.jobLoaction.jobCity}}</span>
							</div>
						</div>
						<div class="right">
							<a href="javascript:;">
								<img :src="job.companyInfo.companyLogo" />
							</a>
						</div>
					</div>
					<div class="bottom">
						<div class="left">
							<div class="labels">
								<span v-for="label in job.jobAtempt.split('+')">{{label}}</span>
							</div>
						</div>
						<div class="right">
							<div class="labels">
								<span>“</span>
								<span v-for="label in job.companyInfo.companyLabel.split('+')">{{label}}</span>
								<span>”</span>
							</div>
						</div>
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

	export default {
		data() {
			return {
				jobInfo: {},
				jobRequirementAc: '不限',
				jobFormAc: '不限',
				jobSalaryAc: '不限',
				jobType: [],
				keyWords: '',
				jobs: [],
				realJobs: []
			}
		},
		components: {
			CommonHeader,
			CommonFooter
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				axios.get('/conf/jobType').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobInfo = res.result.jobInfo;
						this.jobInfo.jobRequirement.unshift('不限');
						this.jobInfo.jobType.unshift('不限');
						this.jobInfo.jobSalary.unshift('不限');
						this.jobType = res.result.jobType.mainClassify;
						this.keyWords = this.$route.query.keyWords;
						if(this.$route.query.searchWay == 'type') {
							this.searchType(this.keyWords);
						} else {
							this.search();

						}
					}
				})
			},
			searchType(keywrods) {
				//这几句话的意思热门搜索之后修改页面信息，这样即使页面刷新数据也会留在URL上
				this.keyWords = keywrods;
				this.$router.push({
					path: '/common/job/list',
					query: {
						'keyWords': keywrods,
						'searchWay': 'type'
					}
				})
				axios.post('/job/jobType', {
					jobType: keywrods
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobs = res.result;
						this.realJobs = this.jobs;
					}
				})
			},
			search() {
				axios.post('/job/filter', {
					keyWords: this.keyWords,
					jobRequirementAc: this.jobRequirementAc,
					jobFormAc: this.jobFormAc,
					jobSalaryAc: this.jobSalaryAc
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.realJobs = res.result;
					}
				})
			},
			jobFilter(conditionName, conditionContent) {
				if(conditionName == 'jobRequirement') {
					this.jobRequirementAc = conditionContent;
				} else if(conditionName == 'jobType') {
					this.jobFormAc = conditionContent;
				} else {
					this.jobSalaryAc = conditionContent;
				}
				axios.post('/job/filter', {
					keyWords: this.keyWords,
					jobRequirementAc: this.jobRequirementAc,
					jobFormAc: this.jobFormAc,
					jobSalaryAc: this.jobSalaryAc
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.realJobs = res.result;
					}
				})
			},
			linkDeatils(type,item){
				if (type === 'job') {
					this.$router.push({
						path: '/common/job/details',
						query: {
							jobId: item.jobId,
						}
					})
				} else {
					this.$router.push({
						path: '/common/company/details',
						query: {
							companyId: item.companyId,
						}
					})
				}
			}
		}
	}
</script>

<style>

</style>