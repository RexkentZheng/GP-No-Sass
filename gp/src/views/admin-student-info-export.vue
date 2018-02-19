<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-export-student">
			<div class="contain-body">
				<div class="student-info-title clearfix">
					<ul>
						<li>
							<router-link to='/admin/studentInfo/'>添加用户</router-link>
						</li>
						<li >
							<router-link to='/admin/studentInfo/search'>查找用户</router-link>
						</li>
						<li class="active">
							<router-link to='/admin/studentInfo/export'>输出用户</router-link>
						</li>
					</ul>
				</div>
				<div class="student-export-content clearfix">
					<div class="condition-part">
            <p class="condition-name">
              条件筛选
            </p>
            <div class="condition-content">
              <dl class="clearfix">
                <dt>
                  条件名称：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  条件名称：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  条件名称：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  条件名称：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  条件名称：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                    <option value="">条件内容</option>
                  </select>
                </dd>
              </dl>
            </div>
          </div>
          <div class="result-part">
            <p class="result-name">
              结果展示
            </p>
            <div class="result-content">
              <ul class="tab-name">
                <li class="clearfix">
                  <p>
                    <input type="checkbox">
                  </p>
                  <p>
                    全选
                  </p>
                  <p>
                    学生姓名
                  </p>
                  <p>
                    学生学号
                  </p>
                </li>
              </ul>
              <ul class="tab-content">
                <li class="clearfix">
                  <input type="checkbox">
                  <p>
                    测试姓名
                  </p>
                  <p>
                    20130123010320
                  </p>
                </li>
              </ul>
            </div>
          </div>
				</div>
        <div class="choose-tab-name">
          <p>
            选择需要输出的数据
          </p>
          <ul class="clearfix">
            <li>
              <input type="checkbox">
              <p>学生姓名</p> 
            </li>
            <li>
              <input type="checkbox">
              学生姓名
            </li>
            <li>
              <input type="checkbox">
              学生姓名
            </li>
            <li>
              <input type="checkbox">
              学生姓名
            </li>
            <li>
              <input type="checkbox">
              学生姓名
            </li>
          </ul>
        </div>
        <div class="export-btn">
            <a class="btn btn-info" href="javascript:;">确认导出</a>
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
  methods: {}
};
</script>
