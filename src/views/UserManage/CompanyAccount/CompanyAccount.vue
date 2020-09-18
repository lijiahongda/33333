<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-select v-model="searchCondition.SubordinateDepartment" placeholder="所属部门" style="width: 108px;">
        <el-option v-for="item in SubordinateDepartment" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="searchCondition.AccountStatus" placeholder="账号状态" style="width: 108px;">
        <el-option v-for="item in AccountStatus" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-input v-model="searchCondition.RetrievalCondition" placeholder="订单ID 用户手机 酒店名称" style="width: 200px;" class="" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button style="margin:0 0 20px 20px;" type="primary" icon="document" @click="addStaff">新增员工</el-button> -->
      <el-button class="" style="margin-left: 10px;" type="primary" icon="" @click="addStaff">新增员工</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop=""
        label="账号ID"
        width="200"/>
      <el-table-column
        prop=""
        label="姓名"
        width="200"/>
      <el-table-column
        prop=""
        label="所属部门"
        width="200"/>
      <el-table-column
        prop=""
        label="账号"
        width="200">
        <span slot-scope="scope"/>
      </el-table-column>
      <el-table-column
        prop=""
        label="角色权限"
        width="200">
        <span slot-scope="scope"/>
      </el-table-column>
      <el-table-column
        prop=""
        label="账号状态"
        width="200">
        <span slot-scope="scope"/>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdate(scope.row)">修改密码</el-button>
          <el-button type="text" size="small" @click="DeliverGoods(scope.row)">停用 </el-button>
          <el-button type="text" size="small" @click="DeliverGoods(scope.row)"> 编辑 </el-button>
          <el-button type="text" size="small" @click="DeliverGoods(scope.row)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="searchCondition.page" :page-sizes="[10,20,30, 50]" :page-size="searchCondition.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 新增员工 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="addClass" :rules="rules" :model="addClass" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
// 所属部门
const SubordinateDepartment = [
  { key: '销售部', display_name: '销售部' },
  { key: '研发部', display_name: '研发部' }
]
// 账号状态
const AccountStatus = [
  { key: '已启用', display_name: '已启用' },
  { key: '已停用', display_name: '已停用' }
]
// 不知道具体干啥的 等待问龙爷  所属部门
const SubordinateDepartmentKeyValue = SubordinateDepartment.reduce(
  (acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  },
  {}
)
// 不知道具体干啥的 等待问龙爷  账号状态
const AccountStatusKeyValue = AccountStatus.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  // 不知道具体干啥的 等待问龙爷 所属部门
  SubordinateDepartmentFilter(type) {
    return SubordinateDepartmentKeyValue[type]
  },

  // 不知道具体干啥的 等待问龙爷 账号状态
  AccountStatusFilter(type) {
    return AccountStatusKeyValue[type]
  },

  data() {
    return {
      searchCondition: {
        startTime: '', // 开始时间
        EndTime: '', // 结束时间
        RetrievalCondition: '', // 检索条件
        page: 1, // 请求页数
        limit: 20 // 请求条数
      },
      total: null,
      SubordinateDepartment,
      AccountStatus,
      downloadLoading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      rules: {
        topLevel: [{ required: true, message: '请选择等级分类', trigger: 'change' }],
        taxonomy: [{ required: true, message: '请选择分类组！', trigger: 'change' }],
        add: [{ required: true, message: '请输入新增分类名称！', trigger: 'blur' }]
      },
      addClass: {
        topLevel: '',
        taxonomy: '',
        add: ''
      },
      textMap: {
        update: '修改分类',
        create: '添加分类'
      },
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
      ]
    }
  },
  methods: {
    // 列表数据
    getList() {
      // this.listLoading = true
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    // 搜索
    handleFilter() {
      this.searchCondition.page = 1
    },

    // 查看详情
    handleUpdate(row) {},
    // 分页
    handleSizeChange(val) {
      this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    // 新增员工
    addStaff() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs["addClass"].clearValidate();
      //   });
    }
  }
}
</script>
<style>
</style>
