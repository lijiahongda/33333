<template>
  <div class="content">
    <div class="header">升级</div>
    <div class="list">升级进展：待上传截图</div>
    <div class="list">为您分配微信群编号：111111</div>
    <div class="list">您需要做如下操作完成升级</div>
    <div class="list">1.群名称修改'1234'<span>复制群名称</span></div>
    <div class="list">也可添加导师微信咨询，导师微信号：'1234'<span>复制微信号</span></div>
    <div class="list">2.上传两张截图（截图一：显示出群主 截图二：显示出群名称）<span>查看示例</span></div>
    <div class="list">3.上传提交后，工作时间一天内会有审核结果。</div>
    <div class="list">图片上传</div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="submit"  @click="submit" type='primary' plain>提交审核</el-button>

    <!-- 图片弹窗 -->
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      data:{}
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  .header{
    text-align: center;
    margin-bottom: 30px;
    color: #3876e8;
    border-bottom: 2px solid #3876e8;
    padding-bottom: 10px;
    font-size: 20px;
  }
  .list{
    margin-top: 0;
    margin-bottom: 1em;
    font-size: 14px;
    span{
      color: #E4311F;
      padding-left: 6px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    border: 1px dashed #d9d9d9;
  }
  .submit{
    margin-top: 10px;
  }
}
.block{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  div{
    width: 50%;
    position: absolute;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 90%;
  height: 100%;
  display: block;
}
</style>
