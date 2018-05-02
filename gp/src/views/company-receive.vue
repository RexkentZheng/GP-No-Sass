<template>
	<div>
		<company-header></company-header>
		<div class="container company-receive">
			<div class="contain-body">
				<div class="receive-title">
					<ul class="clearfix">
						<li v-bind:class="{'active':activeName=='投递信息'}" ref='sendInfo' @click="changeLabelReceive" id="trigger">
							投递信息
						</li>
						<li v-bind:class="{'active':activeName=='面试日程'}" ref='interview' @click="changeLabelInterview" >
							面试日程
						</li>
					</ul>
				</div>
				<div class="receive-list" v-if="receiveListFlag && receiveList.length == 0">
					<p>暂无信息</p>
				</div>
				<div class="receive-list" v-if="receiveListFlag && receiveList.length>0">
					<table>
						<tr>
							<th>姓名</th>
							<th>应聘职位</th>
							<th>学历</th>
							<th>应聘时间</th>
							<th>手机号码</th>
							<th>状态</th>
						</tr>
						<tr v-for="item in receiveList" :key="item.jobName">
							<td>
								<router-link :to="{path:'/common/student/resume',query:{studentId:item.studentId,jobId:item.jobId,test:item.test}}">{{item.studentName}}</router-link>
							</td>
							<td>{{item.jobName}}</td>
							<td>{{item.studentUniversity}}</td>
							<td>{{item.receivedTime}}</td>
							<td>{{item.studentTel}}</td>
							<td>{{item.sendStatus}}</td>
						</tr>
					</table>
				</div>
				<div class="interview-list" v-if="interViewListFlag && interViewList.length == 0">
					<p>暂无信息</p>
				</div>
				<div class="interview-list" v-if="interViewListFlag && interViewList.length>0">
					<table>
						<tr>
							<th>姓名</th>
							<th>应聘职位</th>
							<th>面试日期</th>
							<th>面试时间</th>
						</tr>
						<tr v-for="item in interViewList" :key="item.jobName">
							<td>
								<a>{{item.studentName}}</a>
							</td>
							<td>{{item.jobName}}</td>
							<td>{{item.interviewDate}}</td>
							<td>
								<span class="half-day">{{item.interviewHalfday}}</span>
								<span class="clock">{{item.interviewTime}}</span>
							</td>
						</tr>
					</table>
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
				receiveList: [],
				receiveListFlag: false,
				interViewList: [],
				interViewListFlag: false,
				activeName:'投递信息'
			}
		},
		components: {
			CompanyHeader,
			CommonFooter
		},
		mounted() {
			this.getReceiveList();
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
			//获取投递信息列表和面试列表
			getReceiveList() {
				axios.post('/company/received', {
					userId: this.getCookies('userId')
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						//获取投递信息列表
						this.receiveList = res.result.received;
						this.interviewList = res.result.interview;
						this.receiveList.forEach(function(item) {
							//加入学生信息
							axios.post('/student/studentDetails', {
								userId: item.studentId
							}).then((response) => {
								if(res.status == 0) {
									let res1 = response.data;
									item.studentName = res1.result.personalInfo.studentName;
									item.studentUniversity = res1.result.personalInfo.studentUniversity;
									item.studentTel = res1.result.resumetInfo.tel;
								} else {

								}
							});
							//加入职位信息
							axios.post('/job/jobDetails', {
								jobId: item.jobId
							}).then((response) => {
								if(res.status == 0) {
									let res2 = response.data;
									item.jobName = res2.result.jobName;
								} else {

								}
							});
						})

						//获取面试日程列表
						this.interViewList = res.result.interview;
						this.interViewList.forEach(function(item) {
							//加入学生信息
							axios.post('/student/studentDetails', {
								userId: item.studentId
							}).then((response) => {
								if(res.status == 0) {
									let res1 = response.data;
									item.studentName = res1.result.personalInfo.studentName;
								} else {

								}
							});
							//加入职位信息
							axios.post('/job/jobDetails', {
								jobId: item.jobId
							}).then((response) => {
								if(res.status == 0) {
									let res2 = response.data;
									item.jobName = res2.result.jobName;
								} else {

								}
							});
						})
					} else {

					}
				});
				//给一个trigger，要不然后续添加的数据不显示
				this.trigger();
			},
			trigger() {
				setTimeout(function() {
					document.getElementById('trigger').click();
				}, 200);
			},
			changeLabelReceive() {
				this.receiveListFlag = true;
				this.interViewListFlag = false;
				this.activeName = this.$refs.sendInfo.innerText; 
			},
			changeLabelInterview() {
				this.receiveListFlag = false;
				this.interViewListFlag = true;
				this.activeName = this.$refs.interview.innerText; 
			}
		}
	}
</script>

<style>

</style>