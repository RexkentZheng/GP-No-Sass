<template>
	<div>
		<admin-header></admin-header>
		<div class="container common-student-details">
			<div class="contain-body">
				<div class="student-details">
					<dl class="student-name clearfix">
						<dt>姓名:</dt>
						<dd>
							<input v-model="studentInfo.studentName" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-num clearfix">
						<dt>学号:</dt>
						<dd>
							<input v-model="studentInfo.studentNum" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-major clearfix">
						<dt>专业:</dt>
						<dd>
							<input v-model="studentInfo.studentMajor" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-university clearfix">
						<dt>学校:</dt>
						<dd>
							<input v-model="studentInfo.studentUniversity" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-native clearfix">
						<dt>生源地:</dt>
						<dd>
							<input v-model="studentInfo.studentNativePlace" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-origin clearfix">
						<dt>籍贯:</dt>
						<dd>
							<input v-model="studentInfo.studentOrginPlace" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-paper-info clearfix">
						<dt>论文标题:</dt>
						<dd>
							<input v-model="studentInfo.studentPaperInfo.paperTitle" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="student-tutor-info clearfix">
						<dt>导师姓名:</dt>
						<dd>
							<input v-model="studentInfo.studentTutorInfo.tutorName" class="form-control" type="text" name="" id="" value="" />
						</dd>
					</dl>
					<dl class="employment-info clearfix">
						<dt>是否就业:</dt>
						<dd>
							<select v-model="studentInfo.employmentInfo.isEmployment" class="form-control">
								<option disabled value="">请选择</option>
							    <option value="true">是</option>
							    <option value="false">否</option>
							</select>
						</dd>
					</dl>
					<div class="btn-line">
						<a @click="saveChange" class="btn btn-info" href="javascript:;">确定</a>
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
					studentOrginPlace:'',
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
			saveChange(){
				axios.post('../../student/changeDetails',{
					userId : this.$route.query.userId,
					personalInfo : this.studentInfo
				}).then((response)=>{
					let res = response.data;
					if (res,status == 0) {
						alert('保存成功');
						this.$router.push({
							path:'./../../admin'
						})
					}else{
						alert('保存失败');
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