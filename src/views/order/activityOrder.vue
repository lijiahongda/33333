<template>
  <div id="list">
    <div class="searchValue">
      <div style="width:100%;display:flex;">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          style="margin: 0 20px;"
          v-model="searchForm.keyWord"
          placeholder="请输入1-15个字符"
          class="input-with-select"
          @keyup.enter.native="searchAccount"
        />
        <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" :fit="true" style="width: 100%;margin-top:20px;" border>
      <el-table-column prop="product" label="姓名/昵称" width="180" align="center">
        <template slot-scope="scope">
          <p></p>
        </template>
      </el-table-column>
      <el-table-column prop label="手机号" width="200" align="center">
        <!-- <template slot-scope="scope">{{scope.row.orderNo ? scope.row.orderNo : '-' }}</template> -->
      </el-table-column>
      <el-table-column prop label="订单来源" width="140" align="center">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop label="活动类型" align="center">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.orderType ? scope.row.orderType : '-'}}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop label="标题" width="100" align="center">
        <!-- <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template> -->
      </el-table-column>
      <el-table-column prop label="活动地址" width="100" align="center">
        <!-- <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template> -->
      </el-table-column>
      <el-table-column prop label="开始时间" width="100" align="center">
        <!-- <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template> -->
      </el-table-column>
      <el-table-column prop label="结束时间" width="100" align="center">
        <!-- <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template> -->
      </el-table-column>
      <el-table-column prop label="金额" width="100" align="center">
        <!-- <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template> -->
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope" align="center">
          <router-link :to="{path:'/order/activityDetail',query:{orderNo:scope.row.orderNo}}">
            <el-button type="text" size="small">查看详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align:center;">
      <el-pagination
        :current-page="searchCondition.page"
        :page-sizes="[20]"
        :page-size="searchCondition.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }],
        total: null,
      searchCondition: {
        page: 1,
        payStatus: "",
        shippingStatus: "",
        orderSource: "",
        orderType: "",
        keyword: "",
        endTime: "",
        startTime: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      searchForm: {
        page: 1,
        pageSize: 10,
        keyWord: ""
      },
      input: ""
    };
  },
  methods: {
    // 搜索
    searchAccount() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      // this.getList()
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
.searchValue {
  width: 420px;
  display: flex;
  justify-content: space-between;
}
</style>