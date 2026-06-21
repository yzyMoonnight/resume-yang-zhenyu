function initMapVisualization() {
    const mapChart = echarts.init(document.getElementById('mapChart'));

    // 显示加载状态
    mapChart.showLoading();

    // 加载重庆GeoJSON数据
    fetch('data/ChongQing.json')
        .then(response => response.json())
        .then(geoJson => {
            mapChart.hideLoading();

            // 注册地图数据
            echarts.registerMap('chongqing', geoJson);

            // 配置地图选项
            const option = {
                title: {
                    text: '杨振宇的家乡 - 重庆',
                    subtext: '就读于重庆理工大学',
                    left: 'center',
                    textStyle: {
                        color: '#333',
                        fontSize: 18,
                        fontWeight: 'bold'
                    },
                    subtextStyle: {
                        color: '#666',
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if (params.name) {
                            return '<strong>' + params.name + '</strong><br/>这是我的家乡重庆';
                        }
                        return params.name || '未知区域';
                    }
                },
                visualMap: {
                    min: 0,
                    max: 100,
                    left: 'left',
                    top: 'bottom',
                    text: ['重要程度高', '重要程度低'],
                    calculable: true,
                    inRange: {
                        color: ['#e0f3f8', '#ffffbf', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c']
                    }
                },
                series: [
                    {
                        name: '重庆各区县',
                        type: 'map',
                        map: 'chongqing',
                        roam: true,
                        label: {
                            show: true,
                            fontSize: 10
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 12,
                                color: '#fff'
                            },
                            itemStyle: {
                                areaColor: '#ffeb3b',
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: [
                            {name: '渝中区', value: 95},
                            {name: '江北区', value: 90},
                            {name: '南岸区', value: 85},
                            {name: '沙坪坝区', value: 88},
                            {name: '九龙坡区', value: 82},
                            {name: '大渡口区', value: 75},
                            {name: '巴南区', value: 78},
                            {name: '渝北区', value: 92},
                            {name: '北碚区', value: 80},
                            {name: '万州区', value: 70},
                            {name: '涪陵区', value: 65},
                            {name: '长寿区', value: 60},
                            {name: '江津区', value: 58},
                            {name: '合川区', value: 55},
                            {name: '永川区', value: 52},
                            {name: '南川区', value: 48},
                            {name: '綦江县', value: 50},
                            {name: '潼南县', value: 45},
                            {name: '铜梁县', value: 47},
                            {name: '大足县', value: 43},
                            {name: '荣昌县', value: 40},
                            {name: '璧山县', value: 42},
                            {name: '垫江县', value: 38},
                            {name: '丰都县', value: 35},
                            {name: '忠县', value: 37},
                            {name: '云阳县', value: 33},
                            {name: '奉节县', value: 30},
                            {name: '巫山县', value: 28},
                            {name: '巫溪县', value: 25},
                            {name: '石柱土家族自治县', value: 32},
                            {name: '秀山土家族苗族自治县', value: 22},
                            {name: '酉阳土家族苗族自治县', value: 20},
                            {name: '彭水苗族土家族自治县', value: 27},
                            {name: '武隆县', value: 35},
                            {name: '梁平县', value: 40},
                            {name: '城口县', value: 18},
                            {name: '开县', value: 45},
                            {name: '万盛区', value: 38},
                            {name: '双桥区', value: 35}
                        ]
                    }
                ]
            };

            mapChart.setOption(option);

            // 添加点击事件
            mapChart.on('click', function(params) {
                console.log('点击了：', params.name);
                alert('你选择了：' + params.name + '\n\n我是杨振宇，来自重庆，就读于重庆理工大学！');
            });
        })
        .catch(error => {
            mapChart.hideLoading();
            console.error('加载地图数据失败：', error);
            mapChart.setOption({
                title: {
                    text: '地图加载失败，请检查data/ChongQing.json文件是否存在',
                    left: 'center'
                }
            });
        });

    // 响应式调整
    window.addEventListener('resize', function() {
        mapChart.resize();
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initMapVisualization);
