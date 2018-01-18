<template>
	<div>
		<student-header></student-header>
		<div class="container student-personal-info">
			<div class="contain-body clearfix" v-for="item in studentInfo">
				<dl class="student-name clearfix">
					<dt>姓名</dt>
					<span class="line"></span>
					<dd>{{item.studentName}}</dd>
				</dl>
				<dl class="student-num clearfix">
					<dt>学号</dt>
					<span class="line"></span>
					<dd>{{item.studentNum}}</dd>
				</dl>
				<dl class="student-major clearfix">
					<dt>专业</dt>
					<span class="line"></span>
					<dd>{{item.studentMajor}}</dd>
				</dl>
				<dl class="student-university clearfix">
					<dt>学校</dt>
					<span class="line"></span>
					<dd>{{item.studentUniversity}}</dd>
				</dl>
				<dl class="student-native clearfix">
					<dt>生源地</dt>
					<span class="line"></span>
					<dd>{{item.studentNativePlace}}</dd>
				</dl>
				<dl class="student-origin clearfix">
					<dt>籍贯</dt>
					<span class="line"></span>
					<dd>{{item.studentOrginPlace}}</dd>
				</dl>
				<dl class="student-paper-info clearfix">
					<dt>论文标题</dt>
					<span class="line"></span>
					<dd>{{item.studentPaperInfo.paperTitle}}</dd>
				</dl>
				<dl class="student-tutor-info clearfix">
					<dt>导师姓名</dt>
					<span class="line"></span>
					<dd>{{item.studentTutorInfo.tutorName}}</dd>
				</dl>
				<dl class="employment-info clearfix">
					<dt>是否就业</dt>
					<span class="line"></span>
					<dd v-if="item.employmentInfo.isEmployment">已就业</dd>
					<dd v-if="!item.employmentInfo.isEmployment">未就业</dd>
				</dl>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import StudentHeader from './../components/StudentHeader'
	import CommonFooter from './../components/CommonFooter'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	
	export default{
		data(){
			return{
				studentInfo:[],
				isEmployment:''
			}
		},
		components:{
			StudentHeader,
			CommonFooter
		},
		mounted(){
			this.getStudentInfo();
		},
		methods:{
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
			getStudentInfo(){
				axios.post('/student/studentDetails',{
					userId : this.getCookies('userId')
				}).then((response)=>{
					let res = response.data;
					if(res.status == 0){
						this.studentInfo.push(res.result.personalInfo) ;
					}
				});
			}
		}
	}
</script>
