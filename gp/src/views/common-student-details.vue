<template>
	<div>
		<admin-header></admin-header>
		<div class="container common-student-details">
			<div class="contain-body">
				<div class="student-details">
					<dl class="student-name clearfix">
						<dt>姓名:</dt>
						<dd>{{studentInfo.studentName}}</dd>
					</dl>
					<dl class="student-num clearfix">
						<dt>学号:</dt>
						<dd>{{studentInfo.studentNum}}</dd>
					</dl>
					<dl class="student-major clearfix">
						<dt>学院:</dt>
						<dd>{{studentInfo.studentCollege}}</dd>
					</dl>
					<dl class="student-major clearfix">
						<dt>专业:</dt>
						<dd>{{studentInfo.studentMajor}}</dd>
					</dl>
					<dl class="student-university clearfix">
						<dt>学校:</dt>
						<dd>{{studentInfo.studentUniversity}}</dd>
					</dl>
					<dl class="student-native clearfix">
						<dt>生源地:</dt>
						<dd>{{studentInfo.studentNativePlace}}</dd>
					</dl>
					<dl class="student-origin clearfix">
						<dt>籍贯:</dt>
						<dd>{{studentInfo.studentOriginPlace}}</dd>
					</dl>
					<dl class="student-paper-info clearfix">
						<dt>论文标题:</dt>
						<dd>{{studentInfo.studentPaperInfo.paperTitle}}</dd>
					</dl>
					<dl class="student-tutor-info clearfix">
						<dt>导师姓名:</dt>
						<dd>{{studentInfo.studentTutorInfo.tutorName}}</dd>
					</dl>
					<dl class="employment-info clearfix">
						<dt>是否就业:</dt>
						<dd v-if="studentInfo.employmentInfo.isEmployment">是</dd>
						<dd v-if="!studentInfo.employmentInfo.isEmployment">否</dd>
					</dl>
					<div class="btn-line">
						<a @click="changeDetails" class="btn btn-info" href="javascript:;">修改</a>
						<a @click="delStudent" class="btn btn-danger" href="javascript:;">删除</a>
						<a @click="cancelChange" class="btn btn-default" href="javascript:;">取消</a>
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
				studentInfo:{
					studentName:'',
					studentNum:'',
					studentMajor:'',
					studentUniversity:'',
					studentNativePlace:'',
					studentOriginPlace:'',
					studentPaperInfo:{
						paperTitle:'',
						paperContent:''
					},
					studentTutorInfo:{
						tutorName:'',
						tutorPosition:''
					},
					employmentInfo:{
						isEmployment:true,
						companyId:'',
						companyNmae:''
					}
				},
			}
		},
		components:{
			AdminHeader,
			CommonFooter
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				axios.post('./../../student/studentDetails',{
					userId:this.$route.query.userId
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.studentInfo = res.result.personalInfo;
					}
				})
			},
			changeDetails(){
				let userId = this.$route.query.userId;
				this.$router.push({
					path:'./../../common/student/changedetails',
					query:{
						'userId':userId
					}
				})
			},
			delStudent(){
				axios.post('./../../student/delStudent',{
					userId : this.$route.query.userId
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						alert('删除成功');
						this.$router.push({
							path:'./../../admin'
						})
					}else{
						alert('删除失败');
						this.init();
					}
				})
			},
			cancelChange(){
				this.$router.push({
					path:'./../../admin'
				})
			}
		}
	}
</script>

<style>
</style>