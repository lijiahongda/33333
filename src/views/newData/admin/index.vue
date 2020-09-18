<template>
	<div class="container">
		<el-row :gutter="24" class="search-row">
			<el-table border :data="topStatics" style="width: 100%">
				<el-table-column prop="todayOrdersCount" align="center" label="今日订单总数"></el-table-column>
				<el-table-column prop="todaySales" align="center" label="今日销售总额"></el-table-column>
				<el-table-column prop="amountYesterday" align="center" label="昨天销售总额"></el-table-column>
				<el-table-column prop="amountWeeks" align="center" label="近7天销售总额"></el-table-column>
				<el-table-column prop="amountAll" align="center" label="交易总金额"></el-table-column>
				<el-table-column prop="amountActual" align="center" label="实付总金额"></el-table-column>
				<el-table-column prop="amountProfit" align="center" label="利润金额"></el-table-column>
				<el-table-column prop="ordersCountAll" align="center" label="累计订单数"></el-table-column>
			</el-table>
		</el-row>
		<el-row :gutter="24" class="search-row">
			<el-col :span="24" class="title">待处理订单</el-col>
			<el-table border style="width: 100%" :data="toBeProcessed">
				<el-table-column prop="hasNotPay" align="center" label="待付款订单"></el-table-column>
				<el-table-column prop="completed" align="center" label="已完成订单"></el-table-column>
				<el-table-column prop="shipped" align="center" label="已发货订单"></el-table-column>
				<el-table-column prop="notShipped" align="center" label="待发货订单"></el-table-column>
				<el-table-column prop="exchange" align="center" label="待处理订单"></el-table-column>
				<el-table-column prop="refundNotReview" align="center" label="待处理退款订单"></el-table-column>
			</el-table>
		</el-row>

		<el-row :gutter="24" class="search-row">
			<el-col :span="11" class="title">
				<p class="title">商品总览</p>
				<div class="items">
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{goodsOverview.outSale}}</p>
							<p>已下架</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{goodsOverview.onSale}}</p>
							<p>已上架</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{goodsOverview.stockWarn}}</p>
							<p>库存紧张</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{goodsOverview.all}}</p>
							<p>全部商品</p>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="11" class="title">
				<p class="title">用户总览</p>
				<div class="items">
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{usersOverview.today}}</p>
							<p>今日新增</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{usersOverview.yesterday}}</p>
							<p>昨日新增</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{usersOverview.month}}</p>
							<p>本月新增</p>
						</div>
					</div>
					<div class="goodsItem">
						<div class="item">
							<p class="num">{{usersOverview.all}}</p>
							<p>会员总数</p>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>

<!--		<el-row :gutter="24" class="search-row">-->
<!--			<el-col :span="24" class="title">快速运营入口</el-col>-->
<!--			<el-table border style="width: 100%">-->
<!--				<el-table-column prop="" align="center" label="待付款订单"></el-table-column>-->
<!--				<el-table-column prop="" align="center" label="已完成订单"></el-table-column>-->
<!--				<el-table-column prop="" align="center" label="已发货订单"></el-table-column>-->
<!--				<el-table-column prop="" align="center" label="待发货订单"></el-table-column>-->
<!--				<el-table-column prop="" align="center" label="待处理订单"></el-table-column>-->
<!--				<el-table-column prop="" align="center" label="待处理退款订单"></el-table-column>-->
<!--			</el-table>-->
<!--		</el-row>-->

	</div>
</template>
<script>
    import { indexSummary} from '@/api/order' // 接口
	export default {
	  data(){
	    return{
          topStatics: [],
          toBeProcessed: [],
          goodsOverview: {},
          usersOverview: {}
		}
	  },
	  created() {
		this.getDetail();
      },
	  methods: {
	    getDetail(){
          indexSummary().then(res => {
            if (res.data.code === 200){
              this.topStatics.push(res.data.data.topStatics);
              this.toBeProcessed.push(res.data.data.toBeProcessed);
              this.goodsOverview = res.data.data.goodsOverview;
              this.usersOverview = res.data.data.usersOverview;
              console.log(this.topStatics)
            }
          })
		}
	  }
    }
</script>
<style scoped>
	.container{
		padding: 30px;
	}
	.el-row{
		margin: 0 auto 40px;
	}
	.el-col{
		padding: 10px;
		margin: 0 10px;
		font-size: 14px;
	}
	.goodsItem .num{
		color: #ff4a4d;
		font-size: 25px;
	}
	.items{
		display: flex;
		justify-content: space-around;
	}
	.item{
		text-align: center;
		font-size: 16px;
	}
	.el-col-11{
		border: 1px solid #ccc;
		padding: 0 !important;
	}
	.el-col-11 .title{
		background-color: #ddd;
		margin: 0;
		padding: 10px;
	}
	.el-col-24.title{
		background-color: #ddd;
		margin: 0;
		border: 1px solid #ccc;
		border-bottom: none;
	}
</style>
