<template>
	<div id="">
  		<!--<el-upload
  		  ref="upload"
		  action="upload/test"
		  name="test"
		  :multiple="false"
		  :limit="1"
		  accept=".xls,.xlsx"
		  :on-success="test"
		  :show-file-list="true"
		  :auto-upload="false"
		  :file-list="fileList">
		  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button>
		</el-upload>-->
		<div v-for="item in conf" class="firstName">
			<p style="font-size: 20px;">{{item.mainName}}</p>
			<div v-for="item1 in item.secondClassify" class="secondName">
				<p style="font-size: 18px;">{{item1.secondName}}</p>
				<div v-for="item2 in item1.minClassify" class="thirdName">
					<p>{{item2}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import FileUpload from 'vue-upload-component'
	export default{
		data() {
			return {
				fileList:[],
				conf:{}
			}
		},
		components: {
			FileUpload,
		},
		mounted(){
			this.init();
			this.getConf();
		},
		methods:{
			 submitUpload() {
		        this.$refs.upload.submit();
		      },
		      init(){
//		      	axios.get("https://moment.douban.com/api/stream/date/2017-05-20").then((response)=>{
//		      		let res = response.data;
//		      		console.log(res);
//		      	})
		      },
		      test(response, file, fileList){
		      	let res = response;
		      	if (res.status == 0) {
		      		alert('Suc');
		      	}else{
		      		alert('Fal')
		      	}
		      },
		      getConf(){
		      	axios.get('/test/conf').then((response)=>{
		      		let res = response.data;
		      		console.log(res.result);
		      		this.conf = res.result.jobType.mainClassify;
		      	})
		      }
		}
	}
	
	
</script>

<style scoped="scoped">
	
</style>