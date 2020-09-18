<template>
    <div :class="className" :id="id" :style="{height:'400px',width:'100%'}"/>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'

    let dateList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    let echartsList = [
        {
            name: '注册',
            dataList: [220, 182, 191, 134, 150, 120, 108, 125, 145, 122, 165, 122]
        },
        {
            name: '开卡',
            dataList: [18, 122, 131, 194, 110, 99, 110, 145, 115, 82, 235, 342]
        },
        {
            name: '邀请',
            dataList: [3, 12, 31, 64, 80, 120, 90, 94, 54, 175, 145, 208]
        },
        {
            name: '分配',
            dataList: [182, 218, 177, 145, 184, 194, 143, 87, 89, 112, 43, 234]
        }
    ]
    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            // echartsList: {
            //     type: Array,
            //     default: []
            // }
        },
        data() {
            return {
                chart: null,
                echartsList: echartsList,//接收的数据待处理
                dataLists: [],//数据处理后的charts数据
                dataInfo:[],//处理数据后要展示的数据内容
                dateList: dateList,//处理数据后要展示的数据时间段
            }
        },
        mounted() {
            this.echartsList.map(i=>{
                this.dataLists.push(
                    {
                        name: i.name,
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                                }, {
                                    offset: 0.8,
                                    color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                                borderColor: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                                borderWidth: 12

                            }
                        },
                        data: i.dataList
                    }
                )
                this.dataInfo.push(i.name)
            })
            this.initChart()

        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))
                this.chart.setOption({
                    backgroundColor: '#394056',
                    title: {
                        top: 20,
                        text: 'Requests',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#F1F1F3'
                        },
                        left: '1%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        top: 20,
                        icon: 'rect',
                        itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 13,
                        data: this.dataInfo,
                        right: '4%',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        top: 100,
                        left: '2%',
                        right: '2%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            },
                            data: this.dateList
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(人数)',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        }
                    ],
                    series: this.dataLists
                })
            }
        }
    }
</script>
