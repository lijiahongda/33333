<template>
	<div class="login-container">
		<!-- swiper -->
		<span class="logo">
      <img src="../../assets/logo.jpg" alt/>
    </span>
		<div class="swiper">
			<el-carousel :interval="5000" :height="swiperHeight" arrow="always">
				<el-carousel-item>
					<img src="../../assets/swiperBack/back.jpeg" alt/>
				</el-carousel-item>
				<!--<el-carousel-item>
					<img src="../../assets/swiperBack/back1.jpeg" alt/>
				</el-carousel-item>-->
				<el-carousel-item>
					<img src="../../assets/swiperBack/back2.jpg" alt/>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- swiper -->
		<el-form
			id="loginForm"
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">{{ $t('login.title') }}</h3>
				<lang-select class="set-language"/>
			</div>

			<el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
				<el-input v-model="loginForm.adminUserName" :placeholder="$t('login.adminUserName')" name="adminUserName" type="text"
						  auto-complete="on" />
			</el-form-item>

			<el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
				<el-input :type="passwordType" v-model="loginForm.pwd" :placeholder="$t('login.pwd')" name="pwd"
						  auto-complete="on" @keyup.enter.native="handleLogin" />
				<span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
			</el-form-item>

			<el-button
				:loading="loading"
				type="primary"
				style="width:100%;height: 47px;;margin-bottom:30px;"
				@click.native.prevent="handleLogin"
			>{{ $t('login.logIn') }}
			</el-button>
			<el-button
				:loading="loading"
				@click="dialogFormVisible=true"
				style="width:100%;height: 47px;margin-bottom:30px;margin-left: 0;"
			>注册
			</el-button>
		</el-form>
		<el-dialog title="注册账号"  id="register" :visible.sync="dialogFormVisible"  style="height: 70%" @close="clearData">
			<el-form :model="registerFrom" >
				<el-form-item label="手机号" label-width="100px">
					<el-input v-model="registerFrom.mobile" autocomplete="off"  maxlength="11" clearable placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="100px">
					<el-input v-model="registerFrom.password" autocomplete="off"  clearable placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item  label="验证码" label-width="100px">
					<el-input  style="width: 150px" v-model="registerFrom.mobileCode" autocomplete="off" placeholder="请输入验证码" clearable></el-input>
					<span class="vCode-btn-text" id="vCodeBtn" @click="blueText">{{innerText}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="register">确 定</el-button>
			</div>
		</el-dialog>
		<div id="c1" style="z-index:3000"></div>
	</div>
</template>

<script>
  import {
    isvalidUsername
  } from '@/utils/validate'
  import {
    sendMessage,
    register
  } from '@/api/robot'
  import store from '@/store'
  import LangSelect from '@/components/LangSelect'
  import SocialSign from './socialsignin'
  import md5 from 'js-md5'
  import _ from 'lodash'
  import Captcha from '@/utils/captcha-ui'
  export default {
    name: 'Login',
    components: {
      LangSelect,
      SocialSign
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        // if (value.length == 11) {
        callback()
        // } else {
        // 	callback(new Error('请输入正确的用户名'))
        // }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          adminUserName: '',
          pwd: ''
        },
        innerText: '获取验证码',
        wait: 60,
        registerFrom:{},
        dialogFormVisible:false,
        loginRules: {
          adminUserName: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          pwd: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        swiperHeight: '', // swiper高度
        redirect: undefined,
        myCaptchaToken: 0,
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    computed: {
      name() {
        return store.getters.name
      }
    },
    mounted(){
      let that = this;
      this.myCaptcha = _dx.Captcha(document.getElementById('c1'), {
        appId: '22670a97d0ee5e5621e76ad732effce9',   //appId,开通服务后可在控制台中“服务管理”模块获取
        success: function (token) {
          console.log('token:', token)
          that.myCaptchaToken = token
          console.log('验证成功的时候掉一次')
          that.sendMessage() //获取验证码
          that.myCaptcha.hide()
        },
        fail: function (err) {
          console.log(err)
        },
        // width: '750',
        language: localStorage.getItem('language'),
        style: 'popup',
        inlineFloatPosition: 'up'
      })
	},
    created() {
      // 获取页面高度-swiper自适应高度
      this.swiperHeight = document.body.clientHeight + 'px'
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    methods: {
      myCaptchaButton: function () {
        this.myCaptcha.reload()
        this.myCaptcha.show()
      },
      clearData(){
        this.myCaptcha.reload()
        this.myCaptcha.hide()
        this.dialogFormVisible = false;
        this.registerFrom = {}
	  },
      register(){
        let obj = {...this.registerFrom}
        obj.password = md5(obj.password)
        register(obj).then(res=>{
          console.log(res,'res')
          if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.dialogFormVisible = false;
          }else{
            this.$message.error(res.data.msg)
          }
		})
	  },
      time() {
        let that = this
        if (this.wait == 0) {
          this.innerText = "获取验证码";
          console.log('-----++++++=====')
          this.wait = 59;
        } else {
          this.innerText = this.wait+'s后再发';
          this.wait--;
          setTimeout(function () {
            that.time()
          }, 1000)
        }
      },
      blueText() {
        if (!/^1[3456789]\d{9}$/.test(this.registerFrom.mobile)) {
          this.$message.warning("请输入正确手机号");
          this.registerFrom.mobile = "";
        }else{
          console.log(this.wait,'wait')
          if(this.wait==60) this.sendMessage()
		}
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      sendMessage(){
        if(this.registerFrom.mobile!=''){
          sendMessage({mobile: this.registerFrom.mobile,imgToken:this.myCaptchaToken}).then(res=>{
            if(res.data.code==200){
              // this.time()
              this.$message.success(res.data.msg)
              var dao=setInterval(() => {
                console.log(this.wait)
                if(this.wait<=1){
                  clearInterval(dao)
                  this.wait=60;
                  this.innerText = "获取验证码";
                }else{
                  this.innerText = this.wait+'s后再发';
                  this.wait--
				}
              },1000)

              this.myCaptcha.hide()
            }else{
              // this.$message.error(res.data.msg)
              this.myCaptchaButton()
              // this.myCaptcha.show()
            }

          })
		}else{
          this.$message.warning('请输入手机号');
		}

	  },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            var obj = _.clone(this.loginForm)
            obj.pwd = md5(obj.pwd)

            var loginObj = {
              mobile: obj.adminUserName,
              password: obj.pwd
            }
            // console.log(loginObj);return


            this.$store.dispatch('LoginByUsername', loginObj).then((res) => {
              this.loading = false
              this.$router.push({
                  path: this.redirect || '/main/index'
                })
                location.reload()

            }).catch((err) => {
              this.loading = false
              this.$message({
                type: 'error',
                message: err.data.msg || '用户信息有误'
              })
            })
          } else {
            return false
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	/* 修复input 背景不协调 和光标变色sss */
	/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

	$bg: #283443;
	$light_gray: #eee;
	$cursor: #fff;

	@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
		.login-container #loginForm .el-input input {
			color: $cursor;

			&::first-line {
				color: $light_gray;
			}
		}
	}

	/* reset element-ui css */
	.login-container #loginForm{
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				caret-color: $cursor;

				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$bg: #2d3a4b;
	$dark_gray: #889aa4;
	$light_gray: #eee;

	 #register{
		color:red;
		::-webkit-input-placeholder { /* Chrome/Opera/Safari */
			color: #333;
		}
		::-moz-placeholder { /* Firefox 19+ */
			color: pink;
		}
		:-ms-input-placeholder { /* IE 10+ */
			color: pink;
		}
		:-moz-placeholder { /* Firefox 18- */
			color: #333;
		}
	}
	.login-container {
		min-height: 100%;
		width: 100%;
		// background-color: $bg;
		overflow: hidden;

		.login-form {
			z-index: 999;
			position: fixed;
			width: 520px;
			max-width: 100%;
			padding: 160px 35px 0;
			right: 100px;
			top: 100px;
			overflow: hidden;
		}

		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;

			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
		}

		.title-container {
			position: relative;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}

			.set-language {
				color: #fff;
				position: absolute;
				top: 3px;
				font-size: 18px;
				right: 0px;
				cursor: pointer;
			}
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}

		.thirdparty-button {
			position: absolute;
			right: 0;
			bottom: 6px;
		}
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}

	.swiper {
		img {
			display: inline-block;
			width: 100%;
			height: 100%;
		}
	}

	.logo {
		border-radius: 10px;
		overflow: hidden;
		z-index: 999;
		position: fixed;
		top: 20px;
		left: 20px;
		display: inline-block;
		width: 55px;
		height: 55px;

		img {
			display: inline-block;
			width: 100%;
			height: 100%;
		}
	}
</style>
