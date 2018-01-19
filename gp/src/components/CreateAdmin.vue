<template>
	<div v-if="isCreateShow" class="create-admin">
		<dl class="admin-name clearfix">
			<dt>姓名：</dt>
			<dd><input v-model="adminName" class="form-control" type="text" name="" value="" /></dd>
		</dl>
		<dl class="admin-authority clearfix">
			<dt>权限：</dt>
			<dd>
				<select class="form-control" name="authority" v-model="adminAuthority">
					<option value='1'>一级权限</option>
					<option value="2">二级权限</option>
				</select>
			</dd>
		</dl>
		<dl class="admin-pwd clearfix">
			<dt>密码：</dt>
			<dd><input v-model="adminPwd" class="form-control" type="password" name="" value="" /></dd>
		</dl>
		<div class="btn-line">
			<a class="btn btn-info" href="javascript:;" @click="creatAdmin">确认</a>
			<a class="btn btn-default" href="javascript:;" @click="cancel">取消</a>
		</div>
	</div>
</template>
<script>
import axios from 'axios'

export default {
  props:['isCreateShow'],
  data() {
    return {
      adminName: "",
      adminAuthority: "",
      adminPwd: "",
      isCreateShow:true,
    };
  },
  methods: {
    creatAdmin() {
      let adminAuthorityReal = Boolean;
      if ((this.adminAuthority = "1")) {
        adminAuthorityReal = true;
      } else {
        adminAuthorityReal = false;
      }
      axios
        .post("/user/createUser", {
          adminName: this.adminName,
          adminAuthority: adminAuthorityReal,
          adminPwd: this.adminPwd
        })
        .then(response => {
          let res = response.data;
          if (res.status == 1) {
            confirm("注册失败1");
          } else if (res.status == 10001) {
            confirm("已有用户名");
          } else {
            axios
              .post("/admin/createAdmin", {
                fullAuthority: adminAuthorityReal,
                userType: 1
              })
              .then(response => {
                let res = response.data;
                if (res.status == 0) {
                  confirm("注册成功");
                  this.$router.push({
                    path:'/admin/companyInfo'
                  })
                } else {
                  confirm("注册失败2");
                }
              });
          }
        });
    },
    cancel(){
				this.$emit('cancelCreateAdmin');
			}
  }
};
</script>
