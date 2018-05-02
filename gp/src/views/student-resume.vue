<template>
	<div>
		<student-header></student-header>
		<div class="container student-resume">
			<div class="contain-body clearfix">
				<dl class="student-img clearfix">
					<dt>照片</dt>
					<span class="line"></span>
					<div @click="portraitFlag = !portraitFlag" class="add-btn">
						<span ><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
					</div>
					<dd>
						<div v-if="!portraitFlag" class="photo-unchange">
							<img :src="imgDataUrl">
						</div>
						<div v-if="portraitFlag" class="photo-changing">
							<a class="btn" @click="toggleShow">设置头像</a>
							<my-upload field="studentProtrait" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" v-model="show" :width="300" :height="300" url="/upload/studentProtrait" :params="data"  img-format="png"></my-upload>
							<img :src="imgDataUrl">
						</div>
					</dd>
				</dl>
				<dl class="student-tel clearfix">
					<dt>电话</dt>
					<span class="line"></span>
					<div @click="telFlag = !telFlag" class="add-btn">
						<span v-if="tel"><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						<span v-if="!tel"><span class="glyphicon glyphicon-plus icon"></span>添加</span>
					</div>
					<dd>
						<div v-if="!telFlag" class="phone-unchange">
							<span>{{tel}}</span>
						</div>
						<div v-if="telFlag" class="phone-changing clearfix">
							<dl class="clearfix">
								<dt>电话：</dt>
								<dd>
									<input @blur="isTelRight" v-model="tel" class="form-control" type="text" name="" id="" value="" placeholder="请输入电话" />
								</dd>
							</dl>
							<dl v-if="telTip" class="clearfix tips">
								<dt>&nbsp;</dt>
								<dd>
									<span class="error-tip">请输入正确电话</span>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="changeBaseInfo('tel',tel)" v-bind:class="{'disabled':telTip}" class="btn btn-info" href="javascript:;">确认</a>
								<a @click="telFlag = !telFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dd>
				</dl>
				<dl class="student-tel clearfix">
					<dt>邮箱</dt>
					<span class="line"></span>
					<div @click="emailFlag = !emailFlag" class="add-btn">
						<span v-if="email"><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						<span v-if="!email"><span class="glyphicon glyphicon-plus icon"></span>添加</span>
					</div>
					<dd>
						<div v-if="!emailFlag" class="phone-unchange">
							<span>{{email}}</span>
						</div>
						<div v-if="emailFlag" class="phone-changing clearfix">
							<dl class="clearfix">
								<dt>邮箱：</dt>
								<dd>
									<input @blur="isEmailRight" v-model="email" class="form-control" type="text" name="" id="" value="" placeholder="请输入邮箱" />
								</dd>
							</dl>
							<dl v-if="emailTip" class="clearfix tips">
								<dt>&nbsp;</dt>
								<dd>
									<span class="error-tip">请输入正确邮箱</span>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="changeBaseInfo('email',email)" v-bind:class="{'disabled':emailTip}" class="btn btn-info" href="javascript:;">确认</a>
								<a @click="emailFlag = !emailFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dd>
				</dl>
				<dl class="student-wrok clearfix">
					<dt>个人作品</dt>
					<span class="line"></span>
					<div @click="workFlag = !workFlag" class="add-btn">
						<span><span class="glyphicon glyphicon-plus icon "></span>添加</span>
					</div>
					<dd>
						<div v-for="onePiece in workInfo" class="work-introduce">
							<div v-if="onePiece.isShow" class="one-piece">
								<div v-if="" @click="onePiece.isShow = !onePiece.isShow" class="change-btn">
									<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
								</div>
								<dl class="work-name clearfix">
									<dt>作品名称：</dt>
									<dd>{{onePiece.workName}}</dd>
								</dl>
								<dl class="work-discription clearfix">
									<dt>作品描述：</dt>
									<dd>{{onePiece.workDescription}}</dd>
								</dl>
								<dl class="work-link clearfix">
									<dt>作品链接：</dt>
									<dd>{{onePiece.workLink}}</dd>
								</dl>
							</div>
							<div v-if="!onePiece.isShow" class="one-piece-change">
								<dl class="work-name clearfix">
									<dt>作品名称：</dt>
									<dd>
										<input v-model="onePiece.workName" class="form-control" type="text" name="" id="" value="" placeholder="请输入作品名称" />
									</dd>
								</dl>
								<dl class="work-discription clearfix">
									<dt>作品描述：</dt>
									<dd>
										<textarea v-model="onePiece.workDescription" class="form-control" name="" rows="" cols="" placeholder="请输入作品描述"></textarea>
									</dd>
								</dl>
								<dl class="work-link clearfix">
									<dt>作品链接：</dt>
									<dd>
										<input v-model="onePiece.workLink" class="form-control" type="text" name="" id="" value="" placeholder="请输入作品链接" />
									</dd>
								</dl>
								<div class="btn-line">
									<a @click="changeArrayInfo('worksInfo','_id',onePiece._id,onePiece)" class="btn btn-info" href="javascript:;">修改</a>
									<a @click="delArrayInfo('worksInfo',onePiece._id)" class="btn btn-danger" href="javascript:;">删除</a>
									<a @click="onePiece.isShow = !onePiece.isShow" class="btn btn-default" href="javascript:;">取消</a>
								</div>
							</div>
						</div>
						<div v-if="workFlag" class="one-piece-add">
							<dl class="work-name clearfix">
								<dt>作品名称：</dt>
								<dd>
									<input v-model="onePieceWork.workName" class="form-control" type="text" name="" id="" value="" placeholder="请输入作品名称" />
								</dd>
							</dl>
							<dl class="work-discription clearfix">
								<dt>作品描述：</dt>
								<dd>
									<textarea v-model="onePieceWork.workDescription" class="form-control" name="" rows="" cols="" placeholder="请输入作品描述"></textarea>
								</dd>
							</dl>
							<dl class="work-link clearfix">
								<dt>作品链接：</dt>
								<dd>
									<input v-model="onePieceWork.workLink" class="form-control" type="text" name="" id="" value="" placeholder="请输入作品链接" />
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="addArrayInfo('worksInfo',onePieceWork)" class="btn btn-info" href="javascript:;">确认添加</a>
								<a @click="workFlag = !workFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dd>
				</dl>
				<dl class="student-introduce clearfix">
					<dt>个人简介</dt>
					<span class="line"></span>
					<div @click="introduceFlag = !introduceFlag" class="change-btn">
						<span v-if="introduce"><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
						<span v-if="!introduce"><span class="glyphicon glyphicon-plus icon"></span>添加</span>
					</div>
					<dd>
						<div v-if="!introduceFlag" class="introduce-unchange">
							<span>{{introduce}}</span>
						</div>
						<div v-if="introduceFlag" class="introduce-changing">
							<dl class="clearfix">
								<dt>个人简介：</dt>
								<dd>
									<textarea v-model="introduce" class="form-control" name="" rows="" cols="" placeholder="请输入个人简介"></textarea>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="changeBaseInfo('introduce',introduce)" class="btn btn-info" href="javascript:;">确认修改</a>
								<a @click="introduceFlag = !introduceFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dd>
				</dl>
				<dl class="student-experience clearfix">
					<dt>实习经历</dt>
					<span class="line"></span>
					<div @click="IntershipFlag = !IntershipFlag" class="add-btn">
						<span><span class="glyphicon glyphicon-plus icon"></span>添加</span>
					</div>
					<dd>
						<div v-for="onePiece in intershipInfo" class="experience-introduce">
							<div v-if="onePiece.isShow" class="one-piece">
								<div @click="onePiece.isShow = false" class="change-btn">
									<span><span class="glyphicon glyphicon-pencil icon"></span>修改</span>
								</div>
								<dl class="experience-name clearfix">
									<dt>公司名称：</dt>
									<dd>{{onePiece.companyName}}</dd>
								</dl>
								<dl class="experience-time clearfix">
									<dt>实习时间：</dt>
									<dd>{{onePiece.intershipStartTime}}  &nbsp;到&nbsp;    {{onePiece.intershipEndTime}}</dd>
								</dl>
								<dl class="experience-content clearfix">
									<dt>实习内容：</dt>
									<dd>{{onePiece.intershipIntroduce}}</dd>
								</dl>
							</div>
							<div v-if="!onePiece.isShow" class="one-piece-change">
								<dl class="experience-name clearfix">
									<dt>公司名称：</dt>
									<dd>
										<input v-model="onePiece.companyName" class="form-control" type="text" name="" id="" value="" placeholder="请输入公司名称" />
									</dd>
								</dl>
								<dl class="experience-time clearfix jedate-part">
									<dt>实习时间：</dt>
									<dd>
										<dl class="start-date clearfix">
											<dt>开始时间：</dt>
											<dd>
												<date-picker field="send-invitation" placeholder="选择日期" v-model="onePiece.intershipStartTime" format="yyyy-mm-dd" :backward="true" :no-today="false" :forward="false"></date-picker>
											</dd>
										</dl>
										<dl class="end-date clearfix">
											<dt>结束时间：</dt>
											<dd>
												<date-picker field="send-invitation" placeholder="选择日期" v-model="onePiece.intershipEndTime" format="yyyy-mm-dd" :backward="true" :no-today="false" :forward="false"></date-picker>
											</dd>
										</dl>
									</dd>
								</dl>
								<dl class="experience-content clearfix">
									<dt>实习内容：</dt>
									<dd>
										<textarea v-model="onePiece.intershipIntroduce" class="form-control" name="" rows="" cols="" placeholder="请输入实习描述"></textarea>
									</dd>
								</dl>
								<div class="btn-line">
									<a @click="changeArrayInfo('intershipInfo','_id',onePiece._id,onePiece)" class="btn btn-info" href="javascript:;">修改</a>
									<a @click="delArrayInfo('intershipInfo',onePiece._id)" class="btn btn-danger" href="javascript:;">删除</a>
									<a @click="onePiece.isShow = true" class="btn btn-default" href="javascript:;">取消</a>
								</div>
							</div>
						</div>
						<div v-if="IntershipFlag" class="one-piece-add">
							<dl class="work-name clearfix">
								<dt>公司名称：</dt>
								<dd>
									<input v-model="onePieceIntership.companyName" class="form-control" type="text" name="" id="" value="" placeholder="请输入公司名称" />
								</dd>
							</dl>
							<dl class="work-discription clearfix jedate-part">
								<dt>实习时间：</dt>
								<dd>
									<dl class="start-date clearfix">
										<dt>开始时间：</dt>
										<dd>
											<date-picker v-model="onePieceIntership.intershipStartTime"  field="send-invitation" placeholder="选择日期"  format="yyyy-mm-dd" :backward="true" :no-today="false" :forward="false"></date-picker>
										</dd>
									</dl>
									<dl class="end-date clearfix">
										<dt>结束时间：</dt>
										<dd>
											<date-picker v-model="onePieceIntership.intershipEndTime" field="send-invitation" placeholder="选择日期"  format="yyyy-mm-dd" :backward="true" :no-today="false" :forward="false"></date-picker>
										</dd>
									</dl>
								</dd>
							</dl>
							<dl class="work-link clearfix">
								<dt>实习内容：</dt>
								<dd>
									<textarea v-model="onePieceIntership.intershipIntroduce" class="form-control" name="" rows="" cols="" placeholder="请输入实习描述"></textarea>
								</dd>
							</dl>
							<div class="btn-line">
								<a @click="addArrayInfo('intershipInfo',onePieceIntership)" class="btn btn-info" href="javascript:;">添加</a>
								<a @click="IntershipFlag = !IntershipFlag" class="btn btn-default" href="javascript:;">取消</a>
							</div>
						</div>
					</dd>
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
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'
	import myUpload from 'vue-image-crop-upload'

	export default {
		data() {
			return {
				studentAllInfo: {},
				tel: '',
				email: '',
				introduce: '',
				workInfo: [],
				intershipInfo: [],
				onePieceWork:{
					workName:'',
					workDescription:'',
					workLink:'',
					isShow:true
				},
				onePieceIntership:{
					companyName:'',
					intershipStartTime:'',
					intershipEndTime:'',
					intershipIntroduce:'',
					isShow:true
				},
				portraitFlag: false,
				emailFlag: false,
				telFlag: false,
				workFlag: false,
				introduceFlag: false,
				IntershipFlag: false,
				data:{
					id:'',
					name:''
				},
				imgDataUrl:'./../static/studentProtrait/default.png',
				show: true,
				telTip:false,
				emailTip:false,
			}
		},
		components: {
			StudentHeader,
			CommonFooter,
			'date-picker': myDatepicker,
			'my-upload': myUpload
		},
		mounted() {
			this.init();
		},
		methods: {
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
			init() {
				axios.post('/student/studentDetails', {
					userId: this.getCookies('userId')
				}).then((response) => {
					let res = response.data;
					if(res.status == 0) {
						let studentAllInfo = res.result;
						this.imgDataUrl = studentAllInfo.resumetInfo.pic;
						this.tel = studentAllInfo.resumetInfo.tel;
						this.email = studentAllInfo.resumetInfo.email;
						this.introduce = studentAllInfo.resumetInfo.introduce;
						this.workInfo = studentAllInfo.resumetInfo.worksInfo;
						this.intershipInfo = studentAllInfo.resumetInfo.intershipInfo;
						this.data.id = this.getCookies('userId');
						this.data.name = 'student';
						if (!this.imgDataUrl) {
							this.imgDataUrl = './../static/studentProtrait/default.png'
						}
					}
				})
			},
			changeBaseInfo(filedName,changeContent){
				axios.post('/student/changeBaseInfo',{
					studentId:parseInt(this.getCookies('userId')),
					filedName:filedName,
					changeContent:changeContent
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.$message({
							showClose: true,
							message: '修改成功',
							type: 'success'
						});
						this.$router.go(0);
					}else{
						this.$message({
							showClose: true,
							message: '修改失败',
							type: 'warning'
						});
					}
				})
			},
			changeArrayInfo(filedName,changeName,changeId,changeContent){
				//判断是否有空数据
				let isFinish = true;
				for (let key in changeContent) {
					if (key != 'isShow') {
						if (changeContent[key] == '') {
							isFinish = false;
						}
					}
				}
				if (isFinish == true) {
					changeContent.isShow = true;
					axios.post('/student/changeArrayInfo',{
						studentId:parseInt(this.getCookies('userId')),
						filedName:filedName,
						changeName:changeName,
						changeId:changeId,
						changeContent:changeContent
					}).then((response)=>{
						let res = response.data;
						if (res.status == 0) {
							this.$message({
								showClose: true,
								message: '修改成功',
								type: 'success'
							});
							this.$router.go(0);
						}else{
							this.$message({
								showClose: true,
								message: '修改失败',
								type: 'warning'
							});
						}
					})
				}else{
					this.$message({
						showClose: true,
						message: '请完善信息后再提交',
						type: 'warning'
					});
				}
			},
			addArrayInfo(filedName,changeContent){
				let isFinish = true;
				for (let key in changeContent) {
					if (changeContent[key] == ''){
						isFinish = false;
					}
				}
				if (isFinish == true) {
					axios.post('/student/addArrayInfo',{
						studentId:parseInt(this.getCookies('userId')),
						filedName:filedName,
						changeContent:changeContent
					}).then((response)=>{
						let res = response.data;
						if (res.status == 0) {
							this.$message({
								showClose: true,
								message: '添加成功',
								type: 'success'
							});
							this.$router.go(0);
						}else{
							this.$message({
								showClose: true,
								message: '添加失败',
								type: 'warning'
							});
						}
					})
				} else{
					this.$message({
						showClose: true,
						message: '请完善信息后再提交',
						type: 'warning'
					});
				}
			},
			toggleShow() {
          this.show = !this.show;
      },
      cropSuccess(imgDataUrl, field){
          this.imgDataUrl = imgDataUrl;
      },
			cropUploadSuccess(jsonData, field) {
				axios.post('/student/changeBaseInfo',{
					studentId:this.getCookies('userId'),
					filedName:'pic',
					changeContent:'./../static/studentProtrait/'+this.data.id+'-'+this.data.name+'.png'
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.$message({
							showClose: true,
							message: '添加成功',
							type: 'success'
						});
					}else{
						this.$message({
							showClose: true,
							message: '添加失败！',
							type: 'warning'
						});
					}
				})
			},
			delArrayInfo(filedName,id){
				axios.post('/student/delArrayInfo',{
					studentId:parseInt(this.getCookies('userId')),
					filedName:filedName,
					id:id
				}).then((response)=>{
					let res = response.data;
					if (res.status == 0) {
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						});
						this.$router.go(0);
					}else{
						this.$message({
							showClose: true,
							message: '删除失败',
							type: 'warning'
						});
					}
				})
			},
			isTelRight(){
				if (this.tel.split('').length != 11) {
					this.telTip = true;
				}else{
					this.telTip = false;
				}
			},
			isEmailRight(){
				//正则验证邮箱
				let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
				if (reg.test(this.email)) {
					this.emailTip = false;
				}else{
					this.emailTip = true;
				}
			},
		}
	}
</script>

<style>

</style>