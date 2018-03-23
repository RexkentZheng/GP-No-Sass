<template>
	<div>
		<common-header></common-header>
		<div class="container index">
			<div class="contain-header">
				<div class="search-wraper clearfix">
					<div class="input-group">
						<input v-model="keyWords" class="form-control" type="text" placeholder="请输入小屎球子" />
						<router-link class="input-group-addon" :to="{path:'/common/job/list',query:{keyWords:keyWords,searchWay:'key'}}">搜索</router-link>
					</div>
					<div class="popular-search">
						<p><span class="title">热门搜索：</span><span class="details">
							<router-link :to="{path:'/common/job/list',query:{keyWords:'java',searchWay:'type'}}">java</router-link>
							<router-link :to="{path:'/common/job/list',query:{keyWords:'JavaScript',searchWay:'type'}}">JavaScript</router-link>
							<router-link :to="{path:'/common/job/list',query:{keyWords:'java',searchWay:'type'}}">java</router-link>
						</span></p>
					</div>
				</div>
			</div>
			<div class="contain-body">
				<div class="clearfix">
					<div class="sidebar">
						<div v-for="main in jobTypes" class="menu-box">
							<div class="menu-main current">
								<div class="categpry-list clearfix">
									<h3>{{main.mainName}}</h3>
									<div class="hotWraper">
										<router-link v-for="hotJob in main.hotJobs" :to="{path:'/common/job/list',query:{keyWords:hotJob,searchWay:'type'}}">{{hotJob}}</router-link>
										<a v-for="hotJob in main.hotJobs" href="javascript:;" @click="">{{hotJob}}</a>
									</div>
									<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
								</div>
							</div>
							<div class="menu-sub">
								<dl v-for="second in main.secondClassify">
									<dt>
										<span>{{second.secondName}}</span>
									</dt>
									<dd>
										<router-link v-for="third in second.minClassify" :key="third.id" :to="{path:'/common/job/list',query:{keyWords:third,searchWay:'type'}}">{{third}}</router-link>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<div class="banner clearfix">
						<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
							<swiper-slide v-for="bannerImg in bannerImgs" :key="bannerImg.id">
								<img :src="'../../static/banner/'+bannerImg.imgName" />
							</swiper-slide>
							<div class="swiper-button-prev" slot="button-prev"></div>
							<div class="swiper-button-next" slot="button-next"></div>
						</swiper>
					</div>
				</div>
				<div class="job-tab">
					<ul class="kill-type clearfix">
						<li>推荐职位</li>
					</ul>
				</div>
				<div class="job-list-wraper">
					<div class="job-list">
						<ul class="kill-type">
							<li v-for="item in jobListLimited">
								<div class="main-info clearfix">
									<h3 @click="toJobDetails(item)" class="job-name">{{item.jobName}}</h3>
									<p class="release-time">{{item.jobRelaseTime}}</p>
									<span class="salary">{{item.jobSalary}}</span>
								</div>
								<div class="condition clearfix">
									<p>
										<span class="education">{{item.jobRequirement}}</span>
									</p>
								</div>
								<div class="welfare clearfix">
									<span v-for="label in item.jobAtempt.split('+',4)">{{label}}</span>
								</div>
								<div class="company clearfix">
									<img class="company-logo" v-bind:src="item.companyInfo.companyLogo" />
									<div class="company-introduce clearfix">
										<router-link :to="{path:'/common/company/details',query:{userId:item.companyId}}" class="company-name">{{item.companyInfo.companyBaseInfo.companyName}}</router-link>
										<p class="company-info">
											<span class="company-type">{{item.companyInfo.companyBaseInfo.companyType}}</span> /
											<span class="company-loaction">{{item.companyInfo.companyBaseInfo.companyProvince}}·{{item.companyInfo.companyBaseInfo.companyCity}}</span>
										</p>
									</div>
								</div>
							</li>
						</ul>
						<a v-show="changedJobList.length > 6" class="show-more" @click="showAlljobs($event)">{{limitBtn}}</a>
					</div>
				</div>
			</div>
			<div class="link-box">
				<dl>
					<dt>
						<span>友情链接</span>
					</dt>
					<dd class="clearfix">
						<a href="javascript:;">百度</a>
						<a href="javascript:;">京东</a>
						<a href="javascript:;">百度</a>
						<a href="javascript:;">百度</a>
						<a href="javascript:;">百度</a>
					</dd>
				</dl>
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
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.min.css';
	export default {
		data() {
			return {
				jobList: [],
				changedJobList: [],
				jobLimit: 3,
				limitBtn: "查看更多",
				jobTypes: [],
				bannerImgs: [],
				keyWords:'',
				notNextTick: true,
				swiperOption: {
					loop: true,
					autoplay: 3000,
					direction: 'horizontal',
					grabCursor: true,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					observeParents: true
				}
			}
		},
		computed: {
			jobListLimited() {
				return this.changedJobList.slice(0, this.jobLimit);
			}
		},
		mounted() {
			this.getStudentJobList();
			this.getConf();
		},
		components: {
			CommonHeader,
			CommonFooter,
			swiper,
			swiperSlide
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
			getStudentJobList() {
				let userType = this.getCookies('userType');
				if(userType == 2) {
					axios.get('/job/list').then((response) => {
						let res = response.data;
						if(res.status == 0) {
							this.jobList = res.result;
							this.changedJobList = this.jobList;
							axios.post('/job/receivedList', {
								studentId: parseInt(this.getCookies('userId'))
							}).then((response) => {
								let res = response.data;
								if(res.status == 0) {
									let receivedList = [];
									receivedList = res.result;
									this.changedJobList = [];
									//取出jobId不同的部分
									//这里用了两个for循环来找出不同的部分，不能用forEach，因为forEach不能被中断
									//第一个数组是所有的职位列表，第二个数组是学生投递信息
									var result = [];
									for(var i = 0; i < this.jobList.length; i++) {
										var obj1 = this.jobList[i];
										var num1 = obj1.jobId;
										var isExist = false;
										for(var j = 0; j < receivedList.length; j++) {
											var obj2 = receivedList[j];
											var num2 = obj2.jobId;
											if(num1 == num2) {
												isExist = true;
												break;
											}
										}
										if(!isExist) {
											result.push(obj1);
										}
									}
									this.changedJobList = result;
									console.log('剩余职位列表' + this.changedJobList);
								} else {
									this.jobList = [];
								}
							})
						} else {
							this.jobList = [];
						}
					})
				} else {
					this.getAlljobs();
				}
			},
			getAlljobs() {
				axios.get('/job/list').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobList = res.result;
						this.changedJobList = this.jobList;
						console.log(this.changedJobList);
					} else {
						this.jobList = [];
					}
				})
			},
			showAlljobs(e) {
				if(this.jobLimit == 3) {
					this.jobLimit = this.jobList.length;
					e.target.text = "收起";
				} else {
					this.jobLimit = 3;
					e.target.text = "查看更多";
				}
			},
			toJobDetails(item) {
				if (this.getCookies('userType') == '2') {
					this.$router.push({
						path: '/common/job/details',
						query: {
							jobId: item.jobId,
							isSend:'false'
						}
					})
				}else{
					this.$router.push({
						path: '/common/job/details',
						query: {
							jobId: item.jobId
						}
					})
				}
				
			},
			getConf() {
				axios.get('/conf/jobType').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobTypes = res.result.jobType.mainClassify;
						this.bannerImgs = res.result.bannerImg;
					} else {
						console.log('没有获取到职位类型')
					}
				})
			}
		}
	}
</script>
<style scoped="scoped">
	.swiper-button-next {
		position: absolute;
		right: 20px;
		top: 156px;
		background-image: url(../../static/img/banner_arrow_right.png);
		background-repeat: no-repeat;
		background-size: 19px 34px;
	}
	
	.swiper-button-next:hover {
		background-image: url(../../static/img/banner_arrow_right_highlight.png);
	}
	
	.swiper-button-prev {
		position: absolute;
		top: 156px;
		left: 20px;
		background-image: url(../../static/img/banner_arrow_left.png);
		background-repeat: no-repeat;
		background-size: 19px 34px;
	}
	
	.swiper-button-prev:hover {
		background-image: url(../../static/img/banner_arrow_left_highlight.png);
	}
	
	.swiper-container {
		z-index: 0;
	}
</style>