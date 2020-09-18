<template>
  <div class="orderDetails">
    <!-- 订单详情 -->
    <div>
      <router-link :to="{path:'/order/hotelOrder'}">
        <el-button type="primary">返回列表</el-button>
      </router-link>
    </div>
    <el-row class="mb20">
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">酒店信息</el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="hotelInfo.hotelName" align="center" label="酒店名称"></el-table-column>
          <el-table-column prop="hotelInfo.roomName" align="center" label="房型名称"></el-table-column>
          <el-table-column prop="hotelInfo.sourceType" align="center" label="供应商"></el-table-column>
          <el-table-column prop="hotelInfo.roomStatus" align="center" label="房间状态"></el-table-column>
          <el-table-column prop="hotelInfo.roomPlanName" align="center" label="RP名称"></el-table-column>
          <el-table-column prop="hotelInfo.roomNumber" align="center" label="间夜量"></el-table-column>
          <el-table-column prop="hotelInfo.arrivalDate" align="center" label="入住日期"></el-table-column>
          <el-table-column prop="hotelInfo.departureDate" align="center" label="离店日期"></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">用户及入住信息</el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="memberInfo.memberId" align="center" label="用户ID"></el-table-column>
          <el-table-column prop="memberInfo.name" align="center" label="用户姓名"></el-table-column>
          <el-table-column prop="memberInfo.mobile" align="center" label="用户电话"></el-table-column>
          <el-table-column prop="memberInfo.cardType" align="center" label="是否是会员"></el-table-column>
          <el-table-column prop="memberInfo.mbName" align="center" label="入住人姓名"></el-table-column>
          <el-table-column prop="memberInfo.mbmobile" align="center" label="入住人电话"></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">订单信息</el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="orderPay.orderNo" align="center" label="订单编号"></el-table-column>
          <el-table-column prop="orderPay.originPrice" align="center" label="订单金额"></el-table-column>
          <el-table-column prop="orderPay.sourceOrderNo" align="center" label="三方订单"></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">支付信息</el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="payInfo.payStatus" align="center" label="支付状态"></el-table-column>
          <el-table-column prop="payInfo.payFormNo" align="center" label="支付单号"></el-table-column>
          <el-table-column prop="payInfo.payTime" align="center" label="支付时间"></el-table-column>
          <el-table-column prop="payInfo.payType" align="center" label="支付方式"></el-table-column>
          <el-table-column prop="payInfo.originPrice" align="center" label="订单总额"></el-table-column>
          <el-table-column prop="payInfo.actualPay" align="center" label="实际支付"></el-table-column>
          <el-table-column prop="payInfo.saleCount" align="center" label="已优惠间夜量"></el-table-column>
          <el-table-column prop="payInfo.isCoupon" align="center" label="是否使用优惠券"></el-table-column>
          <el-table-column prop="payInfo.cMoney" align="center" label="优惠券抵扣"></el-table-column>
          <el-table-column prop="payInfo.discount" align="center" label="平台优惠"></el-table-column>
          <el-table-column prop="payInfo.salePrice" align="center" label="下单立减"></el-table-column>
          <el-table-column prop="payInfo.mchId" align="center" label="商户号"></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">退款信息</el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="refundInfo.refundStatus" align="center" label="退款状态"></el-table-column>
          <el-table-column prop="refundInfo.rrefundFormNo" align="center" label="退款单号"></el-table-column>
          <el-table-column prop="refundInfo.refunds" align="center" label="退款金额"></el-table-column>
          <el-table-column prop="refundInfo.refundTime" align="center" label="退款时间"></el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
        // 酒店信息
      hotelInfo: {},
      // 用户及入住信息
      memberInfo: {},
      // 订单信息
      orderPay: {},
      //  支付信息
      payInfo:{},
      // 退款信息
      refundInfo:{},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  computed: {
    rowCount: function() {
      // return Math.ceil(this.tableData.length / 2)
    }
  },
  created() {
    // this.orderNo = this.$route.query ? this.$route.query.orderNo : this.$router.query ? this.$router.query.orderNo : ''
    // if (this.orderNo) {
    // 	this.getInfo()
    // }
    // this.styleObject = this.tableStyle
    // if (this.showByRow !== undefined) {
    // 	this.s_showByRow = this.showByRow
    // }
  },
  methods: {
    // 确认发货
    isConfirmSend(id) {
      // this.isSend = true;
      // this.record_id = id
    },
    onSend() {
      // this.confirmSend.record_id = this.record_id;
      // confirmSend(this.confirmSend).then(res=>{
      // 	if(res.data.code == 200){
      // 		this.isSend = false;
      // 		this.$message.success(res.data.msg ||"发货成功" )
      // 		this.getInfo()
      // 	}else{
      // 		this.$message.error(res.data.msg ||"发货失败")
      // 	}
      // })
    },
    // 查看备注信息
    seeSend(id) {
      // this.seeShow = true;
      // getLogistices({
      // 	record_id: id
      // }).then(res => {
      // 	this.send_remark = res.data.data.list[0].send_remark;
      // })
    },
    //确认物流信息
    onLow(id) {
      // this.lowList.record_id = this.record_id;
      // addLogistice(this.lowList).then(res => {
      // 	if (res.data.code == 200) {
      // 		this.addLowInfo = false;
      // 		this.$message.success(res.data.msg ||"添加成功")
      // 		this.getInfo()
      // 	}else{
      // 		this.$message.error(res.data.msg ||"添加失败")
      // 	}
      // })
    },
    addLow(id) {
      // this.addLowInfo = true;
      // this.record_id = id;
    },
    //差看物流信息
    isLow(id) {
      // this.logistics = true;
      // getLogistices({
      // 	record_id: id
      // }).then(res => {
      // 	this.activities = res.data.data.list;
      // 	this.timeInfo = res.data.data.list[0].logisticeInfo.orderTrack || '';
      // })
    },
    onEdit() {
      // this.dialogFormVisible = true;
      // this.obj.receiver_address = this.details.receiver_address
      // this.obj.receiver_name = this.details.receiver_name
      // this.obj.receiver_tel = this.details.receiver_tel
    },
    onSubmit() {
      // updateReceiver(this.obj).then(res => {
      // 	if (res.data.code == 200) {
      // 		this.dialogFormVisible = false;
      // 		this.$message({
      // 			type: "success",
      // 			message: res.data.msg || '成功'
      // 		})
      // 		this.details.receiver_address = this.obj.receiver_address
      // 		this.details.receiver_name = this.obj.receiver_name
      // 		this.details.receiver_tel = this.obj.receiver_tel
      // 		this.receiverInfo = [];
      // 		this.receiverInfo.push(this.details)
      // 	} else {
      // 		this.$message({
      // 			type: "error",
      // 			message: res.data.msg || '失败'
      // 		})
      // 	}
      // })
    },
    getInfo() {
      // let params = {
      // 	ordersn: this.orderNo
      // }
      // getMallOrderInfo(params).then(res => {
      // 	if (res.data.code === 200) {
      // 		this.details = res.data.data.receiverInfo;
      // 		this.obj.ordersn = res.data.data.orderBaseInfo.ordersn;
      // 		this.orderBaseInfo.push(res.data.data.orderBaseInfo)
      // 		this.receiverInfo.push(res.data.data.receiverInfo)
      // 		this.orderGoodsInfo = res.data.data.orderGoodsInfo
      // 		this.orderPayInfo = res.data.data.orderPayInfo
      // 		this.handleInfo = res.data.data.handleInfo
      // 	}else{
      // 		this.$message.error(res.data.msg || "网络错误")
      // 	}
      // })
    }
  }
};
</script>

<style lang="scss" >
.orderDetails {
  font-size: 14px;
  padding: 20px;
  margin: 40px 30px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
}

.el-table--border th {
  background: #409eff;
  color: #fff;
}

.low_info {
  cursor: pointer;
}

.search-row .title {
  margin: 40px 0 30px;
  font-size: 18px;
  font-weight: bold;
}
.el-table__header-wrapper {
  overflow: hidden;
}
.el-timeline {
  margin-top: 20px;
}
</style>