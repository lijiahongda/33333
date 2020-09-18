<template>
	<div id="list">
		<div style="width:100%;display:flex;">

			<el-form ref="form" label-width="120px" :inline="true">

				<el-form-item label="渠道:" prop="account">
					<el-col>
						<el-select v-model="searchCondition.account" clearable placeholder="渠道" style="width: 200px;"
							@change="init">
							<el-option v-for="item in accountList" :key="item.key" :label="item.name"
								:value="item.key" />
						</el-select>
					</el-col>
				</el-form-item>


				<el-form-item>
					<el-date-picker v-model="searchCondition.startTime" type="datetime"
						value-format="yyyy-MM-dd HH:mm:ss" placeholder="下单日期时间" />
					<el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="下单日期时间" />
				</el-form-item>

				<el-form-item>
					<el-input v-model="searchCondition.keyword" placeholder="商品名称/订单编号/收货人" style="width: 300px;" />
				</el-form-item>

				<el-form-item label="供应商">
					<el-select v-model="searchCondition.product_spl_id" filterable style="width: 300px;" remote
						reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" @change="init" clearable
						:loading="loading">
						<el-option v-for="item in splList" :key="item.spl_id" :label="item.supName"
							:value="item.spl_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发货状态">
					<el-select v-model="searchCondition.isSend" placeholder="请选择">
						<el-option v-for="item in isSendOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付方式">
					<el-select v-model="searchCondition.payType" placeholder="请选择">
						<el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
				</el-form-item>


				<span v-if="groupId==0">
					<!--				运营下载-->
					<!-- <a class="el-button el-button--primary el-button--small" size="small"
						:href="`https://zt-admin-api.yuelvhui.com/admin/getDownOrderGoods?keyword=${searchCondition.keyword}&startTime=${searchCondition.startTime}&endTime=${searchCondition.endTime}&product_spl_id=${searchCondition.product_spl_id}&account=${searchCondition.account}`">导出</a> -->
					<a class="el-button el-button--primary el-button--small" size="small" @click="orderDC">导出</a>

					<!--				供应商下载-->
					<!--                <el-button type="primary" size="small"  @click="handleDownload">导出</el-button>-->
					<router-link :to="{path:'/order/uploadOrderIsSend'}" target="_blank">
						<el-button type="primary" size="small">导入</el-button>
					</router-link>
				</span>

				<router-link :to="{path:'/order/splOrderStatistics'}" target="_blank">
					<el-button type="primary" size="small">供应商订单统计</el-button>
				</router-link>

				<!-- <router-link href="www.baidu.com" target="_blank"> -->
				<!-- <el-button type="primary" size="small"  @click="handleDownload">导出</el-button> -->
				<!-- </router-link> -->

				<!-- <router-link :to="{path:'/order/uploadOrderIsSend'}" target="_blank">
                <el-button type="primary" size="small">导入</el-button>
            </router-link> -->


				<!-- <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button> -->

			</el-form>
		</div>

		<el-row :gutter="20" class="order_list">
			<el-col class="sku_num">订单总数：<span v-html="total"></span></el-col>
			<el-col class="sku_num">发货订单数：<span v-html="sendCount"></span></el-col>
			<el-col class="sku_num">未发货订单数：<span v-html="noSendCount"></span></el-col>

		</el-row>

		<el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>

			<el-table-column prop="" fixed label="下单渠道" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.orderSource ? scope.row.orderSource : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="主订单号" width="155" align="center">
				<template slot-scope="scope">
					{{scope.row.orderSn ? scope.row.orderSn : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="子订单号" width="155" align="center">
				<template slot-scope="scope">
					{{scope.row.orderNo ? scope.row.orderNo : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="payType" label="支付方式" width="155" align="center">

			</el-table-column>
			<el-table-column prop="" label="下单时间" width="160" align="center">
				<template slot-scope="scope">
					{{scope.row.createTime ? scope.row.createTime : '-' }}
				</template>
			</el-table-column>


			<el-table-column prop="product" label="商品名称" align="center">
				<template slot-scope="scope">
					{{scope.row.products ? scope.row.products : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="数量" width="40" align="center">
				<template slot-scope="scope">
					{{scope.row.splOrderNum ? scope.row.splOrderNum : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="规格" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.productSpec ? scope.row.productSpec : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="分类" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.categoryName ? scope.row.categoryName : '-' }}
				</template>
			</el-table-column>


			<el-table-column prop="" label="供应商" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.splName ? scope.row.splName : '-' }}
				</template>
			</el-table-column>


			<el-table-column prop="" label="实付金额" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.actualPrice ? scope.row.actualPrice : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="供应商导出状态" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.isExport ? scope.row.isExport : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="收货人" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.receiverName ? scope.row.receiverName : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="收货人手机号" width="120" align="center">
				<template slot-scope="scope">
					{{scope.row.receiverTel ? scope.row.receiverTel : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="订单状态" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.isSend ? scope.row.isSend : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="退款状态" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.refundStatus ? scope.row.refundStatus : '-' }}
				</template>
			</el-table-column>






			<el-table-column fixed="right" label="操作" width="160" align="center">
				<template slot-scope="scope" align="center">
					<el-button type="text" size="small" v-if="scope.row.orderContentSt == 0"
						@click="addLow(scope.row.orderProductId),scope.row.orderContentSt">处理</el-button>
					<el-button type="text" size="small" v-if="scope.row.orderContentSt == 1"
						@click="addLow(scope.row.orderProductId,scope.row.orderContentSt)">还原处理</el-button>
					<router-link :to="{path:'/order/splShopMallDetail',query:{orderNo:scope.row.orderNo}}"
						target="_blank">
						<el-button type="text" size="small">查看详情</el-button>
					</router-link>
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-sizes="[20]" :page-size="searchCondition.limit"
				:total="total" background layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>


		<el-dialog title="订单备注" :visible.sync="addShowOrderContentDialog">
			<el-form>
				<el-form-item label="标题" prop="goods_name">
					<el-input v-model="orderContent.title" placeholder="请在20字以内" style="width: 450px;" />
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="orderContent.content"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addShowOrderContentDialog = false">取 消</el-button>
				<el-button type="primary" @click="addShowOrderContentInfo">确 定</el-button>
			</div>
		</el-dialog>


	</div>
</template>
<script>
	import {
		getSplOrderList,
		downSplOrderList,
		addOrderContent,
		updateOrderProduct,
		getSplList,
		downDc
	} from "@/api/order";
	// 渠道
	const accountList = [{
			key: 1,
			name: '悦淘'
		},
		{
			key: 3,
			name: '悦店'
		},
		{
			key: 11,
			name: '旅悦'
		},
		{
			key: 2,
			name: '大人'
		},
		{
			key: 12,
			name: '邻居团'
		},
	]
	const payTypeOptions = [{
			value: 1,
			label: "微信"
		},
		{
			value: 2,
			label: "支付宝"
		}
	]
	export default {
		name: "List",

		data() {
			return {
				searchCondition: {
					page: 1,
					keyword: "",
					groupId: '',
					endTime: '',
					startTime: '',
					account: '',
					product_spl_id: '',
					payType: ''
				},
				payTypeOptions,
				isSendOptions: [{
					value: 0,
					label: '未发货'
				}, {
					value: 1,
					label: '已发货'
				}],
				total: null,
				splList: [],
				accountList, // 渠道
				downloadLoading: false,
				addShowOrderContentDialog: false,
				switchChart: false,
				list: [],
				loading: true,
				downData: [],
				sendCount: '',
				noSendCount: '',
				orderContent: {},
				order_product_id: '',
				orderContentSt: ''

			}
		},

		created() {
			this.init();
			this.groupId = JSON.parse(localStorage.getItem('userInfo')).groupId;
		},
		methods: {
			init: function () {
				const _this = this;
				_this.loading = true;
				getSplOrderList(_this.searchCondition).then(res => {
					if (res.data.code === 200) {
						_this.loading = false;
						_this.list = res.data.data.list;
						_this.total = res.data.data.total;
						_this.sendCount = res.data.data.sendCount;
						_this.noSendCount = res.data.data.noSendCount;
					}
				});
			},
			orderDC() {
				// this.loading = true
				if (this.searchCondition.endTime === null) {
					this.searchCondition.endTime = ''
				}
				if (this.searchCondition.startTime === null) {
					this.searchCondition.startTime = ''
				}
				location.href =
					`https://zt-admin-api.yuelvhui.com/admin/getDownOrderGoods?keyword=${this.searchCondition.keyword}&startTime=${this.searchCondition.startTime}&endTime=${this.searchCondition.endTime}&product_spl_id=${this.searchCondition.product_spl_id}&account=${this.searchCondition.account}`
				// let opt = {
				// 	keyword: this.searchCondition.keyword,
				// 	startTime: this.searchCondition.startTime,
				// 	endTime: this.searchCondition.endTime,
				// 	product_spl_id: this.searchCondition.product_spl_id,
				// 	account: this.searchCondition.account
				// }
				// downDc(opt).then((res) => {
				// 	if (res.data.code == 400) {
				// 		this.loading = false
				// 		this.$message.error(res.data.msg)
				// 		return false
				// 	} else {
				// 		this.loading = false
				// 		location.href =
				// 			`https://zt-admin-api.yuelvhui.com/admin/getDownOrderGoods?keyword=${this.searchCondition.keyword}&startTime=${this.searchCondition.startTime}&endTime=${this.searchCondition.endTime}&product_spl_id=${this.searchCondition.product_spl_id}&account=${this.searchCondition.account}`
				// 	}
				// })

			},
			onSubmit() {
				this.searchCondition.page = 1
				this.init()
			},
			goDetail() {
				this.$router.push({
					path: '/order/splShopMallDetail',
					query: {
						orderNo: scope.row.orderNo
					}
				})
			},

			//运营导出
			goDownload() {
				// window.location.href = `https://zt-admin-api.yuelvhui.com/admin/getDownOrderGoods?keyword=${this.searchCondition.keyword}`;
			},
			remoteMethod(query) {
				console.log(query.length)
				if (query.length > 1) {
					this.loading = true;
					getSplList({
						keywords: query
					}).then(res => {
						if (res.data.code === 200) {
							this.loading = false;
							this.splList = res.data.data.list.filter(item => {
								return item.supName.indexOf(query) > -1;
							});
						} else {
							this.splList = [];
							this.$message.warning(res.data.msg);
							this.loading = false;
						}
					})
				}
			},
			// 供应商导出
			handleDownload() {
				this.loading = true;
				downSplOrderList(this.searchCondition).then(res => {
					if (res.data.code === 200) {
						this.loading = false;
						const downData = res.data.data;
						// _this.list = res.data.data.list;
						// console.log(this.downData,'999999');

						this.downloadLoading = true
						import('@/vendor/Export2Excel').then(excel => {
							// const tHeader = ['商品名称', '订单数量', '订单编号', '下单时间','收货人姓名','收货人手机号','收货人地址','物流公司','物流单号']
							const tHeader = [
								'日期', '商品名称', '规格', '订单编号', '下单时间', '实收金额',
								'进货价格', '支付渠道', '支付单号', '姓名',
								'手机', '会员手机号', '地址', '供应商名称', '物流公司',
								'物流单号', '购买数量', '来源', '分类', '是否发货', '退款状态'
							]
							// const filterVal = [
							// 'products',
							// 'splOrderNum',
							// 'orderNo',
							// 'createTime',
							// 'receiverName',
							// 'receiverTel',
							// 'receiverAddress',
							// 'logisticsCompany',
							// 'logisticsNumber'
							// ]
							const filterVal = [
								'date',
								'products',
								'productSpec',
								'orderNo',
								'createTime',

								'actualPrice',
								'productBuyPrice',
								'payType',
								'payFormNo',

								'receiverName',
								'receiverTel',
								'memTel',
								'receiverAddress',
								'supplierName',

								'logisticsCompany',
								'logisticsNumber',
								'splOrderNum',
								'orderSource',
								'classify',

								'isSend',
								'refundStatus'
							]

							const data = this.formatJson(filterVal, downData)
							excel.export_json_to_excel({
								header: tHeader,
								data,
								filename: '订单数据',
								autoWidth: this.autoWidth,
								bookType: this.bookType
							})
							this.downloadLoading = false
						})

						// downData=[];

					} else {
						this.$message({
							message: res.data.msg,
							type: "error"
						});
						this.loading = false;
					}
				});
			},

			formatJson(filterVal, jsonData) {
				return jsonData.map(v =>
					filterVal.map(j => {
						if (j === 'timestamp') {
							return parseTime(v[j])
						} else {
							return v[j]
						}
					})
				)
			},

			addLow(id, orderContentSt) {
				this.order_product_id = id;
				this.orderContentSt = orderContentSt;
				if (orderContentSt) {
					this.updateOrderProductInfo(id);
				} else {
					this.addShowOrderContentDialog = true;
				}
			},

			addShowOrderContentInfo() {
				this.orderContent.order_product_id = this.order_product_id;
				this.orderContent.type = 1;


				addOrderContent(this.orderContent).then(res => {
					if (res.data.code == 200) {
						this.addShowOrderContentDialog = false;
						this.updateOrderProductInfo(this.orderContent.order_product_id);
						this.init()
					} else {
						this.$message.error(res.data.msg || "添加失败")
					}
				})

			},

			updateOrderProductInfo(order_product_id) {
				let params = {
					orderContentSt: this.orderContentSt,
					order_product_id: order_product_id
				}
				updateOrderProduct(params).then(res => {
					if (res.data.code == 200) {
						this.$message.success(res.data.msg || "添加成功")
						this.init()
					} else {
						this.$message.error(res.data.msg || "添加失败")
					}
				})

			},


			// 搜索
			searchAccount() {},
			// 分页
			handleSizeChange() {},
			handleCurrentChange(val) {
				this.searchCondition.page = val;
				this.init()
			}
		}
	};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	#list {
		box-sizing: border-box;
		padding: 20px;
	}

	.tableList {
		margin-top: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid #ebeef5;
	}

	.pagination {
		margin-top: 20px;
	}

	.order_list {
		margin: 30px 0;
		font-size: 1rem;
		color: #999;
		font-size: 16px;
	}

	.order_list span {
		font-size: 18px;
		color: #666;
	}

	.sku_num {
		float: left;
		width: auto;
	}

	// .searchValue {
	//   width: 420px;
	//   display: flex;
	//   justify-content: space-between;
	// }

</style>
