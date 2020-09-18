<template>
  <div id="addAuthority">
    <div class="tableList">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限名称" prop="name">
          <div style="width:300px">
            <el-input v-model="form.powerName"/>
          </div>
        </el-form-item>
        <el-form-item label="权限位置" prop="resource">
          <el-radio-group v-model="form.powerType">
            <el-radio label="1">左侧菜单</el-radio>
            <el-radio label="2">功能节点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限类型" prop="resource">
          <el-radio-group v-model="form.level" @change="radioGroup">
            <el-radio label="1">一级菜单</el-radio>
            <el-radio label="2">二级菜单</el-radio>
            <el-radio label="3">三级菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.level != 1" label="选择权限" prop="resource">
          <el-radio-group v-model="form.pid">
            <el-radio v-for="(item,index) in radioList" :key="index" :label="item.id">{{ item.powerName }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-else label="添加封面">
          <el-upload
            :file-list="fileListImg"
            :on-success="handleAvatarTem_cont4"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            action="http://kylin.api.yuelvhui.com/common/upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="权限URL" prop="name">
          <div style="width:300px">
            <el-input v-model="form.powerRouteName"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getPower, addPower, updatePower, getLevelPowers } from '@/api/authority'
export default {
  name: 'AddAuthority',
  data() {
    return {
      form: {
        powerType: '1',
        powerName: '',
        level: '1',
        powerRouteName: '',
        pid: '',
        powerImg: '',
        id: ''
      },
      dialogImageUrl: '',
      fileListImg: [],
      dialogVisible: false,
      radioList: []
    }
  },
  created() {
    if (this.$route.query.id) {
      this.init(this.$route.query.id)
    }
  },
  methods: {
    handleAvatarTem_cont4: function(response, file, fileList) {
      this.form.powerImg = response.url
    },
    radioGroup: function() {
      const _this = this
      _this.form.pid = ''
      if (_this.form.level === '1') {
        return false
      }
      getLevelPowers({ level: parseInt(_this.form.level) - 1 }).then(res => {
        if (res.data.code === 200) {
          _this.radioList = res.data.data
        }
      })
    },
    // 保存
    submitForm: function() {
      const _this = this
      if (this.$route.query.id) {
        updatePower(_this.form).then(res => {
          if (res.data.code === 200) {
            _this.$message({ message: res.data.msg, type: 'success' })
            _this.$router.push({ path: '/authorityManagement/authorityList' })
          }
        })
      } else {
        addPower(_this.form).then(res => {
          if (res.data.code === 200) {
            _this.$message({ message: res.data.msg, type: 'success' })
            _this.$router.push({ path: '/authorityManagement/authorityList' })
          }
        })
      }
    },
    // 回显
    init: function(id) {
      const _this = this
      getPower({ id: id }).then(res => {
        if (res.data.code === 200) {
          const t = res.data.data
          _this.form.powerName = t.powerName
          _this.form.level = JSON.stringify(parseInt(t.level))
          _this.form.powerRouteName = t.powerRouteName
          _this.form.pid = parseInt(t.pid)
          _this.form.powerImg = t.powerImg
          _this.form.id = t.id
          _this.form.powerType = t.powerType
          _this.fileListImg.push({
            name: t.powerName,
            url: t.powerImg
          })
          getLevelPowers({ level: parseInt(_this.form.level) - 1 }).then(res => {
            if (res.data.code === 200) {
              _this.radioList = res.data.data
            }
          })
        }
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#addAuthority {
  box-sizing: border-box;
  padding: 20px;
}
.tableList {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  padding: 10px;
}
</style>
