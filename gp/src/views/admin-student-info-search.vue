<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-create-student">
			<div class="contain-body">
				<div class="student-info-title clearfix">
					<ul>
						<li>
							<router-link to='/admin/studentInfo/'>添加用户</router-link>
						</li>
						<li class="active">
							<router-link to='/admin/studentInfo/search'>查找用户</router-link>
						</li>
						<li >
							<router-link to='/admin/studentInfo/export'>输出用户</router-link>
						</li>
					</ul>
				</div>
				<div class="student-info-content">

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
      
    };
  },
  mounted() {},
  components: {
    AdminHeader,
    CommonFooter
  },
  methods: {
    
  }
};
</script>
