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
    test(response, file, fileList) {
      let res = response;
      if (res.status == 0) {
        alert("导入成功");
        this.$router.push({
          path: "/admin"
        });
      } else {
        alert("导入失败");
      }
    }
  }
};
</script>
