<template>
  <div class="content">
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="成长任务1" placement="top">
          <el-card>
            <h4>升级店长省的多赚的多</h4>
            <p>建立一个大于80人的微信群完成升级，即可开启省得更多的同时分享赚钱等悦淘特权。</p>
            <el-button type='primary' plain @click="goUpgrade" class="goUpgrade">去升级</el-button>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="成长任务2" placement="top">
          <el-card>
            <h4>智能助理 轻松赚钱</h4>
            <p>智能助理背后都是电商运营专家，每日为您精选悦淘爆品，由智能助理发出，让您轻松赚钱。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="成长任务3" placement="top">
          <el-card>
            <h4>进培训群 爆品群实现能力和收益双增长</h4>
            <p>官方培训群有权方位阶段课程，更有大咖讲师独家秘诀分享。官方爆品群是重要的选品渠道，这里都是全网每天的爆款商品，以图片+视频+软文形式展现增强出单</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="成长任务4" placement="top">
          <el-card>
            <h4>邀请伙伴加入</h4>
            <p>学会邀请新伙伴的方式，帮助伙伴省钱赚钱的同时您也获得更多的平台奖励，邀请越多赚的就越多哦~</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    // 去升级
    goUpgrade(){
      this.$router.push({path:'/group/upgrade',query: {id:'1'}})
    },
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
.content{
  padding: 20px;
  box-sizing: border-box;
  .goUpgrade{
    padding: 8px 10px;
  }
}
</style>
