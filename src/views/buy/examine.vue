<template>
  <div class="content">
      <div style="font-size:14px;color:#333;line-height:50px;text-align:left;padding-left:50px;">尊敬的客户，为了给您提供更好的服务，请花1分钟时间填写申请表，填写后我们人工客服会在24小时内与您联系。感谢您的配合！</div>
    <el-form :model="form" :rules="rules" ref="ruleForm" >
        <el-form-item label="微信号" label-width="120px" prop="user_wx">
            <el-input v-model="form.user_wx" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" label-width="120px" prop="user_name">
            <el-input v-model="form.user_name" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" label-width="120px" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" label-width="120px">
            <el-input v-model="form.company_name" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="品牌名" label-width="120px" prop="brand_name">
          <el-select 
          v-model="form.brand_name" 
          filterable 
          placeholder="请选择" 
          allow-create
          default-first-option style="width:145px">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业" label-width="120px" prop="industry">
            <el-input v-model="form.industry" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="拥有群数量" label-width="120px" prop="group_num">
            <el-select v-model="form.group_num" placeholder="请选择拥有群数量" style="width:400px">
                <el-option label="1-29个" value="1"></el-option>
                <el-option label="30-49个" value="2"></el-option>
                <el-option label="50-99个" value="3"></el-option>
                <el-option label="100以上" value="4"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="" label-width="120px">
             <el-button type="primary" @click="confirm('ruleForm')">提 交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { buyNow, creatOrder,groupgroupList,ordergetPay ,getPayInfo,createGroup} from "@/api/shop";
import { getBrandData} from "@/api/zAjax";
import {
  applicationList,
  addApplication
} from '@/api/robot'
import QRCode  from "qrcodejs2"
var checkPay
export default {
  data() {
    return {
      options:[],
      tableData:[],
      dialogFormVisible:false,
      form:{},
      codeShow:false,
      serviceData: [], // 套餐
      rechargeData: [], // 订单
      payMethod: [], // 支付方式
      selectIndex:0, // 选择套餐
      serviceDataSelect:{}, //
      buyType:1, //
      dialogTableVisible: false,
      mid:'',
      orderSn:'',
      // 群信息弹窗和列表和子弹窗
      detailLog:false,
      tableData:[],
      innerVisible:false,
      // 二维码弹窗
      qrcodeShow:false,
      // codeSwitch生成二维码开关
      codeSwitch:true,
      rules: {
          user_wx: [
            { required: true, message: '请输入微信号', trigger: 'blur' },
          ],
          user_name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入用户手机号', trigger: 'blur' }
          ],
          brand_name: [
            { required: true, message: '请输入品牌名', trigger: 'change' }
          ],
          industry: [
            { required: true, message: '请输入所属行业', trigger: 'blur' }
          ],
          group_num: [
            { required: true, message: '请选择拥有群数量', trigger: 'change' }
          ]
        }
    };
  },
  components: { QRCode },
  created() {
    this.getList()
    buyNow().then(res => {
      console.log(res)
      this.rechargeData=res.data.data.rechargeData
      this.serviceData=res.data.data.serviceData
      this.payMethod= res.data.data.payMethod
    });
    this.getBrandDatalist()
  },
  watch:{
    qrcodeShow(now,old){
      if(!now){
        clearInterval(checkPay)
        this.codeSwitch=true
      }
    }
  },
  methods: {
    getBrandDatalist(){
      getBrandData({}).then(res=>{
        console.log(res)
        this.options=res.data.data
      })
    },
    addLog(){
      this.dialogFormVisible = true;
    },
    confirm(formName){
      this.loading = true;
       this.$refs[formName].validate((valid) => {
          if (valid) {
            addApplication(this.form).then((res) => {
              if (res.data.code == 200) {
                this.$message(res.data.msg)
                setTimeout(()=>{
                    this.$router.push({name:'购买套餐'})
                },1000)
                // this.getList()
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg || '数据加载失败,请检查网络')
              }
              this.loading = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    getList() {
      this.loading = true;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      applicationList(this.obj).then((res) => {
         setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.tableData = res.data.data
          // this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
        }
        this.loading = false;
      })
    },
    //  生成二维码
    qrcode (text) {
        let that = this;
        let qrcode = new QRCode('qrcode', {
            width: 124,
            height: 124,        // 高度
            text: text,   // 二维码内容
            // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            // background: '#f0f',   // 背景色
            // foreground: '#ff0'    // 前景色
        })
        this.codeSwitch=true
    },
    // 查看想
    checkDetail(row){
      this.detailLog=true
      // this.mid=row.mid,
      // this.orderSn=row.ordersn
      groupgroupList({
        ordersn:row.ordersn,
        mid:row.mid
      }).then(res=>{
        this.tableData=res.data.data
        console.log(res)
      })
    },
    // 分页
    buyPopup(){
      this.serviceData.forEach((element,index) => {
        if(index==this.selectIndex){
          this.serviceDataSelect=element
        }
      });
      this.dialogTableVisible=true
    },
    goBuy(){
      let data={
        mid:JSON.parse(localStorage.getItem('userInfo')).mid,
        service_id: this.serviceDataSelect.id,
        pay_amount: this.serviceDataSelect.pay_price,
        pay_method: this.buyType
      }
      creatOrder(data).then(res => {
        console.log(res)
        var data={
          mid:JSON.parse(localStorage.getItem('userInfo')).mid,
          order_sn:res.data.data.ordersn,
          openId:0
        }
        if(this.codeSwitch){
          this.codeSwitch=false
          ordergetPay(data).then(rese=>{
            this.codeSwitch=true
            this.qrcodeShow=true
            console.log(rese.data.pay.response.getwayUrl)
            this.$nextTick (function () {
              this.qrcode(rese.data.pay.response.getwayUrl);
            })
            // 没过5秒检测一下支付是否成功
            checkPay=setInterval(() => {
              getPayInfo({order_sn:data.order_sn}).then(resa=>{
                console.log(resa)
                if(resa.data.status==1){
                  clearInterval(checkPay)
                  this.$message('支付成功');
                  this.qrcodeShow=false
                  this.dialogTableVisible=false
                  // 成功后创建群
                  createGroup({ordersn:data.order_sn}).then(resb=>{

                  })
                }
              })
            }, 5000);
          })
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      // this.getList()
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.kefu{
  width: 60px;
  height: 60px;
  line-height: 20px;
  text-align: center;
  border-radius:2px;
  position: fixed;
  right: 0;
  bottom: 140px;
  background: #409EFF;
  font-size: 13px;
  z-index: 10;
  color:#fff;
  cursor: pointer;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  >img{
    width:30px;
    height :25px;
    margin-top: 7px;
  }
}
.dialogCode{
  width: 200px;
  height: 250px;
  background: #fff;
  cursor: pointer;
  position: fixed;
  right: 80px;
  bottom: 60px;
  border-radius: 2px;
  z-index: 10;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  text-align: center;
  >img{
    width: 190px;
    height: 190px;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%,-50%);
  }
  >div{
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color:#555666;
    &:nth-child(1){
      margin-top: 20px;
    }
    // position: absolute;
    // top: 90%;
    // left: 50%;
    // transform: translate(-50%,-50%);
    // text-align: center;
    // line-height: 50px;
  }
  &::after{
    content: "";
    position: absolute;
    top: 128px;
    right: -12px;
    width: 12px;
    height: 22px;
    background: url(//s.weituibao.com/static/2019-10-24-wetool%E5%A4%87%E4%BB%BD%402x-1.png) no-repeat 50%/12px 22px;
  }
}
#qrcode{
  display: flex;
  justify-content: center;
}
.app-main {
  background: #f8f8f8;
}
.content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #f8f8f8;
  min-height: 100vh;
}
.buy {
  width: 100%;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0;
  box-sizing: border-box;
  padding: 0;
  color: #666;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
  margin-bottom: 20px;
  .header {

    margin: 0 20px;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #f4f4f4;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    overflow: inherit !important;
    padding: 16px 0 12px !important;
  }
  .detail {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e9e9e9;
    padding: 20px;
    position: relative;
    margin: 0 20px;
    .list:after {
      content: " ";
      position: absolute;
      z-index: 1;
      width: 280px;
      height: 108px;
      background: url(//s.weituibao.com/static/1550043672159/bg.png) no-repeat;
      background-size: 100% 100%;
      right: 0;
      bottom: 43px;
    }
    .list:hover {
      border: 1px solid #3876e8;
      box-shadow: 0 5px 10px 0 rgba(56, 118, 232, 0.15);
    }
    .list {
      flex: 1 1;
      min-width: 308px;
      max-width: 370px;
      border: 1px solid #e9e9e9;
      margin-bottom: 20px;
      margin-right: 20px;
      position: relative;
      overflow: hidden;
      h5 {
        padding: 5% 5% 0;
        margin-bottom: 12px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        color: #222333;
        position: relative;
        z-index: 5;
        margin-top: 0;
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      .money {
        padding: 0 5% 5%;
        vertical-align: middle;
        position: relative;
        z-index: 5;
        font-size: 18px;
        color: #f5222d;
        font-family: PingFangSC-Medium;
        vertical-align: middle;
      }
      .desc {
        border-top: 1px solid #e9e9e9;
        line-height: 42px;
        font-size: 16px;
        padding: 0 5%;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #777888;
      }
    }
    .active {
      border: 1px solid #3876e8;
      position: relative;
    }
    .active::before {
      content: " ";
      width: 36px;
      height: 36px;
      top: -1px;
      right: -1px;
      background-size: 100% 100%;
      position: absolute;
      z-index: 10;
      overflow: hidden;
      background-image: url(//s.weituibao.com/static/1551149027718/tag.png);
    }
  }
  .buyNow{
    padding: 24px 0;
    box-sizing: border-box;
    position: relative;
    text-align: right;
    margin: 0 20px;
  }
}
.order{
  width: 100%;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
  .header {
    margin: 0 20px;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #f4f4f4;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    overflow: inherit !important;
    padding: 16px 0 12px !important;
  }
  .detail{
    padding: 20px;
    position: relative
  }
}
.popup{
  .top{
    background: rgb(249, 249, 249);
    padding: 20px;
    display: flex;
    box-sizing: border-box;
    color: #666;
    .header{
      color: #222333;
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 32px;
    }
    .desc{
      flex: 1 1;
      overflow: hidden;
      padding-left: 20px;
      line-height: 32px;
      span{
        color: #f5222d;
        font-size: 16px;
      }
    }
  }
  .middle{
    background: #e9e9e9;
    height: 44px;
    line-height: 44px;
    text-align: right;
    padding: 0 20px;
    span{
      color: #f5222d;
      font-size: 16px;
    }
  }
  .bottom{
    margin-top: 20px;
    .header{
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 15px;
    }
    div{
      line-height: 1.5;
    }
  }
}
</style>
