<template>
  <div class="orderDetails">
    <!-- 订单详情 -->
    <div>
      <router-link :to="{path:'/order/productOrder'}">
        <el-button type="primary">返回列表</el-button>
      </router-link>
    </div>
    <el-row class="mb20">
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">订单基本信息</el-col>
        <el-table :data="orderBaseInfo" border style="width: 100%">
          <el-table-column prop="ordersn" align="center" label="订单编号"></el-table-column>
          <el-table-column prop="mchId" align="center" label="商户编号"></el-table-column>
          <el-table-column prop="created_at" align="center" label="订单创建时间"></el-table-column>
          <el-table-column prop="created_at" align="center" label="支付时间"></el-table-column>
          <el-table-column prop="order_source" align="center" label="订单来源"></el-table-column>
          <!-- <el-table-column prop="order_type" align="center" label="订单类型"></el-table-column> -->
          <el-table-column prop="order_status" align="center" label="订单状态"></el-table-column>
          <el-table-column label="订单操作记录" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                trigger="hover"
                type="primary"
                plain
                @click="editUserInfo(scope.row.ordersn)"
              >查看记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">商品信息</el-col>
        <el-table :data="orderGoodsInfo" border style="width: 100%">
          <el-table-column prop="ordersn_son" align="center" label="子订单编号"></el-table-column>
          <el-table-column prop="goods_name" align="center" label="商品名称"></el-table-column>
          <el-table-column prop="goods_id" align="center" label="商品编号"></el-table-column>
          <el-table-column prop="return_son_id" align="center" label="京东单号"></el-table-column>
          <el-table-column prop="goods_num" align="center" label="订购数量"></el-table-column>
          <!-- <el-table-column prop="goods_spec" align="center" label="商品规格"></el-table-column> -->
          <el-table-column prop="goods_price_orig" align="center" label="商品原价"></el-table-column>
          <!-- <el-table-column prop="goods_price_member" align="center" label="会员价"></el-table-column>
          <el-table-column prop="actual_price" align="center" label="售卖价格"></el-table-column> -->
          <el-table-column prop="supplier_name" align="center" label="供应商"></el-table-column>


          <el-table-column prop="is_send" align="center" label="发货状态">
					</el-table-column>
					<el-table-column prop="order_status" align="center" label="确认发货"  width="120">
						<template slot-scope="scope">
							<el-button type="primary" @click="isConfirmSend(scope.row.record_id)" v-if="scope.row.is_send == '未发货'">确认发货</el-button>
							<!-- <p v-else  class="low_info" @click="seeSend(scope.row.record_id)">备注信息</p> -->
              <p v-else  class="low_info" >已发货</p>
						</template>
					</el-table-column>

					<el-table-column label="物流信息" align='center' fixed="right" width="150">
						<template slot-scope="scope">
							<el-button type="primary" v-if="scope.row.logistices_st == 0" @click="addLow(scope.row.order_son_code)">添加物流信息</el-button>
							<p class="low_info" v-else @click="isLow(scope.row.order_son_code)">查看物流信息</p>
						</template>
					</el-table-column>


        </el-table>
      </el-row>
      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">支付信息</el-col>
        <el-table :data="orderPayInfo" border style="width: 100%">
          <el-table-column prop align="center" label="订单编号">
            <template slot-scope="scope">
              <span v-if="scope.$index == 0">主-{{scope.row.ordersn}}</span>
              <span v-else>子-{{scope.row.ordersn}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="total_price_orig" align="center" label="订单金额"></el-table-column>
          <el-table-column prop="actual_price" align="center" label="商品实际支付金额"></el-table-column>
          <el-table-column prop="pay_time" align="center" label="支付时间"></el-table-column>
          <el-table-column prop="pay_form_no" align="center" label="支付单号"></el-table-column>
          <el-table-column prop="coupon_amount" align="center" label="优惠券抵扣"></el-table-column>
          <el-table-column prop="total_freight" align="center" label="运费"></el-table-column>
          <el-table-column prop="pay_type" align="center" label="支付方式"></el-table-column>
        </el-table>
      </el-row>

      <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">
          收货人信息
          <el-button type="primary" round @click="onEdit" style="margin-left: 30px;">修改</el-button>
        </el-col>
        <el-table :data="receiverInfo" border style="width: 100%">
          <el-table-column prop="truename" align="center" label="会员真实姓名"></el-table-column>
          <el-table-column prop="mobile" align="center" label="会员手机号"></el-table-column>
          <el-table-column prop="receiver_name" align="center" label="收货人姓名"></el-table-column>
          <el-table-column prop="receiver_tel" align="center" label="收货人手机号"></el-table-column>
          <el-table-column prop="receiver_address" align="center" label="收货地址"></el-table-column>
          <el-table-column prop="pay_type" align="center" label="支付方式"></el-table-column>
        </el-table>
      </el-row>

       <el-row :gutter="24" class="search-row">
        <el-col :span="24" class="title">
          推送信息
          <!-- <el-button type="primary" round @click="onEdit" style="margin-left: 30px;">修改</el-button> -->
        </el-col>
        <el-table :data="thirdSendInfo" border style="width: 100%">

          <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>

          <el-table-column prop="" align="center" label="推送信息">
			  <template slot-scope="scope">
				  <p v-html="scope.row.pushInfo"></p>
			  </template>
		  </el-table-column>

        </el-table>
      </el-row>

    </el-row>


    <el-dialog title="添加物流信息" :visible.sync="addLowInfo">
			<el-form :model="lowList">
				<el-form-item label="物流公司">
          	<el-button type="primary" @click="dialogTableVisible_com = true" plain>点击选择</el-button>

            <div v-if="lowList.comInfo.length !=0" class="commodity">
					<ul>
						<li style="border:none" v-for="(item,index) in lowList.comInfo" :key="index">

							<div class="section-p" style="width:720px;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<span v-text="item.goods_name"></span>
								<div>
									<span>物流公司：{{item.name}}</span>
									<span>物流编码：{{item.code}}</span>

								</div>
							</div>
						</li>
					</ul>
				</div>

					<!-- <el-input v-model="lowList.com" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item label="快递单号">
					<el-input v-model="lowList.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货人或寄货人手机号">
					<el-input v-model="lowList.phone" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addLowInfo = false">取 消</el-button>
				<el-button type="primary" @click="onLow">确 定</el-button>
			</div>
		</el-dialog>



    <el-dialog width="800px" title="选择" :visible.sync="dialogTableVisible_com">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择">
					<el-input v-model="searchVal" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getExpressCodes(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index">

						<div class="section-p">
							物流名称：<span v-text="item.name"></span>
              物流编码：<span v-text="item.code"></span>

						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>


      <el-dialog title="查看物流信息" :visible.sync="logistics">
          <el-table :data="info">
            <el-table-column property="expressName" label="物流公司" width="150"></el-table-column>
            <el-table-column property="expressNum" label="物流单号" width="200"></el-table-column>
            <!-- <el-table-column property="num" label="运费"></el-table-column>  -->
            <!-- <el-table-column property="logisticeRemark" label="备注"></el-table-column>-->
          </el-table>


			 <el-timeline v-if="timeInfo">
				<el-timeline-item
				  v-for="(activity, index) in timeInfo"
				  :key="index"
				  :timestamp="activity.time">
				  {{activity.context}}
				</el-timeline-item>
			  </el-timeline>
		</el-dialog>


  	<el-dialog title="确认发货" :visible.sync="isSend">
          <el-form>
            <!-- <el-form-item label="备注信息">
              <el-input type="textarea" v-model="confirmSend.send_remark"></el-input>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isSend = false">取 消</el-button>
            <el-button type="primary" @click="onSend">确 定</el-button>
          </div>
		</el-dialog>


    <el-dialog title="添加地址" :visible.sync="addCity" class="addCity">
		  <div class="linkage">
        <el-select
        v-model="sheng"
        @change="choseProvince"
        placeholder="省级地区">
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
        </el-select>
      <el-select
      v-model="shi"
      @change="choseCity"
      placeholder="市级地区">
      <el-option
        v-for="item in shi1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
      </el-select>
      <el-select
      v-model="qu"
      @change="choseBlock"
      placeholder="区级地区">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
      </el-select>
      <!-- 县级选择 -->
      <el-select
      v-model="qu"
      @change="choseBlock"
      placeholder="县级地区">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
      </el-select>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { getOrder,insertExpress,getExpressCodes,selectExpress,confirmSend} from "@/api/order";
import axios from 'axios';
import common from "../../common";
export default {
  data() {
    return {
      //四级联动
      // mapJson:'../static/json/map.json',
      province:'',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city:'',
      block:'',


      dialogFormVisible: false,
      dialogTableVisible_com:false,
      orderNo: "", //订单编号
      peopleList: [],
      styleObject: {},
      s_showByRow: true,
      details: {},
      orderBaseInfo: [],
      receiverInfo: [],
      thirdSendInfo:[],
      orderGoodsInfo: [],
      orderPayInfo: [],
      handleInfo: [], //推送信息
      ordersn: "",
      obj: {
        ordersn: "",
        receiver_address: "",
        receiver_name: "",
        receiver_tel: ""
      },
      addLowInfo: false,
      addCity:false,
      lowList: {
        orderNo: "",
        com: "",
        num: "",
        phone:'',
        comInfo:[],
      },
      activities: [], //物流信息
      logistics: false,
      isSend: false,
      seeShow: false,
      confirmSend: {
        record_id: "",
        send_remark: ""
      },
      send_remark: "", //备注信息
      timeInfo: "", //物流详情
      order_son_code:'',
      searchVal:'',
      list:[],
      total:'',
      timeInfo:[],
      info:[],
    };
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 2)
    }
  },
  created() {
    this.orderNo = this.$route.query ? this.$route.query.orderNo : this.$router.query ? this.$router.query.orderNo : ''
    if (this.orderNo) {
      this.getInfo();
      this.getExpressCodes(1)
    }
    this.styleObject = this.tableStyle
    if (this.showByRow !== undefined) {
    	this.s_showByRow = this.showByRow
    }
  },
  methods: {
    // 确认发货
    isConfirmSend(id) {
      this.isSend = true;
      this.record_id = id
    },
    onSend() {
      this.confirmSend.record_id = this.record_id;
      confirmSend(this.confirmSend).then(res=>{
      	if(res.data.code == 200){
      		this.isSend = false;
      		this.$message.success(res.data.msg ||"发货成功" )
      		this.getInfo()
      	}else{
      		this.$message.error(res.data.msg ||"发货失败")
      	}
      })
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
      this.lowList.order_son_code = this.order_son_code;

      if(this.lowList.comInfo.length==0)
      {
        this.$message.error("请选择物流公司");
        return;
      }

      //com 快递公司编号
      //num 快递编号
      // phone 联系人或寄货人手机号
      //orderNo  子订单号

      this.lowList.com = this.lowList.comInfo[0].code;
      this.lowList.name = this.lowList.comInfo[0].name;


      var data={
          com:this.lowList.com,
          num:this.lowList.num,
          phone:this.lowList.phone,
          orderNo:this.lowList.order_son_code,
          name:this.lowList.name,
      }
      insertExpress(data).then(res => {
      	if (res.data.code == 200) {
      		this.addLowInfo = false;
      		this.$message.success(res.data.msg ||"添加成功")
      		this.getInfo()
      	}else{
      		this.$message.error(res.data.msg ||"添加失败")
      	}
      })
    },
    addLow(order_son_code) {
      this.lowList.comInfo=[];
      this.lowList.num='';
      this.lowList.phone='';
      this.addLowInfo = true;
      this.order_son_code = order_son_code;
    },
    //差看物流信息
    isLow(orderNo) {
      this.logistics = true;
      selectExpress({
      	orderNo: orderNo
      }).then(res => {
        // this.info = [res.data.info];
        this.info     = [res.data.data.data];
        this.timeInfo = res.data.data.data.expressMsg;
        // console.log(res.data);
      })
    },
//三级联动
    getCityData:function(){
        var that = this;
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },

    created:function(){
      this.getCityData()
    },
    onEdit() {
      this.addCity=true
      // this.dialogFormVisible = true;
      // this.obj.receiver_address = this.details.receiver_address
      // this.obj.receiver_name = this.details.receiver_name
      // this.obj.receiver_tel = this.details.receiver_tel

        let url = "/mall/H5/getProvince";
        let params = {};
        this.reqM2Service(url, params).then(
            res => {
                console.log(res);
            }
        );
      // axios.post('https://www.yuelvhui.com/mall/H5/getProvince').then(function(res){
      //   console.log(res)
      // })
    },
    onSubmit() {
      updateReceiver(this.obj).then(res => {
      	if (res.data.code == 200) {
      		this.dialogFormVisible = false;
      		this.$message({
      			type: "success",
      			message: res.data.msg || '成功'
      		})
      		this.details.receiver_address = this.obj.receiver_address
      		this.details.receiver_name = this.obj.receiver_name
      		this.details.receiver_tel = this.obj.receiver_tel
      		this.receiverInfo = [];
      		this.receiverInfo.push(this.details)
      	} else {
      		this.$message({
      			type: "error",
      			message: res.data.msg || '失败'
      		})
      	}
      })
    },
    getInfo() {
      let params = {
      	ordersn: this.orderNo
      }
      getOrder(params).then(res => {
      	if (res.data.code === 200) {
      		this.details = res.data.data.receiverInfo;
      		this.obj.ordersn = res.data.data.orderBaseInfo.ordersn;
      		this.orderBaseInfo.push(res.data.data.orderBaseInfo)
          this.receiverInfo.push(res.data.data.receiverInfo)
          this.thirdSendInfo = res.data.data.thirdSendInfo

      		this.orderGoodsInfo = res.data.data.orderGoodsInfo
      		this.orderPayInfo = res.data.data.orderPayInfo
      		this.handleInfo = res.data.data.handleInfo
      	}else{
      		this.$message.error(res.data.msg || "网络错误")
      	}
      })
    },
    handleCurrentChange(val) {
				this.getExpressCodes(val)
    },
    getExpressCodes(page) {
				let _this = this;
				let data = {
					page: page
				}
				if (this.searchVal!='') {
					data.keyWord = this.searchVal
				}

				getExpressCodes(data).then((res) => {
					if (res.data.code == 200) {
						_this.list = res.data.data.list
						_this.total = res.data.data.total
					}
				}).catch((error) => {
					// console.log(error)
				})
      },

      choseId(item)
      {
        this.lowList.comInfo  = [item];
        this.dialogTableVisible_com=false;
        // console.log(item);
			},
  }
};
</script>
<style lang="scss" >
.addCity .linkage{
  display:flex;
  el-select{
    flex:1;
  }
}
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

.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			border-top: 1px solid #ddd;
			margin-bottom: 5px;
		}

		.imgDiv {
			float: left;
			background: #f1f1f1;
			width: 90px;
			height: 90px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.section-p {
			padding-left: 10px;
			box-sizing: border-box;
			float: left;

			span {
				line-height: 16px;
				display: inline-block;
				margin-right: 20px;
			}
		}

		.select-btn {
			float: right;
		}

		/deep/ .del_item .el-button--danger.is-plain {
			margin-top: 24px;
			border-radius: 100%;
			padding: 0;
			width: 50px;
			height: 50px;
		}
	}
</style>


<style lang="scss">
	.orderDetails {
		font-size: 14px;
		padding: 20px;
		margin: 40px 30px;
		border: 1px solid #DBDBDB;
		border-radius: 8px;
	}

	.low_info {
		cursor: pointer;
	}

	.search-row .title {
		margin: 40px 0 30px;
		font-size: 18px;
		font-weight: bold;
	}
	.el-table__header-wrapper{overflow:hidden}
	.el-timeline{margin-top:35px}
</style>
