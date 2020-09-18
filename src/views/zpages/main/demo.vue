<template>
  <div class="content">
    <div id="playercontainer"></div>
    <div class="button">
      上传文件
      <input type="file" @change="addfile" multiple/>
    </div>
    <div class="box">
      <div class="list" v-for="(item,index) in imglist" :key="index">
        <div>{{item}}</div>
        <div class="del" @click="delimg(index)">x</div>
      </div>
    </div>
    <button @click="sub">提交</button>
  </div>
</template>

<script>
import cyberplayer from './cyberplayer.js'

export default {
  name: "dataCollect",
  data() {
    return {
      imglist: [],
      formData: new FormData()
    };
  },
  mounted() {
    console.log(this.formData);
    this.baiduMp4('http://1300766538.vod2.myqcloud.com/94629e29vodcq1300766538/8bc3cd355285890803544863396/playlist_eof.m3u8','https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-27/14/yuelvhui2xcLqwu8sj1590560762.jpg')
  },
  methods: {
     baiduMp4(mp4Url, imgUrl) {
      var player = cyberplayer("playercontainer").setup({
        width: 1015, // 宽度，也可以支持百分比(不过父元素宽度要有)
        height: 574, // 高度，也可以支持百分比
        title: "基本功能", // 标题
        file: mp4Url, // 播放地址
        image: imgUrl, // 预览图
        autostart: false, // 是否自动播放
        stretching: "uniform", // 拉伸设置
        repeat: false, // 是否重复播放
        volume: 100, // 音量
        controls: true, // controlbar是否显示
        starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
        logo: { // logo设置
            linktarget: "_blank",
            margin: 8,
            hide: false,
            position: "top-right", // 位置
            file: "./img/logo.png" // 图片地址
        },
        ak: "这里要写自己的ak码" // 公有云平台注册即可获得accessKey
      });
    },
    // 提交接口
    sub(){
      console.log(this.formData)
      for (var value of this.formData.values()) {
        console.log(value);
      }
    },
    // 添加文件
    addfile(el) {
      // var reader;
      var __this = this;
      var _this = el;
      // if (window.FileReader) {
      //   reader = new FileReader();
      // } else {
      //   alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      // }
      for(let i in  el.target.files){
        if(i!='length'&&i!='item'){
          console.log( el.target.files[i])
          var file = el.target.files[i];
          this.formData.append("file", file);
          this.imglist.push(file.name);
        }
      }
      // var imageType = /^image\//;
      //是否是图片
      // if(!imageType.test(file.type)) {
      //     alert("请选择图片！");
      //     return;
      // }
      //读取完成
      // reader.onload = function(e) {
      //   //图片路径设置为读取的图片
      //   __this.imglist.push(e.target.result);
      //   for (var value of __this.formData.values()) {
      //     console.log(value);
      //   }
      // };
      // reader.readAsDataURL(file);
    },
    // 删除
    delimg(index) {
      var form = new FormData();
      var i = 0;
      for (var value of this.formData.values()) {
        if (index != i) {
          form.append('file',value);
        }
        i++;
      }
      this.imglist.splice(index,1)
      this.formData = form;
      // for (var value of this.formData.values()) {
      //   console.log(value);
      // }
    }
  }
};
</script>

<style scoped>
.button {
  width: 100px;
  height: 50px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  text-align: center;
  font-size: 15px;
  float: left;
  margin-left: 10px;
  position: relative;
  line-height: 50px;
  text-align:center;
  /* overflow: hidden; */
}
.button > input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.box{
  clear: both;
}
.list{
  width:400px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.list > .del {
  width: 15px;
  height: 15px;
  background: #eaeaea;
  border-radius: 50%;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
</style>
