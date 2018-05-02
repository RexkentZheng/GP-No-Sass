<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-search-student">
			<div class="contain-body">
				<div class="student-info-title clearfix">
					<ul>
						<li>
							<router-link to='/admin/studentInfo/'>添加用户</router-link>
						</li>
						<li class="active">
							<router-link to='/admin/studentInfo/search'>查找用户</router-link>
						</li>
						<li>
							<router-link to='/admin/studentInfo/export'>输出用户</router-link>
						</li>
					</ul>
				</div>
				<div class="student-search-content">
					<div class="search-count-wraper">
						<div class="search-count">
							<div class="input-group">
								<input autofocus="autofocus" class="form-control" v-model="countKeyWords" type="text" name="" id="" value="" placeholder="请输入账号名称或者账号ID" />
								<span class="input-group-addon" @click="searchCount()">搜索</span>
							</div>
						</div>
					</div>
					<div class="search-list">
						<ul>
							<li class="clearfix" v-for="count in countList" :key="count._id">
								<div class="left-part">
									<span @click="countDetails(count)" class="count-name"><a>{{count.personalInfo.studentName}}</a></span>
									<span class="count-id">{{count.personalInfo.studentNum}}</span>
								</div>
								<div class="right-part">
									<span class="count-sex">{{count.personalInfo.studentSex}}</span>
									<span class="count-sex">{{count.personalInfo.studentMajor}}</span>
								</div>
							</li>
							<li class="not-exist" v-if="countNotExist">
								<span>查无此人</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from "./../components/AdminHeader";
	import CommonFooter from "./../components/CommonFooter";
	import "./../assets/css/bootstrap.min.css";
	import "./../assets/css/common.css";
	import "./../assets/css/style.css";
	import axios from "axios";
	
	export default {
		data() {
			return {
				countList: [],
				countKeyWords: '',
				countNotExist: false
			};
		},
		mounted() {
			this.enterClick();
		},
		computed: {
			//判断输入的是id还是名字
			countKeyWordsType() {
				return isNaN(this.countKeyWords);
			}
		},
		components: {
			AdminHeader,
			CommonFooter
		},
		methods: {
			searchCount() {
				this.countList = [];
				if (this.countKeyWordsType) {
					axios.post('/student/studentName', {
						studentName: this.countKeyWords
					}).then((response) => {
						let res = response.data;
						if (res.result.length === 0) {
							this.countNotExist = true;
						} else {
							this.countNotExist = false;
							this.countList = res.result;
						}
					})
				} else {
					axios.post('/student/studentNum', {
						studentNum: this.countKeyWords
					}).then((response) => {
						let res = response.data;
						if (res.result.length === 0) {
							this.countNotExist = true;
						} else {
							this.countNotExist = false;
							this.countList = res.result;
						}
					})
				}
			},
			countDetails(count) {
				let userId = count.userId;
				this.$router.push({
					path: '/common/student/details',
					query: {
						'userId': userId
					}
				})
			},
			//回车触发搜索事件，只有将事件绑定在document上才能不用获取焦点就触发事件
			enterClick() {
				var tp = this;
				document.onkeydown = function(e) {
					var key = window.event.keyCode;
					if (key == 13) {
						tp.searchCount();
					}
				}
			}
		}
	};
</script>
