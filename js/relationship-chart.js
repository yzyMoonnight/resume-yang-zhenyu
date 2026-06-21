function initRelationshipChart() {
    const chart = echarts.init(document.getElementById('relationshipChart'));

    // 定义关系数据
    const relationships = [
        // 家人 - 红色系
        { name: '周秀娟', relation: '母亲', category: '家人', color: '#ff6b6b' },
        { name: '杨华', relation: '父亲', category: '家人', color: '#ff5252' },
        { name: '杨俊熙', relation: '弟弟', category: '家人', color: '#ff8a80' },

        // 恋人 - 粉色系
        { name: '王菲', relation: '伴侣', category: '恋人', color: '#fd79a8' },

        // 朋友 - 青色系
        { name: '赖科磊', relation: '挚友', category: '朋友', color: '#4ecdc4' },
        { name: '范坤鹏', relation: '发小', category: '朋友', color: '#45b7d1' },
        { name: '邱语枫', relation: '青梅竹马', category: '朋友', color: '#26d0ce' },

        // 老师 - 黄色系
        { name: '张亚雪', relation: '人生导师', category: '老师', color: '#ffd93d' },

        // 同学 - 绿色系
        { name: '万金', relation: '高中同学', category: '同学', color: '#6bcf7f' },
        { name: '余欣阳', relation: '高中同学', category: '同学', color: '#7dd87d' },
        { name: '章佳俊', relation: '同桌', category: '同学', color: '#90ee90' },
        { name: '周彦杰', relation: '大学同学', category: '同学', color: '#98fb98' },

        // 室友 - 紫色系
        { name: '胡嘉豪', relation: '室友', category: '室友', color: '#a29bfe' },
        { name: '俞凯瑞', relation: '室友', category: '室友', color: '#b8a9e8' },
        { name: '何建民', relation: '室友', category: '室友', color: '#c4b8f0' }
    ];

    // 构建节点数据
    const nodes = [
        {
            name: '杨振宇',
            symbolSize: 100,
            itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    { offset: 0, color: '#667eea' },
                    { offset: 0.7, color: '#764ba2' },
                    { offset: 1, color: '#f093fb' }
                ]),
                shadowColor: 'rgba(102, 126, 234, 0.8)',
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowOffsetY: 0
            },
            label: {
                show: true,
                formatter: 'YZY\n杨振宇',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
                textBorderColor: 'rgba(0, 0, 0, 0.3)',
                textBorderWidth: 2
            },
            value: '电子信息工程\n重庆理工大学2023级',
            category: 0,
            fixed: false
        }
    ];

    // 添加其他节点
    relationships.forEach((person, index) => {
        nodes.push({
            name: person.name,
            symbolSize: 60,
            itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    { offset: 0, color: person.color },
                    { offset: 1, color: adjustColor(person.color, -30) }
                ]),
                shadowColor: person.color + '80',
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowOffsetY: 0
            },
            label: {
                show: true,
                formatter: '{b}',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
                textBorderColor: 'rgba(0, 0, 0, 0.3)',
                textBorderWidth: 2
            },
            value: person.relation,
            category: index + 1
        });
    });

    // 构建连接关系
    const links = relationships.map(person => ({
        source: '杨振宇',
        target: person.name,
        lineStyle: {
            width: 2,
            curveness: 0.2,
            opacity: 0.6,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#667eea' },
                { offset: 1, color: person.color }
            ])
        }
    }));

    const option = {
        title: {
            text: '杨振宇的人际关系网络',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff',
                fontSize: 22,
                fontWeight: 'bold',
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowBlur: 5,
                textShadowOffsetX: 2,
                textShadowOffsetY: 2
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#667eea',
            borderWidth: 2,
            padding: [10, 15],
            textStyle: {
                color: '#333',
                fontSize: 13
            },
            formatter: function(params) {
                if (params.data.value) {
                    return '<div style="text-align:center;">' +
                        '<strong style="font-size:16px;color:#667eea;">' + params.data.name + '</strong><br/>' +
                        '<span style="color:#666;font-size:12px;">关系：</span>' +
                        '<span style="color:#333;font-weight:bold;">' + params.data.value + '</span>' +
                        '</div>';
                }
                return params.data.name;
            }
        },
        legend: [{
            data: ['本人', '家人', '恋人', '朋友', '老师', '同学', '室友'],
            orient: 'vertical',
            right: 20,
            top: 'middle',
            textStyle: {
                color: '#fff',
                fontSize: 13
            },
            itemWidth: 20,
            itemHeight: 14,
            itemGap: 12
        }],
        series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            animationDuration: 1000,
            animationEasingUpdate: 'quinticInOut',
            data: nodes,
            links: links,
            categories: [
                { name: '本人' },
                { name: '家人' },
                { name: '恋人' },
                { name: '朋友' },
                { name: '老师' },
                { name: '同学' },
                { name: '室友' }
            ],
            roam: true,
            draggable: true,
            force: {
                repulsion: 500,
                edgeLength: 200,
                gravity: 0.1,
                friction: 0.6,
                layoutAnimation: true
            },
            label: {
                show: true,
                position: 'bottom',
                distance: 5,
                formatter: '{b}',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
                textBorderColor: 'rgba(0, 0, 0, 0.5)',
                textBorderWidth: 2,
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 3
            },
            lineStyle: {
                curveness: 0.2,
                opacity: 0.7
            },
            emphasis: {
                focus: 'adjacency',
                scale: true,
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                lineStyle: {
                    width: 4,
                    opacity: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(102, 126, 234, 0.8)'
                },
                itemStyle: {
                    shadowBlur: 25,
                    shadowColor: 'rgba(255, 255, 255, 0.8)'
                }
            },
            blur: {
                itemStyle: {
                    opacity: 0.3
                },
                lineStyle: {
                    opacity: 0.1
                }
            }
        }]
    };

    chart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 颜色调整辅助函数（使颜色变深或变浅）
function adjustColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initRelationshipChart);
