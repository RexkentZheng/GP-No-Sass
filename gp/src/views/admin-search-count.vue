<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-search-count">
			<div class="contain-body">
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
								<span @click="countDetails(count)" class="count-name"><a>{{count.userName}}</a></span>
								<span class="count-id">{{count.userId}}</span>
							</div>
							<div class="right-part">
								<span class="count-type">{{count.userTypeTd}}</span>
							</div>
						</li>
						<li class="not-exist" v-if="countNotExist">
							<span>查无此人</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from './../components/AdminHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'

	export default {
		data() {
			return {
				countList: [],
				countKeyWords: '',
				countNotExist: false
			}
		},
		components: {
			AdminHeader,
			CommonFooter
		},
		mounted(){
			this.enterClick();
		},
		computed: {
			//判断输入的是id还是名字
			countKeyWordsType() {
				return isNaN(this.countKeyWords);
			}
		},
		methods: {
			searchCount() {
				if(this.countKeyWordsType) {
					axios.post('/user/userName', {
						userName: this.countKeyWords
					}).then((response) => {
						let res = response.data;
						if(res.status == 0) {
							this.countList = res.result;
							//判断是否有账号
							if(this.countList.length > 0) {
								//输出中文的用户类型
								this.countList.forEach(function(count) {
									if(count.userType == 3) {
										count.userTypeTd = '企业';
									} else if(count.userType == 2) {
										count.userTypeTd = '学生';
									} else {
										count.userTypeTd = '管理员';
									}
								});
								this.countNotExist = false;
							} else {
								this.countNotExist = true;
							}
						} else {}
					})
				} else {
					axios.post('/user/userId', {
						userId: this.countKeyWords
					}).then((response) => {
						let res = response.data;
						if(res.status == 0) {
							this.countList = res.result;
							//判断是否有账号
							if(this.countList.length > 0) {
								//输出中文的用户类型
								this.countList.forEach(function(count) {
									if(count.userType == 3) {
										count.userTypeTd = '企业';
									} else if(count.userType == 2) {
										count.userTypeTd = '学生';
									} else {
										count.userTypeTd = '管理员';
									}
								});
								this.countNotExist = false;
							} else {
								this.countNotExist = true;
							}
						} else {}
					})
				}
			},
			countDetails(count) {
				let userId = count.userId;
				let userType = count.userType;
				if (userType == 3) {
					this.$router.push({
						path: '/common/company/details',
						query: {
							'userId': userId
						}
					})
				}else if (userType == 2) {
					this.$router.push({
						path: '/common/student/details',
						query: {
							'userId': userId
						}
					})
				}
			},
			//回车触发搜索事件，只有将事件绑定在document上才能不用获取焦点就触发事件
			enterClick() {
				var tp = this;
				document.onkeydown = function(e) {
					var key = window.event.keyCode;
					if(key == 13) {
						tp.searchCount();
					}
				}
			}
		}
	}
</script>