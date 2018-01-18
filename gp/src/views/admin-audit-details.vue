<template>
	<div>
		<admin-header></admin-header>
		<div class="container common-company-details">
			<div class="contain-body">
				<div class="company-details">
					<dl class="user-name clearfix">
						<dt>用户名：</dt>
						<dd>{{applyInfo.userName}}</dd>
					</dl>
					<dl class="hr-name clearfix">
						<dt>HR姓名：</dt>
						<dd>{{applyInfo.userName}}</dd>
					</dl>
					<dl class="hr-tel clearfix">
						<dt>HR电话：</dt>
						<dd>{{applyInfo.hrTel}}</dd>
					</dl>
					<dl class="company-id clearfix">
						<dt>HR邮箱：</dt>
						<dd>{{applyInfo.hrEmail}}</dd>
					</dl>
					<dl class="company-name clearfix">
						<dt>公司名称：</dt>
						<dd>{{applyInfo.companyName}}</dd>
					</dl>
					<dl class="company-lisence clearfix">
						<dt>公司执照：</dt>
						<dd>
							<img @click="picSize = !picSize" v-bind:class="{'huge':picSize}" :src="applyInfo.companyLisence"/>
						</dd>
					</dl>
					<div v-if="!isChecked" class="btn-line">
						<a @click='auditPass' class="btn btn-info" href="javascript:;">通过审核</a>
						<a @click='auditDispass' class="btn btn-danger" href="javascript:;">不通过</a>
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
	
	export default{
		data(){
			return{
				applyInfo:{},
				isChecked:true,
				picSize:false,
			}
		},
		mounted(){
			this.init();
		},
		components:{
			AdminHeader,
			CommonFooter
		},
		methods:{
			init(){
				if (!this.$route.query.hrTel) {
					this.$router.push({
						path:'/admin'
					})
				}else{
					let hrTel = this.$route.query.hrTel;
					axios.post('/apply/Details',{
						hrTel:hrTel
					}).then((response)=>{
						let res = response.data;
						if (res.status == 1) {
							alert('系统错误');
						}else{
							let temporary = res.result;
							this.applyInfo = temporary;
							console.log(this.applyInfo.isChecked);
							this.isChecked = this.applyInfo.isChecked;
						}
					})
				}
			},
			auditPass(){
				axios.post('/user/pass',{
					userName:this.applyInfo.userName
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						alert('审批成功');
					}else{
						alert('审批失败');
					}
				});
				this.$router.push({
					path:'/admin/audit'
				});
			},
			auditDispass(){
				axios.post('/user/dispass',{
					userName:this.applyInfo.userName
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						alert('审批成功');
					}else{
						alert('审批失败');
					}
				})
			}
		}
	}  
</script>
