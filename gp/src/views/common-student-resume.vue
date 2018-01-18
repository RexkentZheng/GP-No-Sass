<template>
	<div>
		<company-header v-if='userType == 3 '></company-header>
		<student-header v-if='userType == 2 '></student-header>
		<div class="container common-student-resume">
			<div class="contain-body">
				<div class="student-details">
					<div class="img-part">
						<img src="../../static/img/portrait.png" />
					</div>
					<div class="base-info">
						<p class="line-1">
							<span class="student-name">{{studentInfo.personalInfo.studentName}}</span>
						</p>
						<p class="line-2">
							<span class="student-sex pipe">{{studentInfo.personalInfo.studentSex}}</span>
							<span class="student-education pipe">{{studentInfo.personalInfo.studentEducation}}</span>
							<span class="student-location">{{studentInfo.personalInfo.studentNativePlace}}</span>
						</p>
						<p class="line-3">
							<span class="student-major pipe">{{studentInfo.personalInfo.studentMajor}}</span>
							<span class="student-university">{{studentInfo.personalInfo.studentUniversity}}</span>
						</p>
						<p class="line-4">
							<span class="student-phone pipe">{{studentInfo.resumetInfo.tel}}</span>
							<span class="student-email">{{studentInfo.resumetInfo.email}}</span>
						</p>
					</div>
					<div class="other-info">
						<dl class="student-introduce">
							<dt>个人简介</dt>
							<dd>{{studentInfo.resumetInfo.introduce}}</dd>
						</dl>
						<dl class="student-experience">
							<dt>实习经历</dt>
							<dd>
								<div class="experience-introduce">
									<div v-for="onePiece in studentInfo.resumetInfo.intershipInfo" class="one-piece">
										<dl class="experience-name clearfix">
											<dt>实习名称：</dt>
											<dd>{{onePiece.companyName}}</dd>
										</dl>
										<dl class="experience-time clearfix">
											<dt>实习时间：</dt>
											<dd>{{onePiece.intershipTime}}</dd>
										</dl>
										<dl class="experience-content clearfix">
											<dt>实习介绍：</dt>
											<dd>{{onePiece.intershipIntroduce}}</dd>
										</dl>
									</div>
								</div>
							</dd>
						</dl>
						<dl class="student-work">
							<dt>个人作品：</dt>
							<dd>
								<div class="work-introduce">
									<div v-for="onePiece in studentInfo.resumetInfo.personalWorksInfo" class="one-piece">
										<dl class="work-name clearfix">
											<dt>作品名称：</dt>
											<dd>{{onePiece.workName}}</dd>
										</dl>
										<dl class="work-discription clearfix">
											<dt>作品描述：</dt>
											<dd>{{onePiece.workDescription}}</dd>
										</dl>
										<dl class="work-link clearfix">
											<dt>作品链接：</dt>
											<dd>{{onePiece.workLink}}</dd>
										</dl>
									</div>
								</div>
							</dd>
						</dl>
					</div>
					<div v-if="userType == 3" class="btn-line">
						<button v-bind:class="{'hidden':!btnFlag}" @click="chooseDate" class="btn btn-info">邀请</button>
						<button v-bind:class="{'hidden':!btnFlag}" @click="refuseInvitation" class="btn btn-danger">拒绝</button>
						<router-link to='/company/receive' v-bind:class="{'hidden':!btnFlag}" class="btn btn-default">返回</router-link>
					</div>
					<div v-if="btnFlagFinal == false" class="btn-line">
						<router-link to='/company/receive' class="btn btn-default">返回</router-link>
					</div>
					<div v-if="userType == 2" class="btn-line">
						<router-link to='/student' class="btn btn-default">返回主页</router-link>
					</div>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
		<div v-if="chooseDateFlag" class="login-wraper">
			<div class="login-part">
				<div class="login-main">
					<dl class="clearfix interview-dist">
						<dt>公司地址：</dt>
						<dd>
							<input v-model="dist" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="clearfix choose-time">
						<dt>选择日期：</dt>
						<dd>
							<date-picker field="send-invitation" placeholder="选择日期" v-model="date" format="yyyy-mm-dd" :backward="false" :no-today="true" :forward="true"></date-picker>
						</dd>
					</dl>
					<dl class="clearfix choose-time">
						<dt>选择时间：</dt>
						<dd>
							<select v-model="halfDay" name="" class="form-control">
								<option value="上午">上午</option>
								<option value="下午">下午</option>
							</select>
							<select v-model="time" name="" class="form-control">
								<option v-for="onePiece in realTime">{{onePiece}}</option>
							</select>
						</dd>
					</dl>
					<div class="btn-line">
						<a @click="saveInvitation" class="btn btn-info" href="javascript:;">确定</a>
						<a @click="chooseDateFlag = false" class="btn btn-default" href="javascript:;">取消</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import StudentHeader from './../components/StudentHeader'
	import CompanyHeader from './../components/CompanyHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import './../assets/css/plugin-jeDate.css'
	import './../assets/js/jquery-2.2.0.js'
	import './../assets/js/jquery.jedate.min.js'
	import axios from 'axios'
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'

	export default {
		data() {
			return {
				studentInfo: {},
				userType: 0,
				chooseDateFlag: false,
				date: '',
				halfDay:'上午',
				dist:'',
				amTime:['8:00','9:00','10:00','11:00','12:00'],
				pmTime:['1:00','2:00','3:00','4:00','5:00'],
				time:'',
				btnFlag:true
			}
		},
		components: {
			StudentHeader,
			CompanyHeader,
			CommonFooter,
			'date-picker': myDatepicker
		},
		computed:{
			realTime(){
				if (this.halfDay == '上午') {
					return this.amTime;
				}else{
					return this.pmTime;
				}
			},
			btnFlagFinal(){
				if (this.userType == 3 && this.btnFlag == true) {
					return true;
				}else{
					return false;
				}
			}
		},
		mounted() {
			this.init();
			this.getUserType();
			this.initBtn();
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
			init() {
				axios.post('/student/studentDetails', {
					userId: this.$route.query.studentId
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.studentInfo = res.result;
					}
				})
			},
			getUserType() {
				let userType = this.getCookies('userType');
				this.userType = userType;
			},
			chooseDate() {
				this.chooseDateFlag = true;
			},
			saveInvitation(){
				axios.post('/company/saveInvitation',{
					companyId:this.getCookies('userId'),
					interviewDist:this.dist,
					interviewDate:this.date,
					interviewHalfday:this.halfDay,
					interviewTime:this.time,
					studentId:this.$route.query.studentId,
					jobId:this.$route.query.jobId
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						alert('邀请成功');
						console.log(typeof this.halfDay);
						this.$router.push({
							path:'/company/receive'
						})
					}else{
						alert('邀请失败');
					}
				})
			},
			refuseInvitation(){
				axios.post('/company/refuseInvitation',{
					companyId:this.getCookies('userId'),
					studentId:this.$route.query.studentId,
					jobId:this.$route.query.jobId,
					test:this.$route.query.test,
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						alert('拒绝成功');
//						this.$router.push({
//							path:'/company/receive'
//						})
					}else{
						alert('拒绝失败');
					}
				})
			},
			initBtn(){
				axios.post('/company/companyDetails',{
					userId:this.getCookies('userId')
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						res.result.received.forEach((onePiece)=>{
							if (parseInt(onePiece.studentId) == this.$route.query.studentId && parseInt(onePiece.jobId) == this.$route.query.jobId && onePiece.sendStatus != '待沟通') {
								this.btnFlag = false;
							}
						})
					}
				})
			}
		}
	}
</script>