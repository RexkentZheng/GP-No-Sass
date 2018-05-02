<template>
	<div>
		<company-header></company-header>
		<div class="container company-jobs company-jobs-change">
			<div class="contain-body">
				<div class="job-base-info">
					<div class="job-name">
						<div class="title-wraper clearfix">
							<span class="job-title">职位名称</span>
							<span class="line"></span>
						</div>
						<div class="job-name-changing">
							<dl class="clearfix">
								<dd>
									<input v-model="jobInfo.jobName" class="form-control" type="text" name="" id="" value="" />
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-salary">
						<div class="title-wraper clearfix">
							<span>职位薪资</span>
							<span class="line"></span>
						</div>
						<div class="job-salary-changing">
							<dl class="clearfix">
								<dd>
									<select v-model="jobInfo.jobSalary" class="form-control">
										<option v-for="option in jobConditionOther.jobSalary" :value="option" :key="option">{{option}}</option>
									</select>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-requirement">
						<div class="title-wraper clearfix">
							<span>学历要求</span>
							<span class="line"></span>
						</div>
						<div class="job-requirement-changing">
							<dl class="clearfix">
								<dd>
									<select v-model="jobInfo.jobRequirement" class="form-control">
										<option v-for="option in jobConditionOther.jobRequirement" :value="option" :key="option">{{option}}</option>
									</select>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-form">
						<div class="title-wraper clearfix">
							<span>职位形式</span>
							<span class="line"></span>
						</div>
						<div class="job-type-changing">
							<dl class="clearfix">
								<dd>
									<select v-model="jobInfo.jobType" class="form-control">
										<option v-for="option in jobConditionOther.jobType" :value="option" :key="option">{{option}}</option>
									</select>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-type">
						<div class="title-wraper clearfix">
							<span>职位类型</span>
							<span class="line"></span>
						</div>
						<div class="job-type-changing clearfix">
							<dl class="clearfix">
								<dt>一级</dt>
								<dd>
									<select v-model="jobInfo.jobTypeFirst" class="form-control">
										<option v-for="option in jobConditionType" :value="option.mainName" :key="option.mainName">{{option.mainName}}</option>
									</select>
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>二级</dt>
								<dd>
									<select v-model="jobInfo.jobTypeSecond" class="form-control">
										<option v-for="option in jobConditionSecondType" :value="option.secondName" :key="option.secondName">{{option.secondName}}</option>
									</select>
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>三级</dt>
								<dd>
									<select v-model="jobInfo.jobTypeThird" class="form-control">
										<option v-for="option in jonConditionThirdType" :value="option"  :key="option">{{option}}</option>
									</select>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-tempt">
						<div class="title-wraper clearfix">
							<span>职位诱惑</span>
							<span class="line"></span>
						</div>
						<div class="job-tempt-changing">
							<dl class="clearfix">
								<dd>
									<h3>请输入职位诱惑：（标签之前请用+连接）</h3>
									<textarea v-model="jobInfo.jobAtempt" class="form-control" name="" rows="" cols="" wrap="hard"></textarea>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-duty">
						<div class="title-wraper clearfix">
							<span>职位描述</span>
							<span class="line"></span>
						</div>
						<div class="job-duty-changing">
							<dl class="clearfix">
								<dt>岗位职责：</dt>
								<dd>
									<textarea v-model="jobInfo.jobDiscription.jobDuty" class="form-control" name="" rows="" cols="" wrap="hard"></textarea>
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>任职要求：</dt>
								<dd>
									<textarea v-model="jobInfo.jobDiscription.jobrequirement" class="form-control" name="" rows="" cols="" wrap="hard"></textarea>
								</dd>
							</dl>
						</div>
					</div>
					<div class="job-location">
						<div class="title-wraper clearfix">
							<span>工作地址</span>
							<span class="line"></span>
						</div>
						<div class="job-location-changing">
							<dl class="clearfix">
								<dd>
									<v-distpicker @selected="changeDistInfo" :province="jobInfo.jobLoaction.jobProvince" :city="jobInfo.jobLoaction.jobCity" :area="jobInfo.jobLoaction.jobArea"></v-distpicker>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="savaChanges" class="btn btn-info btn-lg" href="javascript:;">确认</a>
								<router-link to='/company/job/list' class="btn btn-default btn-lg">取消</router-link>
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
	import CompanyHeader from './../components/CompanyHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	import VDistpicker from 'v-distpicker'

	export default {
		data() {
			return {
				isNew: false,
				jobInfo: {
					jobId: '',
					jobName: '',
					jobSalary: '',
					jobLoaction: {
						jobProvince: '',
						jobCity: '',
						jobArea: ''
					},
					jobType: '',
					jobTypeFirst: '',
					jobTypeSecond: '',
					jobTypeThird: '',
					jobRequirement: '',
					jobDiscription: {
						jobDuty: '',
						jobrequirement: ''
					},
					isOnline: true,
					companyId: 0
				},
				jobConditionOther: {},
				jobConditionType: []
			}
		},
		computed: {
			jobConditionSecondType() {
				if(this.jobInfo.jobTypeFirst !== '') {
					let data = [];
					this.jobConditionType.forEach((item) => {
						if(item.mainName == this.jobInfo.jobTypeFirst) {
							data = item.secondClassify;
						}
					})
					return data;
				}
			},
			jonConditionThirdType() {
				if(this.jobInfo.jobTypeSecond !== '') {
					let data = [];
					this.jobConditionSecondType.forEach((item) => {
						if(item.secondName == this.jobInfo.jobTypeSecond) {
							data = item.minClassify;
						}
					})
					return data;
				}
			}
		},
		components: {
			CompanyHeader,
			CommonFooter,
			VDistpicker
		},
		mounted() {
			this.jobDetails();
			this.init();
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
				axios.get('/conf/jobType').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobConditionOther = res.result.jobInfo;
						this.jobConditionType = res.result.jobType.mainClassify;
					}
				})
			},
			jobDetails() {
				//判断是否有参数，有参数就是修改信息
				if(this.$route.query.jobId) {
					let jobId = this.$route.query.jobId;
					axios.post('/job/jobDetails', {
						jobId: jobId
					}).then((response) => {
						let res = response.data;
						if(res.status == 0) {
							this.jobInfo = res.result;
						}
					})
					//没有参数就是新建信息
				} else {
					this.isNew = true;
				}

			},
			savaChanges() {
				//如果不是新建就保存
				if(this.isNew == false) {
					//判断是否有空值
					let isFinish = true;
					for(let key in this.jobInfo) {
						if(key != '__v') {
							if(!this.jobInfo[key]) {
								isFinish = false;
							}
						}
					}
					for(let key in this.jobInfo.jobLoaction) {
						if(!this.jobInfo.jobLoaction[key]) {
							isFinish = false;
						}
					}
					if(isFinish) {
						axios.post('/job/savaJobChanges', {
							jobId: this.jobInfo.jobId,
							jobInfo: this.jobInfo
						}).then((response) => {
							let res = response.data;
							if(res.status == 0) {
								this.$message({
									showClose: true,
									message: '修改成功',
									type: 'success'
								});
								this.$router.push({
									path: '/company/job/list'
								});
							} else {
								this.$message({
									showClose: true,
									message: '修改失败',
									type: 'warning'
								});
							}
						})
					} else {
						this.$message({
							showClose: true,
							message: '请完善所有信息之后再进行保存操作',
							type: 'warning'
						});
					}

					//如果是新建就调用新建接口	
				} else {
					//添加companyId
					this.jobInfo.companyId = parseInt(this.getCookies('userId'));
					//判断是否有空值
					let isFinish = true;
					for(let key in this.jobInfo) {
						if(key != 'jobId') {
							if(this.jobInfo[key] == '') {
								isFinish = false;
							}
						}
					}
					for(let key in this.jobInfo.jobLoaction) {
						if(!this.jobInfo.jobLoaction[key]) {
							isFinish = false;
						}
					}
					if(isFinish) {
						axios.post('/company/companyDetails', {
							userId: this.jobInfo.companyId
						}).then((response) => {
							let res = response.data;
							if(res.status == 0) {
								axios.post('/job/createjob', {
									jobInfo: this.jobInfo
								}).then((response) => {
									let res = response.data;
									if(res.status == 0) {
										this.$message({
											showClose: true,
											message: '新建成功',
											type: 'success'
										});
										this.$router.push({
											path: '/company/job/list'
										});
									} else if(res.status == 1001) {
										this.$message({
											showClose: true,
											message: '请完善用户信息之后再发布职位',
											type: 'warning'
										});
									} else {
										this.$message({
											showClose: true,
											message: '新建失败',
											type: 'warning'
										});
									}
								})
							}
						})
					} else {
						this.$message({
							showClose: true,
							message: '请完善所有信息之后再进行保存操作',
							type: 'warning'
						});
					}
				}
			},
			changeDistInfo(data) {
				this.jobInfo.jobLoaction.jobProvince = data.province.value;
				this.jobInfo.jobLoaction.jobCity = data.city.value;
				this.jobInfo.jobLoaction.jobArea = data.area.value;
			},
		}
	}
</script>