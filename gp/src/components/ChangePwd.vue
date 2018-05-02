<template>
	<div v-if="isPasswordShow" class="password-part">
		<ul>
			<li>
				<dl class="clearfix">
					<dt>旧密码：</dt>
					<dd>
						<input v-model="oldPassword" class="form-control" type="password" name="" id="" value="" />
					</dd>
				</dl>
			</li>
			<li>
				<dl class="clearfix">
					<dt>新密码：</dt>
					<dd>
						<input v-model="newPasswordFirst" class="form-control" type="password" name="" id="" value="" />
					</dd>
				</dl>
			</li>
			<li>
				<span v-if="passwordLength < 6 || passwordLength > 16" class="error-tips">请输入6-16位密码，字母区分大小写</span>
			</li>
			<li>
				<dl class="clearfix">
					<dt>确认密码：</dt>
					<dd>
						<input @blur="loseBlur" v-model="newPasswordSecond" class="form-control" type="password" name="" id="" value="" />
					</dd>
				</dl>
			</li>
			<li>
				<span v-if="!isPasswordSame" class="error-tips">两次输入的密码不一致</span>
			</li>
			<li>
				<div class="btn-part">
					<a @click="submitPassword" class='btn btn-info'>确定</a>
					<!--这里是将cancelSubmitPwd这个方法传递给父组件，在父组件上有标注这个方法意味着什么-->
					<a @click="$emit('cancelSubmitPwd')" class='btn btn-default'>取消</a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		props:['isPasswordShow'],
		data() {
			return {
				oldPassword: '',
				newPasswordFirst: '',
				newPasswordSecond: '',
				isPasswordSame: true,
			}
		},
		mounted() {
		},
		computed: {
			passwordLength() {
				if(this.newPasswordFirst) {
					return this.newPasswordFirst.split('').length
				}
			}
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
			submitPassword() {
				if(this.isPasswordSame) {
					if(this.oldPassword) {
						if(this.newPasswordFirst) {
							if(this.newPasswordSecond) {
								if (this.newPasswordFirst !== this.oldPassword) {
									axios.post('/user/changePassword', {
										userId: this.getCookies('userId'),
										oldPassword: this.oldPassword,
										newPassword: this.newPasswordFirst
									}).then((response) => {
										let res = response.data;
										if(res.status == 0) {
											this.$message({
												showClose: true,
												message: '修改成功',
												type: 'success'
											});
											document.getElementById('logOut').click();
										} else if(res.status == 1001) {
											this.$message({
												showClose: true,
												message: res.msg,
												type: 'warning'
											});
										} else {
											this.$message({
												showClose: true,
												message: '修改失败',
												type: 'warning'
											});
											this.$router.go(0);
										}
									})
								} else{
									this.$message({
										showClose: true,
										message: '新旧密码不能相同',
										type: 'warning'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: '请确认新密码',
									type: 'warning'
								});
							}
						} else {
							this.$message({
								showClose: true,
								message: '请输入新密码',
								type: 'warning'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: '请输入旧密码',
							type: 'warning'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '请输入一致新密码之后再进行提交',
						type: 'warning'
					});
				}
			},
			loseBlur() {
				if(this.newPasswordFirst == this.newPasswordSecond) {
					this.isPasswordSame = true;
				} else {
					this.isPasswordSame = false;
				}
			},
			cancel(){
				this.$emit('cancelSubmitPwd');
			}
		}
	}
</script>

<style>

</style>