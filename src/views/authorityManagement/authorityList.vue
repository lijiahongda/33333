<template>
  <div id="authorityList">
    <div class="searchValue">
      <div style="width:300px">
        <el-input v-model="searchForm.keyWord" placeholder="搜索" class="input-with-select" @keyup.enter.native="searchAccount">
          <el-button slot="append" icon="el-icon-search" @click="searchAccount"/>
        </el-input>
      </div>
      <el-button type="primary" @click="addAuthority">新增权限</el-button>
    </div>
    <div class="tableList">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="权限编号"
          width="180"
          align="center"/>
        <el-table-column
          prop="powerName"
          label="权限名称"
          width="180"
          align="center"/>
        <el-table-column
          prop="level"
          label="权限类型"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.level }}级菜单
          </template>
        </el-table-column>
		  <el-table-column
			  prop="powerType"
			  label="节点类型"
			  width="300"
			  align="center"/>
        <el-table-column
          prop="powerRouteName"
          label="权限URL/参数"
          width="300"
          align="center"/>
        <el-table-column
          prop="createTime"
          label="添加/修改时间"
          align="center"/>
        <el-table-column
          prop="address"
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="parseInt(total)"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { getPowers } from '@/api/authority'
export default {
  name: 'AuthorityList',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      searchForm: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      total: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 新增权限
    addAuthority: function() {
      this.$router.push({ path: 'addAuthority' })
    },
    // 搜索
    searchAccount: function() {
      this.init()
    },
    // 列表
    init: function() {
      const _this = this
      getPowers(_this.searchForm).then(res => {
        if (res.data.code === 200) {
          _this.tableData = res.data.data.list
          _this.total = res.data.data.total
        }
      })
    },
    // 表格操作
    handleEdit(index, row) {
      // console.log(index, row)
      this.$router.push({ path: '/authorityManagement/addAuthority', query: { id: row.id }})
    },
    handleDelete(index, row) {
      // console.log(index, row)
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.init()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.init()
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#authorityList {
  box-sizing: border-box;
  padding: 20px;
}
.tableList {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
}
.searchValue {
  width: 420px;
  display: flex;
  justify-content: space-between;
}
</style>
