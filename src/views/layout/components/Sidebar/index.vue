<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156"
		 text-color="#bfcbd9" active-text-color="#409EFF"  @select='openPath'>
			<template v-for="(items,idx) in permissionRouters">
				<el-submenu :index="items.powerId+'?title='+items.powerName" :key="items.powerId" v-if="items.children">
					<template slot="title">
						<i :class="items.icon"></i>
						<span>{{items.powerName}}</span>
					</template>
					<template v-for="item in items.children">
						<el-submenu v-if="item.children" :index="item.powerId+'?title='+item.powerName" :key="item.powerId" class="nest-menu">
						    <template  slot="title">{{ item.powerName }}</template>
						    <el-menu-item v-for="(threeItem,i) in item.children" :key="i" :index="threeItem.powerRouteName">
						        {{ threeItem.powerName }}
						    </el-menu-item>
						</el-submenu>
						<el-menu-item v-else  :index="item.powerRouteName"  :key="item.powerRouteName">{{item.powerName}}</el-menu-item>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</el-scrollbar>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import SidebarItem from './SidebarItem'
	import {
		constantRouterMap
	} from '@/router'
	import {
		getUserPowers
	} from '@/api/admin'
	export default {
		computed: {
			...mapGetters([
				'sidebar',
				'name',
				'permissionRouters'
			]),
			isCollapse() {
				return !this.sidebar.opened
			}
		},
		mounted() {
			// this.getList()
		},
		data() {
			return {
				permission_routers: [{
                    createdAt: "2019-11-12 17:53:12",
                    icon: "el-icon-s-home",
                    level: "1",
                    pid: "1",
                    powerId: 99,
                    powerName: "线路列表",
                    powerRouteName: "/YueLine/YueyueLine",
                    status: "有效",
                    updatedAt: "2019-11-13 00:19:24",
                    children: [{
                        powerId: 101,
                        powerName: "线路列表",
                        level: "1",
                        pid: "99",
                        icon: "",
                        powerRouteName: "/YueLine/YueyueLine",
                        status: "有效"
                    },{
                        powerRouteName: '/hyattHotel/hotelList',
                        powerId: 101,
                        powerName: "酒店列表",
                        level: "1",
                        pid: "99",
                        icon: "",
                        status: "有效"
                    },]
                }],
				list: []
			}
		},
		methods: {
			getList() {
				getUserPowers({},{
				Authorization: 'Admin '+JSON.parse(localStorage.getItem('userInfo')).id+'.'+localStorage.getItem('token')
			}).then(res => {
					// this.permission_routers = res.data.data;
				})
			},
			openPath(index,indexPath){
					console.log(index,indexPath)
			    this.$router.push({
			        path:index
			    })
			}
		}
	}
</script>
<style scoped="scoped">
	/deep/ .nest-menu .el-submenu__title{background: #1f2d3d  !important;padding-left: 40px !important;}
</style>
