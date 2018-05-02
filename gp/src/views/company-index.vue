<template>
	<div>
		<company-header></company-header>
		<div class="container company-index">
			<div class="contain-body">
				<div class="company-info">
					<dl class="company-logo">
						<div class="title-wraper clearfix">
							<span class="company-title ">公司Logo</span>
							<span class="line "></span>
						</div>
						<div @click="LogoFlag = !LogoFlag" class="change-btn">
							<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						</div>
						<dd>
							<div v-if="!LogoFlag" class="photo-unchange">
								<img :src="companyLogo" />
							</div>
							<div v-if="LogoFlag" class="photo-changing">
								<a class="btn" @click="toggleShow">设置头像</a>
								<my-upload field="companyLogo" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" v-model="show" :width="300" :height="300" url="/upload/companyLogo" :params="data" img-format="png"></my-upload>
								<img :src="companyLogo">
							</div>
						</dd>
					</dl>
					<dl class="company-base-info">
						<div class="title-wraper clearfix">
							<span class="company-title">基本信息</span>
							<span class="line"></span>
						</div>
						<div @click="baseInfoFlag = !baseInfoFlag" class="change-btn">
							<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						</div>
						<div v-if="!baseInfoFlag" class="dl-wraper clearfix">
							<dl class="clearfix">
								<dt class="company-type"><span class="glyphicon glyphicon-th-large icon"></span>公司类型：</dt>
								<dd>{{baseInfo.companyType}}</dd>
							</dl>
							<dl class="clearfix">
								<dt class="company-count"><span class="glyphicon glyphicon-user icon"></span>公司人数：</dt>
								<dd>{{baseInfo.companyCount}}</dd>
							</dl>
							<dl class="clearfix">
								<dt class="company-count"><span class="glyphicon glyphicon-home icon"></span>公司官网：</dt>
								<dd>{{baseInfo.companyHref}}</dd>
							</dl>
							<dl class="clearfix">
								<dt class="company-loaction"><span class="glyphicon glyphicon-map-marker icon"></span>公司位置：</dt>
								<dd v-if="baseInfo.companyProvince">{{baseInfo.companyProvince}}·{{baseInfo.companyCity}}·{{baseInfo.companyArea}}</dd>
							</dl>
						</div>
						<div v-if="baseInfoFlag" class="normal-changing">
							<dl class="clearfix">
								<dt>公司类型：</dt>
								<dd>
									<select v-model="baseInfo.companyType" class="form-control">
										<option v-for="companyType in companyAllType" v-bind:value="companyType" :key="companyType">{{companyType}}</option>										
									</select>
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>公司人数：</dt>
								<dd>
									<input v-model="baseInfo.companyCount" class="form-control" type="text" name="" id="" value="" />
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>公司官网：</dt>
								<dd>
									<input v-model="baseInfo.companyHref" class="form-control" type="text" name="" id="" value="" />
								</dd>
							</dl>
							<dl class="clearfix">
								<dt>公司位置：</dt>
								<dd >
									<v-distpicker @selected="changeDistInfo" :province="baseInfo.companyProvince" :city="baseInfo.companyCity" :area="baseInfo.companyArea"></v-distpicker>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="changeCompanyInfo('companyBaseInfo',baseInfo)" class="btn btn-info" href="javascript:;">修改</a>
								<a @click="baseInfoFlag = !baseInfoFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dl>
					<dl class="company-label">
						<div class="title-wraper clearfix">
							<span class="company-title">公司标签</span>
							<span class="line"></span>
						</div>
						<div @click="labelFlag = !labelFlag" class="change-btn">
							<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						</div>
						<dd>
							<div v-if="!labelFlag" class="normal-unchange">
								<span v-for="label in labels" :key="label">{{label}}</span>
							</div>
							<div v-if="labelFlag" class="normal-changing">
								<h3>请输入公司类型：（标签之前请用+连接）</h3>
								<div>
									<textarea v-model="label" class="form-control" name="" rows="" cols=""></textarea>
								</div>
								<div class="btn-line">
									<a @click="changeCompanyInfo('companyLabel',label)" class="btn btn-info" href="javascript:;">确认修改</a>
									<a @click="labelFlag = !labelFlag" class="btn btn-default" href="javascript:;">取消</a>
								</div>
							</div>
						</dd>
					</dl>
					<dl class="company-production">
						<div class="title-wraper clearfix">
							<span class="company-title">公司产品</span>
							<span class="line"></span>
						</div>
						<div @click="productionFlag = !productionFlag" class="add-btn">
							<span><span class="glyphicon glyphicon-plus icon"></span>添加</span>
						</div>
						<dd>
							<ul class="kill-type">
								<li>
									<div v-for="production in productions" :key="production._id" class="clearfix">
										<div v-if="production.productionShow" class="company-production-unchange clearfix">
											<div class="img-part clearfix">
												<img v-bind:src="production.productionImg" />
											</div>
											<div class="production-introduce">
												<span>{{production.productionTitle}}</span>
												<p>
													{{production.productionIntroduce}}
												</p>
												<div @click="changeProduction(production)" class="change-btn">
													<span><span class="glyphicon glyphicon-pencil icon"></span>编辑</span>
												</div>
											</div>
										</div>
										<div v-if="!production.productionShow" class="company-production-changing clearfix">
											<div class="company-production-img clearfix" id="place-production-img">
												<vue-core-image-upload
												    class=""
												    inputOfFile="companyProduction"
												    cropRatio="16:9"
												    crop="local"
												    resize="local"
												    @imagechanged="changeInfoPI(production)"
												    :data="data"
												    @imageuploaded="changeProductionImg"
												    :max-file-size="5242880"
												    url="upload/changeProductionImg" >
													<img style="width: 300px; height: 180px;" :src="production.productionImg"/>
												</vue-core-image-upload>
											</div>
											<div class="company-production-introduce clearfix">
												<span>产品名称：</span>
												<input v-model="production.productionTitle" class="form-control" type="text" name="" id="" value="" />
												<span>产品简介：</span>
												<textarea v-model="production.productionIntroduce" class="form-control" name="" rows="" cols=""></textarea>
											</div>
											<input type="file" name="" id="upload-production-img" value="" />
											<div class="btn-line">
												<a @click="changeArrayInfo('_id',production._id,production)" class="btn btn-info" href="javascript:;">修改</a>
												<a @click="delArrayInfo(production._id)" class="btn btn-danger" href="javascript:;">删除</a>
												<a @click="unchangeProduction(production)" class="btn btn-default" href="javascript:;">取消</a>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div v-if="productionFlag" class="company-production-changing clearfix">
										<div class="company-production-img clearfix" id="place-production-img">
											<vue-core-image-upload
											    class=""
											    inputOfFile="companyProduction"
											    cropRatio="16:9"
											    crop="local"
											    @imageuploaded="addProductionImg"
											    :max-file-size="5242880"
											    url="upload/addProductionImg" >
											    <img style="width: 300px; height: 180px;" :src="production.productionImg"/>
											</vue-core-image-upload>
										</div>
										<div class="company-production-introduce clearfix">
											<span>产品名称：</span>
											<input v-model="production.productionTitle" class="form-control" type="text" name="" id="" value="" />
											<span>产品简介：</span>
											<textarea v-model="production.productionIntroduce" class="form-control" name="" rows="" cols=""></textarea>
										</div>
										<input type="file" name="" id="upload-production-img" value="" />
										<div class="btn-line">
											<a @click="addArrayInfo(production)" class="btn btn-info" href="javascript:;">确认添加</a>
											<a @click="productionFlag = !productionFlag" class="btn btn-default" href="javascript:;">取消</a>
										</div>
									</div>
								</li>
							</ul>
						</dd>
					</dl>
					<dl class="company-introduce">
						<div class="title-wraper clearfix">
							<span class="company-title">公司介绍</span>
							<span class="line"></span>
						</div>
						<div @click="introduceFlag = !introduceFlag" class="change-btn">
							<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						</div>
						<dd>
							<div v-if="!introduceFlag" class="company-introduce-unchange">
									<p v-for="onePra in introducePra" :key="onePra">{{onePra}}</p>
							</div>
							<div v-if="introduceFlag" class="company-introduce-changing">
								<textarea v-model="introduce" class="form-control" name="" rows="" cols=""></textarea>
								<div class="btn-line">
									<a @click="changeCompanyInfo('companyIntroduce',introduce)" class="btn btn-info" href="javascript:;">确认修改</a>
									<a @click="introduceFlag = !introduceFlag" class="btn btn-default" href="javascript:;">取消</a>
								</div>
							</div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
import CompanyHeader from "./../components/CompanyHeader";
import CommonFooter from "./../components/CommonFooter";
import "./../assets/css/bootstrap.min.css";
import "./../assets/css/common.css";
import "./../assets/css/style.css";
import axios from "axios";
import myUpload from "vue-image-crop-upload";
import VueCoreImageUpload from "vue-core-image-upload";
import VDistpicker from "v-distpicker";

export default {
  data() {
    return {
      companyAllInfo: {},
      labels: [],
      label: "",
      productions: [],
      production: {
        productionImg: "./../static/companyProduction/default.png",
        productionTitle: "",
        productionIntroduce: "",
        productionShow: true,
        imgName: ""
      },
      companyLogo: "",
      baseInfo: {
        companyType: "",
        companyCount: "",
        companyHref: "",
        companyProvince: "",
        companyCity: "",
        companyArea: ""
      },
      introduce: "",
      data: {
        id: "",
        name: "",
        del: ""
      },
      src: "",
      companyAllType: [],
      show: true,
      LogoFlag: false,
      baseInfoFlag: false,
      labelFlag: false,
      productionFlag: false,
      introduceFlag: false
    };
  },
  computed: {
    introducePra() {
      return this.introduce.split("\n");
    }
  },
  mounted() {
    this.init();
    this.getConf();
  },
  components: {
    CompanyHeader,
    CommonFooter,
    VDistpicker,
    "my-upload": myUpload,
    "vue-core-image-upload": VueCoreImageUpload
  },
  methods: {
    //查找cookie的方法
    getCookies(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    },
    init() {
      let userType = parseInt(this.getCookies("userType"));
      axios
        .post("/company/companyDetails", {
          userId: this.getCookies("userId")
        })
        .then(response => {
          let res = response.data;
          if (res.status == 0) {
            this.companyAllInfo = res.result;
            this.labels = this.companyAllInfo.companyInfo.companyLabel.split(
              "+"
            );
            this.companyLogo = this.companyAllInfo.companyInfo.companyLogo;
            this.productions = this.companyAllInfo.companyProduction;
            this.baseInfo = this.companyAllInfo.companyInfo.companyBaseInfo;
            this.label = this.companyAllInfo.companyInfo.companyLabel;
            this.introduce = this.companyAllInfo.companyInfo.companyIntroduce;
            this.data.id = this.getCookies("userId");
            this.data.name = "logo";
            //初始状态下数据都空，判断初始数据是否为空，为空即为用户第一次登录，填写用户信息
            if (this.companyLogo == "") {
              this.companyLogo = "./../static/studentProtrait/default.png";
            }
          }
        });
    },
    getConf() {
      axios.get("/conf/jobType").then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.companyAllType = res.result.companyType;
        }
      });
    },
    changeProduction(item) {
      this.companyAllInfo.companyProduction.forEach(onePiece => {
        if (onePiece._id == item._id) {
          onePiece.productionShow = false;
          this.data.name = onePiece._id;
        }
      });
    },
    unchangeProduction(item) {
      this.companyAllInfo.companyProduction.forEach(onePiece => {
        if (onePiece.productionTitle == item.productionTitle) {
          onePiece.productionShow = true;
        }
      });
    },
    changeCompanyInfo(filedName, changeContent) {
      axios
        .post("/company/changeCompanyInfo", {
          companyId: this.getCookies("userId"),
          filedName: filedName,
          changeContent: changeContent
        })
        .then(response => {
          let res = response.data;
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            this.$router.go(0);
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
              type: "warning"
            });
          }
        });
    },
    changeArrayInfo(changeName, changeId, changeContent) {
      changeContent.productionShow = true;
      let isFinish = true;
      for (let key in changeContent) {
        if (changeContent[key] == "") {
          isFinish = false;
        }
      }
      if (isFinish) {
        axios
          .post("/company/changeArrayInfo", {
            companyId: parseInt(this.getCookies("userId")),
            changeName: changeName,
            changeId: changeId,
            changeContent: changeContent
          })
          .then(response => {
            let res = response.data;
            if (res.status == 0) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.$router.go(0);
            } else {
              this.$message({
                showClose: true,
                message: "修改失败",
                type: "warning"
              });
            }
          });
      } else {
        changeContent.productionShow = false;
        this.$message({
          showClose: true,
          message: "请完善信息再进行提交操作",
          type: "warning"
        });
      }
    },
    addArrayInfo(changeContent) {
      let isFinish = true;
      for (let key in changeContent) {
        if (changeContent[key] == "") {
          isFinish = false;
        }
      }
      if (isFinish) {
        axios
          .post("/company/addArrayInfo", {
            companyId: parseInt(this.getCookies("userId")),
            changeContent: changeContent
          })
          .then(response => {
            let res = response.data;
            if (res.status == 0) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.$router.go(0);
            } else {
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "warning"
              });
            }
          });
      } else {
        this.$message({
          showClose: true,
          message: "请完善信息再进行提交操作",
          type: "warning"
        });
      }
    },
    delArrayInfo(id) {
      axios
        .post("/company/delArrayInfo", {
          companyId: parseInt(this.getCookies("userId")),
          id: id
        })
        .then(response => {
          let res = response.data;
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.$router.go(0);
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "warning"
            });
            this.$router.go(0);
          }
        });
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl;
      this.data.name = "logo";
    },
    cropUploadSuccess(jsonData, field) {
      let filedName = "companyLogo";
      let changeContent =
        "./../static/companylogo/" +
        this.data.id +
        "-" +
        this.data.name +
        ".png";
      this.changeCompanyInfo(filedName, changeContent);
    },
    addProductionImg(res) {
      let result = res.result;
      if (res.status == 0) {
        let imgUrl = "./../static/companyProduction/" + result.filename;
        this.production.imgName = result.filename;
        this.production.productionImg = imgUrl;
      }
    },
    changeProductionImg(res) {
      let result = res.result;
      if (res.status == 0) {
        let imgUrl =
          "./../static/companyProduction/" +
          this.data.id +
          "-" +
          this.data.name +
          ".png";
        this.production.imgName = result.filename;
        this.production.productionImg = imgUrl;
      }
    },
    changeInfoPI(production) {
      this.data.name = production._id;
      this.data.del = production.imgName;
      production.productionImg =
        "./../static/companyProduction/" +
        this.data.id +
        "-" +
        this.data.name +
        ".png";
    },
    //不知为何，只能通过选定事件来绑定数据
    changeDistInfo(data) {
      this.baseInfo.companyProvince = data.province.value;
      this.baseInfo.companyCity = data.city.value;
      this.baseInfo.companyArea = data.area.value;
    }
  }
};
</script>