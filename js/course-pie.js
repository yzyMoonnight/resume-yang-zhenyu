function initCourseCharts() {
    // 饼图
    const pieChart = echarts.init(document.getElementById('coursePieChart'));

    const pieOption = {
        title: {
            text: '电子信息工程专业核心课程成绩分布',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2d3748'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}分 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle',
            textStyle: {
                fontSize: 12
            }
        },
        series: [
            {
                name: '课程成绩',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}\n{c}分'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: [
                    { value: 95, name: 'Python程序设计' },
                    { value: 93, name: '嵌入式系统' },
                    { value: 92, name: '电路分析' },
                    { value: 90, name: '数字电子技术' },
                    { value: 89, name: '通信原理' },
                    { value: 88, name: '模拟电子技术' },
                    { value: 87, name: '数字信号处理' },
                    { value: 85, name: '信号与系统' }
                ]
            }
        ]
    };

    pieChart.setOption(pieOption);

    // 柱状图
    const barChart = echarts.init(document.getElementById('courseBarChart'));

    const barOption = {
        title: {
            text: '专业课程成绩详细展示',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2d3748'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Python\n程序设计', '嵌入式\n系统', '电路\n分析', '数字\n电子', '通信\n原理', '模拟\n电子', '数字\n信号', '信号\n系统'],
            axisLabel: {
                interval: 0,
                fontSize: 11
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            name: '成绩（分）',
            nameTextStyle: {
                fontSize: 14
            }
        },
        series: [
            {
                name: '成绩',
                type: 'bar',
                data: [95, 93, 92, 90, 89, 88, 87, 85],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ]),
                    borderRadius: [5, 5, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}分',
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均分' }
                    ],
                    lineStyle: {
                        color: '#ff6b6b',
                        type: 'dashed'
                    },
                    label: {
                        formatter: '平均: {c}'
                    }
                }
            }
        ]
    };

    barChart.setOption(barOption);

    // 响应式调整
    window.addEventListener('resize', function() {
        pieChart.resize();
        barChart.resize();
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initCourseCharts);
