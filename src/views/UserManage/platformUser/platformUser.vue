<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <el-input v-model="searchCondition.keyWord" placeholder="手机号/姓名/昵称" style="width: 200px;" class="" @keyup.enter.native="handleFilter" prefix-icon='el-icon-search'/>
			<el-select v-model="searchCondition.cardType" clearable placeholder="会员类型" style="width: 200px;">
				<el-option v-for="item in cardType" :key="item.key" :label="item.display_name" :value="item.key" />
			</el-select>
      <el-button class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
		<el-row :gutter="20" class="order_list">
			<el-col class="sku_num">用户总数：<span v-html="total"></span></el-col>
			<el-col class="sku_num" >精英卡总数：<span v-html="listCount.eliteCardNum"></span></el-col>
			<el-col class="sku_num" >未购卡：<span v-html="listCount.noBuyCardNum"></span></el-col>
		</el-row>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      style="width: 100%" v-loading="loading">
      <el-table-column
	    align="center"
        prop="trueName"
        label="姓名/昵称"
        width="200">
		<template slot-scope="scope">
			{{scope.row.trueName ? scope.row.trueName : scope.row.nickName ? scope.row.nickName : '暂无' }}
		</template>
      </el-table-column>
      <el-table-column
	    align="center"
        prop="mobile"
        label="绑定手机号"
        width="200"/>
      <el-table-column
	    align="center"
        prop="joinTime"
        label="注册时间"
        width="200">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="cardDate"
        label="开卡日期"
        width="200">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="cardType"
        label="会员类型"
        width="200">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="parentName"
        label="上级姓名"
        width="200"/>
		<el-table-column
	    align="center"
        prop="parentMobile"
        label="上级手机号"
        width="200"/>
      <el-table-column
	    align="center"
        prop="integral.total"
        label="悦旅币总数"
        width="200">
      </el-table-column>
	  <el-table-column
	    align="center"
        prop="integral.available"
        label="可用悦旅币"
        width="200">
      </el-table-column>
	  <el-table-column
	    align="center"
        prop="integral.consum"
        label="已消费悦旅币"
        width="200">
      </el-table-column>
	   <el-table-column
	    align="center"
        prop="integral.expire"
        label="已过期悦旅币"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdate(scope.row.mid)">查看详情</el-button>
          <!-- <el-button type="text" size="small" @click="DeliverGoods(scope.row)">启用 </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination v-show="total>0" :current-page="searchCondition.page" :page-sizes="[20]" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle, userList } from '@/api/article'
// 城市
const city = [
  { key: '北京', display_name: '北京' },
  { key: '上海', display_name: '上海' },
  { key: '广州', display_name: '广州' }
]
// 购卡类型
const cardType = [
  { key: '0', display_name: '未购卡' },
  { key: '1', display_name: '精英卡' },
]
// 账户状态
const AccountState = [
  { key: '已启用', display_name: '已启用' },
  { key: '已禁用', display_name: '已禁用' }
]
// 会员类型
const memberType = [
  { key: '精英卡', display_name: '精英卡' },
  { key: '大人卡', display_name: '大人卡' },
  { key: '注册用户', display_name: '注册用户' }
]
// 不知道具体干啥的 等待问龙爷  城市
const cityKeyValue = city.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// 不知道具体干啥的 等待问龙爷  账户状态
const AccountStateKeyValue = AccountState.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

// 不知道具体干啥的 等待问龙爷 会员类型
const memberTypeKeyValue = memberType.reduce((acc, cur) => {
  acc[cur.key] = cur.display_Suppliername
  return acc
}, {})
export default {
  // 不知道具体干啥的 等待问龙爷 城市
  cityFilter(type) {
    return cityKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 账户状态
  AccountStateFilter(type) {
    return AccountStateKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 会员类型
  memberTypeFilter(type) {
    return memberTypeKeyValue[type]
  },
  data() {
    return {
      searchCondition: {
        page: 1, // 请求页数
				cardType:'',
	  },
		listCount:{},
	  list:[],
      total: null,
      city, // 城市
      AccountState, // 账户状态
      memberType, // 会员类型
			cardType,// 会员类型
      tableData: [
        {
          topLevel: '跟团游',
          taxonomy: '周边游',
          subCategory: '京津周边游'
        },
        {
          topLevel: '跟团游',
          taxonomy: '周边游',
          subCategory: '京津周边游'
        },
        {
          topLevel: '跟团游',
          taxonomy: '周边游',
          subCategory: '京津周边游'
        },
        {
          topLevel: '跟团游',
          taxonomy: '周边游',
          subCategory: '京津周边游'
        }
      ],
			loading:true,
    }
  },
  created(){
	this.getList()
  },
  methods: {
		//点击清除时间
		timeChange(){
			this.loading = true;
			this.searchCondition.page =1;
			this.getList()
		},
    // 列表数据
    getList() {
      userList(this.searchCondition).then(response => {
        if(response.data.code === 200){
			this.list = response.data.data.list //* 加个一层  没用的注释 为了推代码
			this.total = response.data.data.total;
			this.listCount =response.data.data.listCount;
			setTimeout(() => {
				this.loading = false
			}, 1.5 * 1000)
		}
      })
    },
    // 搜索
    handleFilter() {
			this.loading = true;
	  this.searchCondition.page = 1
	  this.getList()
    },
    // 查看详情
    handleUpdate(id) {
      this.$router.push({path:'/userManage/user-info',query:{id: id}})
    },
    handleCurrentChange(val) {
      this.searchCondition.page = val
      this.getList()
    }
  }
}
</script>
<style scoped="scoped">
	.order_list{
		margin: 30px 0;
		font-size: 1rem;
		color: #999;
		font-size: 16px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>
