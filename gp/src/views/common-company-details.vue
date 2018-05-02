<template>
	<div>
		<common-header></common-header>
		<div class="container company-index">
			<div class="contain-body">
				<div class="company-info">
					<dl  v-if="userType == 1" class="company-logo">
						<div class="title-wraper clearfix">
							<span class="company-title ">注册信息</span>
							<span class="line "></span>
						</div>
						<dd class="regedit-info">
							<dl class="hr-name clearfix">
								<dt>HR姓名：</dt>
								<dd>{{companyAllInfo.userName}}</dd>
							</dl>
							<dl class="hr-tel clearfix">
								<dt>HR电话：</dt>
								<dd>{{regeditInfo.hrTel}}</dd>
							</dl>
							<dl class="company-email clearfix">
								<dt>HR邮箱：</dt>
								<dd>{{regeditInfo.hrEmail}}</dd>
							</dl>
							<dl class="company-email clearfix">
								<dt>用户ID：</dt>
								<dd>{{companyAllInfo.userId}}</dd>
							</dl>
							<dl class="company-name clearfix">
								<dt>公司名称：</dt>
								<dd>{{regeditInfo.companyName}}</dd>
							</dl>
							<dl class="company-lisence clearfix">
								<dt>公司执照：</dt>
								<dd>
									<img v-bind:src="regeditInfo.compnayLisence" />
								</dd>
							</dl>
						</dd>
					</dl>
					<dl class="company-logo">
						<div class="title-wraper clearfix">
							<span class="company-title ">公司Logo</span>
							<span class="line "></span>
						</div>
						<dd>
							<div class="photo-unchange">
								<img v-bind:src="companyInfo.companyLogo" />
							</div>
						</dd>
					</dl>
					<dl class="company-base-info">
						<div class="title-wraper clearfix">
							<span class="company-title">基本信息</span>
							<span class="line"></span>
						</div>
						<div class="dl-wraper clearfix">
							<dl class="clearfix">
								<dt class="company-type"><span class="glyphicon glyphicon-th-large icon"></span>公司类型：</dt>
								<dd>{{companyBaseInfo.companyType}}</dd>
							</dl>
							<dl class="clearfix">
								<dt class="company-count"><span class="glyphicon glyphicon-user icon"></span>公司人数：</dt>
								<dd>{{companyBaseInfo.companyCount}}</dd>
							</dl>
							<dl class="clearfix">
								<dt class="company-loaction"><span class="glyphicon glyphicon-map-marker icon"></span>公司位置：</dt>
								<dd>{{companyBaseInfo.companyProvince}}/{{companyBaseInfo.companyCity}}/{{companyBaseInfo.companyArea}}</dd>
							</dl>
						</div>
					</dl>
					<dl class="company-label">
						<div class="title-wraper clearfix">
							<span class="company-title">公司标签</span>
							<span class="line"></span>
						</div>
						<dd>
							<div class="normal-unchange">
								<span v-for="label in labels" :key="label">{{label}}</span>
							</div>
						</dd>
					</dl>
					<dl class="company-production">
						<div class="title-wraper clearfix">
							<span class="company-title">公司产品</span>
							<span class="line"></span>
						</div>
						<dd>
							<ul class="kill-type">
								<li>
									<div v-for="production in productions" :key="production._id" class="clearfix">
										<div class="company-production-unchange clearfix">
											<div class="img-part clearfix">
												<img v-bind:src="production.productionImg" />
											</div>
											<div class="production-introduce">
												<span>{{production.productionTitle}}</span>
												<p>
													{{production.productionIntroduce}}
												</p>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</dd>
					</dl>
					<dl class="company-introduce">
						<div class="title-wraper clearfix">
							<span class="company-title">公司介绍</span>
							<span class="line"></span>
						</div>
						<dd>
							<div class="company-introduce-unchange">
								<p>
									{{companyInfo.companyIntroduce}}
								</p>
							</div>
						</dd>
					</dl>
					<div v-if="parseFloat(userType) === 1" class="btn-line">
						<a  class="btn btn-danger btn-lg" href="javascreipt:;">拉黑</a>
						<a @click="cancelDel" class="btn btn-default btn-lg" href="javascreipt:;">返回</a>
					</div>
					<div v-if="parseFloat(userType) !== 1" class="btn-line">
						<a @click="cancelDel" class="btn btn-default btn-lg" href="javascreipt:;">返回</a>
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
				companyAllInfo: {},
				labels: [],
				productions: [],
				userType:0,
				regeditInfo:{},
				companyInfo:{},
				companyBaseInfo:{}
			}
		},
		components: {
			CommonHeader,
			CommonFooter
		},
		mounted() {
			this.init();
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
			getUserType(){
				let userType = this.getCookies('userType');
				this.userType = userType;
			},
			init() {
				let userId = this.$route.query.userId;
				axios.post('/company/companyDetails', {
					userId: userId
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.companyAllInfo = res.result;
						this.labels = this.companyAllInfo.companyInfo.companyLabel.split('+');
						this.productions = this.companyAllInfo.companyProduction;
						this.regeditInfo = this.companyAllInfo.regeditInfo;
						this.companyInfo = this.companyAllInfo.companyInfo;
						this.companyBaseInfo = this.companyInfo.companyBaseInfo;
					}
				})
			},
			cancelDel(){
				this.$router.go(-1);
			},
			
		}
	}
</script>