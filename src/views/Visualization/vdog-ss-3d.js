import { getColumn, getNCBIValues, backColor, lineColor, textColor, disableColor } from "./ncbi.js"

export async function initPage(NCBIData, myChart, oldNcList, NCBIValues) {
    let ncList = oldNcList;
    // let schema = [
    //     { name: 'name', index: 0, value: 'Organism/Name' },
    //     { name: 'Group', index: 1, value: 'Group' },
    //     { name: 'SubGroup', index: 2, value: 'SubGroup' },
    //     { name: 'Type', index: 3, value: 'Type' },
    //     { name: 'RefSeq', index: 4, value: 'RefSeq' },
    //     { name: 'INSDC', index: 5, value: 'INSDC' },
    //     { name: 'Size', index: 6, value: 'Size (Kb)' },
    //     { name: 'GC', index: 7, value: 'GC%' },
    //     { name: 'Protein', index: 8, value: 'Protein' },
    //     { name: 'rRNA', index: 9, value: 'rRNA' },
    //     { name: 'tRNA', index: 10, value: 'tRNA' },
    //     { name: 'oRNA', index: 11, value: 'Other RNA' },
    //     { name: 'Gene', index: 12, value: 'Gene' },
    //     { name: 'Pseudogene', index: 13, value: 'Pseudogene' },
    //     { name: 'RDate', index: 14, value: 'Release Date' },
    //     { name: 'MDate', index: 15, value: 'Modify Date' }
    // ];

    let ncData = readDataToMatrix(NCBIData, ncList, NCBIValues);

    let option = {
        backgroundColor: backColor,
        tooltip: {
            formatter: function (obj) {
                let value = obj.value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + value[5]
                    + '</div>'
                    + value[1] + "<br>Gene : " + value[2] + "<br>"
                    + "GC : " + value[0] + "<br>" + "Size : " + value[3];
            }
        },
        toolbox: {
            showTitle: false,
            feature: {
                saveAsImage: {}
            },
            iconStyle: {
                normal: {
                    borderColor: textColor,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                }
            }
        },
        color: ['#fe0300', '#00ff0d', '#f09a09', '#1710c0', '#f5f811'],
        legend: [{
            id: 'dataGroup',
            top: 0,
            data: ['Animals', 'Plants', 'Fungi', 'Protists', 'Other'],
            selectedMode: 'single',
            inactiveColor: disableColor,
            textStyle: {
                color: textColor,
                fontSize: 16
            }
        }],
        grid: {
            top: '10%',
        },
        visualMap: [
            {
                type: 'continuous',
                dimension: 3,
                min: ncData.minSize,
                max: ncData.maxSize,
                show: false,
                inRange: {
                    symbolSize: [10, 100]
                }
            }
        ],
        grid3D: {
            light: {
                main: {
                    intensity: 1.2
                },
                ambient: {
                    intensity: 0.3
                }
            },
            viewControl: {
                autoRotate: true,
                autoRotateAfterStill: 10,
                minDistance: 150,
                maxDistance: 400,
            }
        },
        xAxis3D: {
            type: 'value',
            name: 'GC',
            nameTextStyle: {
                color: textColor
            },
            axisLine: {
                color: lineColor
            },
            axisLabel: {
                textStyle: {
                    color: textColor
                }
            },
            axisPointer: {
                lineStyle: {
                    color: disableColor
                }
            }
        },
        yAxis3D: {
            type: 'category',
            name: 'SubGroup',
            data: getColumn(NCBIData, 2, 'all', 'Animals'),
            nameTextStyle: {
                color: textColor
            },
            axisLine: {
                color: lineColor
            },
            axisLabel: {
                textStyle: {
                    color: textColor
                }
            },
            axisPointer: {
                lineStyle: {
                    color: disableColor
                }
            }
        },
        zAxis3D: {
            type: 'value',
            name: 'Gene',
            nameTextStyle: {
                color: textColor
            },
            axisLine: {
                color: lineColor
            },
            axisLabel: {
                textStyle: {
                    color: textColor
                }
            },
            axisPointer: {
                lineStyle: {
                    color: disableColor
                }
            }
        },
        series: [{
            name: 'Animals',
            type: 'scatter3D',
            data: data2Dto3D(ncData.Animals),
            shading: 'color',
            label: {
                show: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#dd4444'
                    }
                },
                itemStyle: {
                    color: '#dd4444'
                }
            }
        }, {
            name: 'Plants',
            type: 'scatter3D',
            data: data2Dto3D(ncData.Plants),
            shading: 'color',
            label: {
                show: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#dd4444'
                    }
                },
                itemStyle: {
                    color: '#dd4444'
                }
            }
        }, {
            name: 'Fungi',
            type: 'scatter3D',
            data: data2Dto3D(ncData.Fungi),
            shading: 'color',
            label: {
                show: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#dd4444'
                    }
                },
                itemStyle: {
                    color: '#dd4444'
                }
            }
        }, {
            name: 'Protists',
            type: 'scatter3D',
            data: data2Dto3D(ncData.Protists),
            shading: 'color',
            label: {
                show: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#dd4444'
                    }
                },
                itemStyle: {
                    color: '#dd4444'
                }
            }
        }, {
            name: 'Other',
            type: 'scatter3D',
            data: data2Dto3D(ncData.Other),
            shading: 'color',
            label: {
                show: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#dd4444'
                    }
                },
                itemStyle: {
                    color: '#dd4444'
                }
            }
        }]
    }
    myChart.setOption(option);
    myChart.on('legendselectchanged', function (params) {
        myChart.setOption({
            yAxis3D: {
                name: 'SubGroup',
                data: getColumn(NCBIData, 2, 'all', params.name)
            }
        })
    });
    myChart.on('click', function (params) {
        if (params.componentType === 'series') {
            if (params.seriesType === 'scatter3D') {
                window.open("http://bio.njfu.edu.cn/CPTree/service/cpdata.php?type=vdog&id=" + params.data.value[6]);
            }
        }
    });
}

function data2Dto3D(data2D) {
    var re = new Array();
    for (var i = 0; i < data2D.length; i++) {
        re.push([data2D[i][7], data2D[i][2], data2D[i][12], data2D[i][6], data2D[i][1], data2D[i][0], data2D[i][4]]);
    }
    return re;
}

function readDataToMatrix(NCBIData, ncNumbers, NCBIValues) {
    let re = new Array();

    re["Animals"] = new Array();
    re["Plants"] = new Array();
    re["Fungi"] = new Array();
    re["Protists"] = new Array();
    re["Other"] = new Array();

    re["maxSize"] = 0;
    re["minSize"] = 65535;

    let res = NCBIValues ? NCBIValues : getNCBIValues(NCBIData, ncNumbers);
    for (let i = 0; i < res.length; i++) {
        let line = res[i];
        if (+line[6] > re["maxSize"]) re["maxSize"] = +line[6];
        if (+line[6] < re["minSize"]) re["minSize"] = +line[6];
        switch (line[1]) {
            case 'Animals':
                re["Animals"].push(line); break;
            case 'Plants':
                re["Plants"].push(line); break;
            case 'Fungi':
                re["Fungi"].push(line); break;
            case 'Protists':
                re["Protists"].push(line); break;
            case 'Other':
                re["Other"].push(line); break;
        }

    }

    return re;
}