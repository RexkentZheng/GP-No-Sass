<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-create-student">
			<div class="contain-body">
				<div class="student-info-title clearfix">
					<ul>
						<li class="active">
							<router-link to='/admin/studentInfo/'>添加用户</router-link>
						</li>
						<li >
							<router-link to='/admin/studentInfo/search'>查找用户</router-link>
						</li>
						<li >
							<router-link to='/admin/studentInfo/export'>输出用户</router-link>
						</li>
					</ul>
				</div>
				<div class="student-info-content">
					<div class="wraper">
						<el-upload
							ref="upload"
							action="/upload/excel"
							name="studentInfo"
							:multiple="false"
							:limit="1"
							accept=".xls,.xlsx"
							:on-success="uploadResponse"
							:show-file-list="true"
							:auto-upload="false"
							:file-list="fileList">
							<a slot="trigger" class="cbtn" href="javascript:;" type="primary">点击导入Excel文件</a>
							<a class="cbtn" type="success" @click="submitUpload">确认上传Excel文件</a>
						</el-upload>
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
      fileList: []
    };
  },
  mounted() {},
  components: {
    AdminHeader,
    CommonFooter
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    uploadResponse(response, file, fileList) {
      let res = response;
      if (res.status == 0) {
				this.$message({
					showClose: true,
					message: '导入成功',
					type: 'success'
				});
        this.$router.push({
          path: "/admin/studentInfo"
        });
      } else if (res.status == 2){
				this.$message({
					showClose: true,
					message: `已存在相同学号的学生用户,姓名为${res.result[0].personalInfo.studentName},学号为${res.result[0].personalInfo.studentNum}`,
					type: 'warning'
				});
				this.$refs.upload.clearFiles();
			} else {
				this.$message({
					showClose: true,
					message: '导入失败',
					type: 'warning'
				});
			}
    }
  }
};
</script>
