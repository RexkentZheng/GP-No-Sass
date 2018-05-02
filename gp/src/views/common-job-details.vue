<template>
	<div>
		<common-header v-if="this.getCookies('userType') !== '2'"></common-header>
		<student-header v-if="this.getCookies('userType') == '2'"></student-header>
		<div class="container common-job-details">
			<div class="contain-body">
				<div class="job-main-wraper">
					<div class="job-main clearfix">
						<div class="left-part clearfix">
							<span class="company-position">{{allInfo.jobInfo.jobName}}</span>
							<div class="position-title clearfix">
								<h3>{{allInfo.jobInfo.jobTypeFirst}} </h3>
							</div>
							<p class="position-info">
								<span class="salary">{{allInfo.jobInfo.jobSalary}}</span>
								<span class="requirement">{{allInfo.jobInfo.jobRequirement}} /</span>
								<span class="job-type">{{allInfo.jobInfo.jobType}}</span>
							</p>
							<p class="position-update-time"><span class="release-time">1</span>天前</p>
						</div>
						<div v-if="allInfo.jobInfo.companyId == userId" class="right-part clearfix">
							<div>
								<router-link class="btn btn-info btn-lg" :to="{path:'/company/job/changeDetails',query:{jobId:allInfo.jobInfo.jobId}}">修改职位</router-link>
								<a @click="delJob" class="btn btn-danger btn-lg" href="javascript:;">删除职位</a>
								<router-link class="btn btn-default btn-lg" :to="{path:'/company/job/list'}">返回上级</router-link>
							</div>
						</div>
						<div v-if="userType == 2 " class="right-part clearfix">
							<a v-if="this.$route.query.isSend == 'false'" @click="sendResume" class="btn btn-info" href="javascript:;">投个简历</a>
						</div>
					</div>
				</div>
				<div v-if="allInfo != ''" class="job-content clearfix">
					<div class="left-part clearfix">
						<dl>
							<dt>职位类别</dt>
							<dd class="clearfix">
								<p>{{allInfo.jobInfo.jobTypeFirst}}-{{allInfo.jobInfo.jobTypeSecond}}-{{allInfo.jobInfo.jobTypeThird}}</p>
							</dd>
						</dl>
						<dl>
							<dt>职位诱惑</dt>
							<dd class="clearfix">
								<p class="attempt-label" v-for="label in jobAttemptLabel" :key="label">{{label}}</p>
							</dd>
						</dl>
						<dl>
							<dt>职位描述</dt>
							<dd>
								<dl>
									<dt>岗位职责：</dt>
									<dd v-if="allInfo.jobInfo.jobDiscription.jobDuty != ''">
										<pre>{{allInfo.jobInfo.jobDiscription.jobDuty}}</pre>
									</dd>
								</dl>
								<dl>
									<dt>任职要求：</dt>
									<dd>
										<pre>{{allInfo.jobInfo.jobDiscription.jobrequirement}}</pre>
									</dd>
								</dl>
							</dd>
						</dl>
						<dl>
							<dt>工作地址</dt>
							<dd>{{allInfo.jobInfo.jobLoaction.jobProvince}}·{{allInfo.jobInfo.jobLoaction.jobCity}}·{{allInfo.jobInfo.jobLoaction.jobArea}}</dd>
						</dl>
					</div>
					<div class="right-part clearfix">
						<dl>
							<dt>
								<router-link :to="{path:'/common/company/details',query:{userId:allInfo.companyInfo.userId}}" class="clearfix">
									<img v-bind:src="allInfo.companyInfo.companyInfo.companyLogo " />
									<div class="company-name">
										{{allInfo.companyInfo.regeditInfo.companyName}} 
									</div>
								</router-link>
							</dt>
							<dd>
								<ul>
									<li>
										<span><span class="glyphicon glyphicon-th-large icon"></span>{{allInfo.companyInfo.companyInfo.companyBaseInfo.companyType}} </span>
									</li>
									<li>
										<span><span class="glyphicon glyphicon-user icon"></span>{{allInfo.companyInfo.companyInfo.companyBaseInfo.companyCount}} </span>
									</li>
									<li>
										<span><span class="glyphicon glyphicon-home icon"></span>{{allInfo.companyInfo.companyInfo.companyBaseInfo.companyHref}} </span>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
				</div>
				<div class="student-info">
					<a class="btn btn-default"  v-if="allInfo.jobInfo.companyId != userId " @click="getBackPage">返回</a>
				</div>
				<div v-if="this.getCookies('userType') == '3'" class="company-info">
					<a class="btn btn-default"  v-if="allInfo.jobInfo.companyId != userId " @click="getBackPage">返回</a>
				</div>
				<div v-if="userType == 1" class="admin-info">
					<dl class="company-id clearfix">
						<dt>发布人ID：</dt>
						<dd>{{allInfo.companyInfo.userId}} </dd>
					</dl>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import CommonHeader from './../components/CommonHeader'
	import CommonFooter from './../components/CommonFooter'
	import StudentHeader from './../components/StudentHeader'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'

	export default {
		data() {
			return {
				allInfo: {
					jobInfo: {},
					companyInfo: {}
				},
				userType: 1,
			}
		},
		created:function () {
			this.jobDetails();
		},
		components: {
			CommonHeader,
			CommonFooter,
			StudentHeader,
		},
		computed:{
			jobAttemptLabel(){
				return (this.allInfo.jobInfo.jobAtempt || "").split('+',6);
			},
			userId(){
				return this.getCookies('userId');
			}
		},
		mounted() {
			this.getUserType();
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
			jobDetails() {
				let jobId = this.$route.query.jobId;
				axios.post('/job/allInfo', {
					jobId: jobId
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.allInfo = res.result;
					}
				})
			},
			getUserType() {
				let userType = this.getCookies('userType');
				this.userType = userType;
			},
			delJob() {
				axios.post('/job/delJob', {
					jobId: this.$route.query.jobId
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
						this.$router.push({
							path: '/company/job/list'
						})
					} else {
						this.$message({
              showClose: true,
              message: '删除失败',
              type: 'warning'
            });
					}
				})
			},
			sendResume() {
				axios.post('/company/addReceive', {
					companyId: this.allInfo.companyInfo.userId,
					studentId: parseInt(this.getCookies('userId')),
					jobId: this.$route.query.jobId,
					sendStatus: '待沟通'
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.$message({
              showClose: true,
              message: '投递成功',
              type: 'success'
            });
						this.$router.push({
							path: '/'
						})
					} else if(res.status == 2) {
						this.$message({
              showClose: true,
              message: '您已投过这份简历，请勿重复投递',
              type: 'warning'
            });
					} else if(res.status ==1001) {
						this.$message({
              showClose: true,
              message: '当前用户简历信息未完善，请完善简历信息后再投递简历',
              type: 'warning'
            });
					}else{
						this.$message({
              showClose: true,
              message: '投递失败，请稍后再试',
              type: 'warning'
            });
					}
				})
			},
			getBackPage(){
				this.$router.go(-1);
			}
		}
	}
</script>