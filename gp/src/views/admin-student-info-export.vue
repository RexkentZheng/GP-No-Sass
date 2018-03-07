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
                  初始入学年份：
                </dt>
                <dd>
                  <select v-model="choosen.startYear" class="form-control" name="" id="">
                    <option value="" selected>不做筛选</option>
                    <option v-for="oneYear in conf.allYears" :value="oneYear">{{oneYear}}</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  终止入学年份：
                </dt>
                <dd>
                  <select v-model="choosen.endYear" class="form-control" name="" id="">
                    <option value="">不做筛选</option>
                    <option v-for="oneYear in endYears" :value="oneYear">{{oneYear}}</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  性别：
                </dt>
                <dd>
                  <select v-model="choosen.sex" class="form-control" name="" id="">
                    <option value=''>不做筛选</option>
                    <option value="male">仅限男生</option>
                    <option value="female">仅限女生</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  学院：
                </dt>
                <dd>
                  <select v-model="choosen.college" class="form-control" name="" id="">
                    <option value="">不做筛选</option>
                    <option v-for="oneCollege in conf.allColleges" :value="oneCollege.levelName">{{oneCollege.levelName}}</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  专业：
                </dt>
                <dd>
                  <select class="form-control" name="" id="">
                    <option value="">不做筛选</option>
                    <option v-for="oneMajor in choosenMajor" :value="oneMajor">{{oneMajor}}</option>
                  </select>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>
                  学生籍贯：
                </dt>
                <dd>
                  <select v-model="choosen.place" class="form-control" name="" id="">
                    <option value="">不做筛选</option>
                    <option v-for="onePlace in conf.allPlaces" :value="onePlace">{{onePlace}}</option>
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
                    <input @click="checkToggle()" v-model="isCheckeAll" type="checkbox">
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
                <li v-for="op in studentCurrentInfo" class="clearfix">
                  <input @click="studentToggle(op.userId)" type="checkbox" v-model="op.isChecked">
                  <p>
                    {{op.personalInfo.studentName}}
                  </p>
                  <p>
                    {{op.personalInfo.studentNum}}
                  </p>
                </li>
              </ul>
            </div>
            <div class="block">
              <el-pagination
                small
                @current-change="changePage"
                :page-size="8"
                layout="total, prev, pager, next"
                :total=studentAllInfo.length>
              </el-pagination>
            </div>
          </div>
				</div>
        <div class="choose-tab-name">
          <p>
            选择需要输出的数据
          </p>
          <ul class="clearfix">
            <li>
              <input v-model="exportTitle.studentName" type="checkbox">
              学生姓名
            </li>
            <li>
              <input v-model="exportTitle.studentSex" type="checkbox">
              学生性别
            </li>
            <li>
              <input v-model="exportTitle.studentNum" type="checkbox">
              学生学号
            </li>
            <li>
              <input v-model="exportTitle.studentMajor" type="checkbox">
              学生专业
            </li>
            <li>
              <input type="checkbox">
              学生学院
            </li>
          </ul>
        </div>
        <div class="choose-tab-name">
          <ul class="clearfix">
            <li>
              <input type="checkbox">
              学生籍贯
            </li>
            <li>
              <input type="checkbox">
              学生电话
            </li>
            <li>
              <input type="checkbox">
              是否就业
            </li>
            <li>
              <input type="checkbox">
              导师信息
            </li>
            <li>
              <input type="checkbox">
              论文标题
            </li>
          </ul>
        </div>
        <div class="export-btn">
            <a @click="getStudentInfo()" class="btn btn-default" href="javascript:;">查看数据</a>
            <a @click="exportStudentInfo()" class="btn btn-info" href="javascript:;">确认导出</a>
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
      fileList: [],
      conf:{
        allYears:[],
        allPlaces:[],
        allColleges:[],
        allMajors:[],
        allComparison:[]
      },
      choosen:{
        startYear:'',
        endYear:'',
        place:'',
        college:'',
        sex:''
      },
      exportTitle:{
        studentName:false,
        studentSex:false,
        studentNum:false,
        studentMajor:false
      },
      isCheckeAll:false,
      studentAllInfo:[],
      studentGroupedInfo:[],
      studentCurrentInfo:[]
    };
  },
  mounted() {
    this.getConf();
  },
  computed:{
    choosenMajor(){
      let nowArr = []
      this.conf.allColleges.forEach((oneCollege) => {
        if(this.choosen.college !== ''){
          if (this.choosen.college == oneCollege.levelName) {
            nowArr = oneCollege.secondLevel
          }
        }
      })
      return nowArr
    },
    endYears(){
      let nowArr = []
      this.conf.allYears.forEach((oneYear) => {
        if(this.choosen.startYear !== ''){
          if (parseInt(oneYear) >= parseInt(this.choosen.startYear) ) {
            nowArr.push(parseInt(oneYear))
          }
        }
      })
      return nowArr
    }
  },
  components: {
    AdminHeader,
    CommonFooter
  },
  methods: {
    getConf() {
      axios.get("/conf/jobType").then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.conf.allYears = res.result.filterExport.years;
          this.conf.allPlaces = res.result.filterExport.nativePlace;
          this.conf.allColleges = res.result.filterExport.majors;
          this.conf.allComparison = res.result.comparison;
        } else {
          console.log("没有获取到筛选条件");
        }
      });
    },
    getStudentInfo(){
      if (this.choosen.startYear !== '' && this.choosen.endYear !== '' && parseInt(this.choosen.startYear) > parseInt(this.choosen.endYear)) {
        alert('初始入学年份必须小于等于终止入学年份');
      } else if(this.choosen.startYear == '' && this.choosen.endYear !== ''){
        alert('不可只有终止入学年份');
      }else{
          axios.post("/student/exportInfo",{
            choosen:this.choosen
          }).then(response =>{
            let res = response.data;
            if (res.status == 0) {
              this.studentAllInfo = res.result;
              //添加checked属性
              this.studentAllInfo.forEach((oneStudent)=>{
                oneStudent.isChecked = false;
              })
              this.studentGroupedInfo = []
              for(var i=0,len=res.result.length;i<len;i+=8){
                this.studentGroupedInfo.push(res.result.slice(i,i+8));
              }
              this.studentCurrentInfo = this.studentGroupedInfo[0];
            }
          })
      }
    },
    changePage(val){
      this.studentCurrentInfo = this.studentGroupedInfo[''+(val-1)+'']
    },
    studentToggle(userId){
      this.studentAllInfo.forEach((oneStudent)=>{
        if(oneStudent.userId == userId)
        oneStudent.isChecked = !oneStudent.isChecked;
      })
    },
    checkToggle(){
      this.studentAllInfo.forEach((oneStudent)=>{
        oneStudent.isChecked = !this.isCheckeAll;
      })
      this.studentGroupedInfo = []
      for(var i=0,len=this.studentAllInfo.length;i<len;i+=8){
        this.studentGroupedInfo.push(this.studentAllInfo.slice(i,i+8));
      }
      this.studentCurrentInfo = this.studentGroupedInfo[0];
    },
    exportStudentInfo(){
      let checkedInfo = [];
      let titleInfo = [];
      let isNone = true;
      for (let key in this.exportTitle){
        if(this.exportTitle[key]){
          this.conf.allComparison.forEach((op)=>{
            if(op.englishName == key){
              titleInfo.push(op);
            }
          })
          isNone = false;
        }
      }
      if (!isNone) {
        this.studentAllInfo.forEach((oneStudent)=>{
          if(oneStudent.isChecked){
            checkedInfo.push(oneStudent);
          }
        });
        console.log(checkedInfo);
        axios.post('export/studentInfo',{
          studentInfo:checkedInfo,
          titleInfo:titleInfo
        }).then((response)=>{
          let res = response.data;
          if (res.status == 0) {
            setTimeout(() => {
              this.download(res.result);
            }, 1000);
          }else{
            alert('导出失败')
          }
        })       
      }else{
        alert('输出数据不能为空')
      }
    },
    download(fileName) {
      window.location.href =
        "http://127.0.0.1:8888/export/download?dir=excel&name=" +
        fileName+
        ".xlsx";
    }
  }
};
</script>
