<template>
	<div>
		<student-header></student-header>
		<div class="container student-send">
			<div class="contain-body">
				<div class="send-title">
					<ul class="kill-type clearfix">
						<li v-bind:class="{'active':activeName=='全部'}" ref="all" @click="getAllList">
							全部
						</li>
						<li v-bind:class="{'active':activeName=='待沟通'}" ref="waitting" @click="getWaittingList">
							待沟通
						</li>
						<li v-bind:class="{'active':activeName=='不合适'}" ref="refuse" @click="getRefuseList">
							不合适
						</li>
						<li v-bind:class="{'active':activeName=='面试安排'}" ref="interview" @click="getInterviewList">
							面试安排
						</li>
					</ul>
				</div>
				<div class="send-list" v-if="listFlag">
					<ul class="kill-type">
						<li v-for="item in changedStudentSendList">
							<div class="job-main clearfix">
								<router-link class="jobName" :to="{path:'/common/job/details',query:{jobId: item.jobId,isSend:'true'}}">{{item.jobInfo.jobName}}</router-link>
								<span>{{item.jobInfo.jobSalary}}</span>
							</div>
							<div class="job-company-name">
								<span>{{item.companyName}}</span>
							</div>
							<div class="job-location clearfix">
								<span class="company-loaction">{{item.jobInfo.jobLoaction.jobProvince}}·{{item.jobInfo.jobLoaction.jobCity}}</span>
								<p>
									<span class="lastest-time">{{item.sendDate}}</span>
									<span class="send-status">{{item.sendStatus}}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="interview-list" v-if="interviewFlag">
					<ul  class="kill-type">
						<li v-for="item in changedStudentSendList">
							<div class="job-main clearfix">
								<router-link class="jobName" :to="{path:'/common/job/details',query:{jobId: item.jobId,isSend:'true'}}">{{item.jobInfo.jobName}}</router-link>
								<span>{{item.jobInfo.jobSalary}}</span>
								<p><span>面试日期：</span><span>{{item.interviewDate}}</span></p>
							</div>
							<div class="job-company-name clearfix">
								<span>{{item.companyName}}</span>
								<p>
									<span class="lastest-time">面试时间：</span>
									<span class="send-status">{{item.interviewHalfday}} {{item.interviewTime}}</span>
								</p>
							</div>
							<div class="job-location clearfix">
								<span class="company-loaction">{{item.jobInfo.jobLoaction.jobProvince}}·{{item.jobInfo.jobLoaction.jobCity}}</span>
								<p>
									<span>面试地点：</span>
									<span>{{item.interviewDist}}</span>
								</p>
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
	import StudentHeader from './../components/StudentHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'

	export default {
		data() {
			return {
				studentSendList: [],
				changedStudentSendList: [],
				listFlag: false,
				interviewFlag: false,
				activeName:'全部'
			}
		},
		components: {
			StudentHeader,
			CommonFooter
		},
		mounted() {
			this.getSendList();
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
			start() {
				setTimeout(() => {
					this.getSendList();
				}, 1000);
			},
			getSendList() {
				axios.post('/student/studentDetails', {
					userId: this.getCookies('userId')
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						let replace = res.result.sendInfo;
						replace.forEach((item) => {
							//获取公司名称和公司地址
							axios.post('/company/companyDetails', {
								userId: item.companyId
							}).then((response) => {
								let res = response.data;
								if(res.status == 0) {
									item.companyName = res.result.regeditInfo.companyName;
									item.companyLocation = res.result.companyInfo.companyBaseInfo.companyLocation;
								}
							});
							//获取工作名称和薪资情况
							axios.post('/job/jobDetails', {
								jobId: item.jobId
							}).then((response) => {
								let res1 = response.data;
								if(res1.status == 0) {
									item.jobInfo = res1.result;

								}
							});
							this.studentSendList.push(item);
						});
					}
				});
				this.changedStudentSendList = this.studentSendList;
				//给一个trigger,否则后面添加的数据不显示
				this.trigger();
			},
			trigger() {
				setTimeout(() => {
					this.listFlag = true;
				}, 200);
			},
			//获取不同状态的List
			getAllList() {
				this.listFlag = true;
				this.interviewFlag = false;
				this.changedStudentSendList = [];
				this.changedStudentSendList = this.studentSendList;
				this.activeName = this.$refs.all.innerText; 
			},
			getWaittingList() {
				this.listFlag = true;
				this.interviewFlag = false;
				this.changedStudentSendList = [];
				this.studentSendList.forEach((item) => {
					if(item.sendStatus == "待沟通") {
						this.changedStudentSendList.push(item);
					}
				})
				this.activeName = this.$refs.waitting.innerText; 
			},
			getInterviewList() {
				this.listFlag = false;
				this.interviewFlag = true;
				this.changedStudentSendList = [];
				this.studentSendList.forEach((item) => {
					if(item.sendStatus == "邀请面试") {
						this.changedStudentSendList.push(item);
					}
				})
				this.activeName = this.$refs.interview.innerText; 
			},
			getRefuseList() {
				this.listFlag = true;
				this.interviewFlag = false;
				this.changedStudentSendList = [];
				this.studentSendList.forEach((item) => {
					if(item.sendStatus == "不合适") {
						this.changedStudentSendList.push(item);
					}
				})
				this.activeName = this.$refs.refuse.innerText; 
			}
		}
	}
</script>