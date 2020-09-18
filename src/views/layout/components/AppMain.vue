<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      maskDiv: {}, // 当前显示的水印div节点DOM对象
      userName: JSON.parse(localStorage.getItem('userInfo')).mobile,
    }
  },
  watch: {
    // 监听传入水印文本变化
    inputText () {
      this.$nextTick(() => {
        this.removeMaskDiv()
      })
    }
  },
  destroy () {
    // 组件销毁时去除生成在body节点下的水印节点
    if (this.inputDestroy) {
      this.removeMaskDiv()
    }
  },
  mounted () {
    // 确认DOM渲染后再执行
    this.$nextTick(() => {
      // 创建水印节点
      this.init()
      if (!this.inputAllowDele) {
        // 设置水印节点修改的DOM事件
        this.Monitor()
      }
    })
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  },
  methods: {
    // 生成水印DOM节点
    init () {
      const canvas = document.createElement('canvas')
      canvas.id = 'canvas'
      // canvas.width = '300' // 单个水印的宽高
      canvas.height = '100'
      this.maskDiv = document.createElement('div')
      const ctx = canvas.getContext('2d')
      ctx.font = 'normal 18px Microsoft Yahei' // 设置样式
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)' // 水印字体颜色
      ctx.rotate(-20 * Math.PI / 180)
      // 水印偏转角度
      ctx.fillText(this.userName, 20, 100)
      const src = canvas.toDataURL('image/png')
      this.maskDiv.style.position = 'fixed'
      this.maskDiv.style.zIndex = '9999'
      this.maskDiv.id = '_waterMark'
      this.maskDiv.style.top = '30px'
      this.maskDiv.style.left = '0'
      this.maskDiv.style.height = '100%'
      this.maskDiv.style.width = '100%'
      this.maskDiv.style.pointerEvents = 'none'
      this.maskDiv.style.backgroundImage = 'URL(' + src + ')'
      // 水印节点插到body下
      document.body.appendChild(this.maskDiv)
    },
    Monitor () {
      const body = document.getElementsByTagName('body')[0]
      const options = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
      }
      const observer = new MutationObserver(this.callback)
      observer.observe(body, options) // 监听body节点
    },
    // DOM改变执行callback
    callback (mutations, observer) {
      // 当attribute属性被修改
      if (mutations[0].target.id === '_waterMark') {
        this.removeMaskDiv()
      }
      // 当id被改变时
      if (mutations[0].attributeName === 'id') {
        this.removeMaskDiv()
        this.init()
      }
      // 当节点被删除
      if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === '_waterMark') {
        this.init()
      }
    },
    /* public */
    // 手动销毁水印DOM
    removeMaskDiv () {
      document.body.removeChild(this.maskDiv)
    },
    // 手动生成水印
    createMaskDiv () {
      this.init()
    }
  },
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

