<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-creat-student">
			<div class="contain-body">
				<div class="wraper">
					<el-upload
			  		  ref="upload"
					  action="/upload/excel"
					  name="test"
					  :multiple="false"
					  :limit="1"
					  accept=".xls,.xlsx"
					  :on-success="test"
					  :show-file-list="true"
					  :auto-upload="false"
					  :file-list="fileList">
					  <a slot="trigger" class="cbtn" href="javascript:;" type="primary">点击导入Excel文件</a>
					  <a class="cbtn" type="success" @click="submitUpload">确认上传Excel文件</a>
					</el-upload>
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
				fileList:[]
			}
		},
		components:{
			AdminHeader,
			CommonFooter
		},
		methods:{
			submitUpload() {
		        this.$refs.upload.submit();
		      },
		      test(response, file, fileList){
		      	let res = response;
		      	if (res.status == 0) {
		      		alert('导入成功');
		      		this.$router.push({
		      			path:'/admin'
		      		})
		      	}else{
		      		alert('导入失败')
		      	}
		      }
		}
	}
</script>

<style scoped>
	.contain-body{
		margin-top: 20px;
		margin-bottom: 50px;
	}
	.wraper{
		width: 300px;
		margin: 0 auto;
	}
	.cbtn{
		width: 300px;
	padding: 0px 85px;
    height: 60px;
    line-height: 60px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    margin: 10px 0;
	}
</style>