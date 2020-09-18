<template>
  <div class="orderDetails">
    <el-row class="mb20" v-loading="loading">
      <el-col>
        <div style="margin-bottom:20px;">
          <router-link :to="{path:'/userManage/user-order'}">
            <el-button type="primary">返回列表</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="24" :offset="0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tbody>
            <tr>
              <th style="font-size:18px;" colspan="21">用户信息</th>
            </tr>
            <tr class="user">
              <td colspan="2">姓名/昵称</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.trueName}} {{info.baseInfo.trueName && info.baseInfo.nickName ? '/' : ''}} {{info.baseInfo && info.baseInfo.nickName}}</td>
              <td>电话</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.mobile}}</td>
              <td colspan="2">会员类型</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.cardType}}</td>
              <td colspan="2">注册时间</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.joinTime}}</td>
			  <td colspan="2">开卡时间</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.cardDate}}</td>
              <td>性别</td>
              <td>{{info.baseInfo.sex}}</td>
            </tr>
            <tr class="user">
			  <td colspan="2">身份证号码</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.cardNo}}</td>
              <td colspan="1">上级</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.parentName}}</td>
              <td colspan="2">上级电话</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.parentMobile}}</td>
              <td colspan="2">所属分公司</td>
              <td colspan="2">{{info.company && info.company.companyName}}</td>
			  <td colspan="2">分公司负责人</td>
              <td colspan="4">{{info.company && info.company.companyPeople}}</td>
            </tr>
			<tr class="user">
			  <td colspan="2">省份</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.province }}</td>
			  <td colspan="1">城市</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.city }}</td>
			  <td colspan="2">区县</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.district}}</td>
			  <td colspan="2">用户详细地址</td>
              <td colspan="8">{{info.baseInfo && info.baseInfo.address}}</td>
			</tr>
			<tr class="user">
			  <td colspan="2">可转出佣金</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.oAmount}}</td>
			  <td colspan="2">已转出佣金</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.rAmount}}</td>
              <td colspan="2">悦旅币总数</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.total}}</td>
              <td colspan="2">已使用悦旅币</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.consum}}</td>
			  <td colspan="2">已过期悦旅币</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.expire}}</td>
              <td colspan="2">可使用悦旅币</td>
              <td colspan="2">{{info.baseInfo.integral && info.baseInfo.integral.available}}</td>
			</tr>
          </tbody>
        </table>
      </el-col>

      <el-col :span="24" :offset="0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tr>
            <th style="font-size:18px;" colspan="14">优惠券信息</th>
          </tr>
          <tr>
            <th colspan="3">优惠券名称</th>
            <th colspan="2">优惠券金额</th>
            <th colspan="2">所有优惠券</th>
            <th colspan="2">已使用优惠券</th>
            <th colspan="2">未使用优惠券</th>
            <th colspan="3">截止日期</th>
          </tr>
          <tr v-if="info.coupon && info.coupon.length > 0" class="coupons" v-for="(item,index) in info.coupon" :key="index">
            <td colspan="3">{{item.name}}</td>
            <td colspan="2">{{item.amount}}</td>
            <td colspan="2">{{item.total}}</td>
            <td colspan="2">{{item.useNum}}</td>
            <td colspan="2">{{item.unNum}}</td>
            <td colspan="3">{{item.endDate}}</td>
          </tr>
        </table>
      </el-col>

	  <el-col :span="24" :offset="0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tr>
            <th style="font-size:18px;" colspan="23">酒店订单信息</th>
          </tr>
          <tr>
            <th colspan="4">酒店名称</th>
            <th colspan="2">订单编号</th>
            <th colspan="2">支付单号</th>
            <th colspan="2">订单原价</th>
            <th colspan="2">支付金额</th>
            <th colspan="2">立减金额</th>
            <th colspan="2">优惠券金额</th>
            <th colspan="3">支付时间</th>
            <th colspan="3">入住时间</th>
            <th colspan="1">操作</th>
          </tr>
          <tr v-if="info.hotel && info.hotel.length > 0" class="coupons" v-for="(item,index) in info.hotel" :key="index">
            <td colspan="4">{{item.hotelName}}</td>
            <td colspan="2">{{item.orderNo}}</td>
            <td colspan="2">{{item.payFormNo}}</td>
            <td colspan="2">{{item.price}}</td>
            <td colspan="2">{{item.act}}</td>
            <td colspan="2">{{item.sale}}</td>
            <td colspan="2">{{item.cMoney}}</td>
            <td colspan="3">{{item.payTime}}</td>
            <td colspan="3">{{item.arrivalDate}}</td>
            <td colspan="1">
				<router-link :to="{path:'/hotel-detail',query:{orderNo:item.orderNo}}">
					<span>查看</span>
				</router-link>
			</td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { userInfo } from '@/api/remoteSearch'
export default {
  components: {  },
  data() {
    return {
	  id:'',
	  info:{
		baseInfo: {},
		company: {},
		coupon: [],
		hotel: [],
	  },
		loading:true,
    }
  },
  created() {
	this.id = this.$route.query ? this.$route.query.id : this.$router.query ? this.$router.query.id : ''
	if(this.id){
    	this.getUserInfo()
	}
  },
  methods: {
	getUserInfo(){
		userInfo({memberId :this.id}).then(res=>{
			if(res.data.code === 200){
				this.info = res.data.data;
				this.loading = false;
			} else if( res.data.code === 400){
				this.$message.error(res.data.msg)
			}
		})
	}
  }
}
</script>
<style lang="scss">
  .el-table thead.is-group th{
    background: #fff;
  }
  .orderDetails {
    font-size: 14px;
    padding: 20px;
    margin: 40px 30px;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    .title {
      height: 36px;
      line-height: 36px;
      margin: 0;
      display: inline-block;
      vertical-align: middle;
    }
    .table {
      font-size: 13px;
      width: 100%;
      color: #606266;
      border-collapse: collapse;
      box-shadow: 2px 2px 8px #dbdbdb;
      .left {
        width: 15%;
      }
      .half {
        width: 5.6%;
      }
      tr {
        &:hover {
          background-color: #f5f7fa;
        }
      }
      td, th {
        border: 1px solid #ebeef5;
        width: 20%;
        padding: 15px;
        box-sizing: border-box;
        text-align: center;
      }
      .user{
        td:nth-child(odd){
          text-align: right;
          color: #000;
        }
        td:nth-child(even){
          text-align: left;
          color: blue;
        }
      }
      .coupons{
        td{
          color: blue;
        }
      }

    }
    tbody{
      // border-bottom: 2px solid #ccc;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    thead{
      display: block;
      margin-top:10px;
      margin-bottom:10px;
    }
  }
  .textUpdate{
    font-size: 18px;
    margin: 50px auto 10px;
    text-align: center;
  }
  .textUpdateText{
    margin: 0 auto 0px;
    text-align: left;
    font-size: 16px;
  }
  .radio{
    text-align: center;
  }
  .footer{
    text-align: right;
    margin-top: 10px;
    line-height: 50px;
    height: 50px;
  }
  .footerSave{
    text-align: right;
    line-height: 30px;
    height: 30px;
  }
  .mtop{
    margin-top:30px;
    margin-bottom: 10px;
  }
  .tabDiv{
    width: 100%;
    span{
      display: inline-block;
      width: 20%;
      text-align: center;
    }
  }

</style>

