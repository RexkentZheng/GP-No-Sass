<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-search-company">
			<div class="contain-body">
				<div class="company-search-title clearfix">
					<ul class="clearfix">
						<li>
							<router-link to='/admin/companyInfo'>审核列表</router-link>
						</li>
						<li>
							<router-link class="active" to='/admin/companyInfo/search'>企业查找</router-link>
						</li>
						<li>
							<router-link to='/admin/companyInfo/chart'>信息概况</router-link>
						</li>
					</ul>
				</div>
				<div class="company-search-content">
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
							<li class="clearfix" v-for="count in countList" >
								<div class="left-part">
									<span @click="countDetails(count)" class="count-name"><a>{{count.userName}}</a></span>
									<span class="count-id">{{count.regeditInfo.hrName}}：{{count.regeditInfo.hrTel}}</span>
								</div>
								<div class="right-part">
									<span class="count-sex">{{count.regeditInfo.companyName}}</span>
									<span class="count-sex">{{count.companyInfo.companyBaseInfo.companyProvince}}/{{count.companyInfo.companyBaseInfo.companyCity}}/{{count.companyInfo.companyBaseInfo.companyArea}}</span>
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
				if (this.countKeyWordsType) {
					axios.post('/company/companyName', {
						companyName: this.countKeyWords
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
					axios.post('/company/companyDetails', {
						userId: this.countKeyWords
					}).then((response) => {
						let res = response.data;
						if (res.result.length === 0) {
							this.countNotExist = true;
						} else {
							this.countNotExist = false;
							this.countList.push(res.result);
						}
					})
				}
			},
			countDetails(count) {
				let userId = count.userId;
				this.$router.push({
					path: '/common/company/details',
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
	}
</script>
