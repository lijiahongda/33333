<template>
  <div class="main">
    <!-- <ImageCropper></ImageCropper> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input
          maxlength="11"
          v-model="ruleForm.mobile"
          style="width:220px;"
          @blur="blueText($event)"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="mobileCode">
        <el-input v-model="ruleForm.mobileCode" style="width:90px;"></el-input>
        <el-button type="primary" plain v-if="backs==60" @click="sendMsg">发送验证码</el-button>
        <el-button type="info" v-if="backs<60">{{backs}}秒后重新发送</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" style="width:220px;" show-password></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" style="width:220px;" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </el-form-item>
    </el-form>
    <div id="c1" style="z-index:3000"></div>
  </div>
</template>
<script>
import ECharts from "echarts";
import { dataStatistics, userIndex } from "@/api/robot";
import { sendMessage, updatePassword, adminIndexGraph } from "@/api/zAjax"; // 接口
import { get } from "sortablejs";
import ImageCropper from "@/components/ImageCropper";
import md5 from "js-md5";
import _ from "lodash";
import Captcha from "@/utils/captcha-ui";
export default {
  // components:{ImageCropper},
  data() {
    return {
      ruleForm: {
        mobile: "",
        mobileCode: "",
        newPassword: "",
        confirmPassword: ""
      },
      myCaptchaToken: 0,
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        mobileCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      backs: 60
    };
  },
  created() {},
  mounted() {
    let that = this;
    this.myCaptcha = _dx.Captcha(document.getElementById("c1"), {
      appId: "22670a97d0ee5e5621e76ad732effce9", //appId,开通服务后可在控制台中“服务管理”模块获取
      success: function(token) {
        console.log("token:", token);
        that.myCaptchaToken = token;
        console.log("验证成功的时候掉一次");
        that.sendMsg(); //获取验证码
        that.myCaptcha.hide();
      },
      fail: function(err) {
        console.log(err);
      },
      // width: '750',
      language: localStorage.getItem("language"),
      style: "popup",
      inlineFloatPosition: "up"
    });
  },
  methods: {
    myCaptchaButton: function() {
      this.myCaptcha.reload();
      this.myCaptcha.show();
    },
    blueText(e) {
      if (!/^1[3456789]\d{9}$/.test(e.target.value)) {
        this.$message.warning("请输入正确手机号");
        this.registerFrom.usePhone = "";
      }
    },
    // 发送验证码
    sendMsg() {
      console.log(this.ruleForm.mobile.length)
      if (this.ruleForm.mobile.length==11) {
      // if (this.ruleForm.mobile != "") {
        sendMessage({
          mobile: this.ruleForm.mobile,
          imgToken: this.myCaptchaToken
        }).then(res => {
          if (res.data.code == 200) {
            // this.time()
            this.$message.success(res.data.msg);
            var dao = setInterval(() => {
              if (this.backs <= 1) {
                clearInterval(dao);
                this.backs = 61;
              }
              this.backs--;
            }, 1000);
            this.myCaptcha.hide();
          } else {
            // this.$message.error(res.data.msg)
            this.myCaptchaButton();
            // this.myCaptcha.show()
          }
        });
      } else {
        this.$message.warning("请输入正确手机号");
        // this.$message("请输入手机号");
      }
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.newPassword != this.ruleForm.confirmPassword) {
            this.$message("两次输入的密码不同");
            return;
          }
          this.ruleForm.newPassword = md5(this.ruleForm.newPassword);
          this.ruleForm.confirmPassword = md5(this.ruleForm.confirmPassword);
          updatePassword(this.ruleForm).then(res => {
            this.$message.success(res.data.msg);
            if (res.data.code == 200) {
              this.$store.dispatch("LogOut").then(() => {
                location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
.main {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  > .Setmeal {
    width: 100%;
    min-height: 220px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    .dayList {
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #eaeaea;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 2.5px;
      color: #333;
      border-radius: 2px;
    }
    > .title {
      width: 95%;
      height: 50px;
      border-bottom: 1px solid #f4f4f4;
      margin: 0 auto;
      line-height: 50rpx;
      display: flex;
      justify-content: space-between;
      > .name {
        width: 90px;
        height: 100%;
        border-bottom: 1px solid #30333b;
        font-size: 14px;
        font-weight: 800;
        line-height: 50px;
        text-align: center;
      }
    }
    > .SetmealList {
      width: 100%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      > .msg {
        width: 95%;
        margin: 0 auto;
        > .msg_tips {
          width: 94%;
          margin: 0 auto;
          font-size: 14px;
          color: #888999;
          font-weight: 400;
          margin-top: 40px;
        }
        > .msg_btn {
          width: 94%;
          margin: 0 auto;
          margin-top: 20px;
          display: flex;
          > .text {
            font-size: 14px;
            color: #888999;
            font-weight: 400;
            margin: 0 auto;
            > span {
              color: rgb(56, 118, 232);
              font-size: 25px;
              > .sum {
                font-size: 16px;
                color: #333;
              }
              // margin-right: 10px;
            }
          }
          .paiBtn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            background-color: #3876e8;
            font-weight: 800;
            text-align: center;
            margin-left: 30px;
          }
        }
      }
    }
    > .msg_table {
      width: 95%;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}
</style>
