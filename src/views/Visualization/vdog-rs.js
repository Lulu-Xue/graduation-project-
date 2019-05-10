import { getNCBIValues, randomList, switchColumn, colorRange, backColor, lineColor, textColor, disableColor } from "./ncbi.js"

export async function initPage(NCBIData, myChart, oldNcList, NCBIValues) {
    let ncList = oldNcList;
    if (!oldNcList) ncList = randomList(NCBIData, 500);
    let data = readDataToMatrix(NCBIData, ncList, NCBIValues);
    console.log(data);
    switchColumn(data.cpData, 7, 0); // GC
    switchColumn(data.plData, 7, 0);
    switchColumn(data.mtData, 7, 0);

    switchColumn(data.cpData, 6, 1); // Size
    switchColumn(data.mtData, 6, 1);
    switchColumn(data.plData, 6, 1);

    let schema = [
        { name: 'name', index: 0, text: 'Organism/Name' },
        { name: 'Group', index: 1, text: 'Group' },
        { name: 'SubGroup', index: 2, text: 'SubGroup' },
        { name: 'Type', index: 3, text: 'Type' },
        { name: 'RefSeq', index: 4, text: 'RefSeq' },
        { name: 'INSDC', index: 5, text: 'INSDC' },
        { name: 'Size', index: 6, text: 'Size (Kb)' },
        { name: 'GC', index: 7, text: 'GC%' },
        { name: 'Protein', index: 8, text: 'Protein' },
        { name: 'rRNA', index: 9, text: 'rRNA' },
        { name: 'tRNA', index: 10, text: 'tRNA' },
        { name: 'oRNA', index: 11, text: 'Other RNA' },
        { name: 'Gene', index: 12, text: 'Gene' },
        { name: 'Pseudogene', index: 13, text: 'Pseudogene' },
        { name: 'RDate', index: 14, text: 'Release Date' },
        { name: 'MDate', index: 15, text: 'Modify Date' }
    ];
    let itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    };

    let option = {
        backgroundColor: backColor,
        color: colorRange,
        legend: [{
            id: 'dataType',
            top: 0,
            data: ['mtDNA', 'Plastid DNA', 'cpDNA'],
            textStyle: {
                color: textColor,
                fontSize: 16
            },
            inactiveColor: disableColor
        }],
        grid: {
            top: '10%',
            bottom: '10%',
            left: 115,
            right: 130
        },
        toolbox: {
            showTitle: false,
            feature: {
                dataZoom: {},
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
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                let value = obj.value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + obj.seriesName + ': ' + value[7]
                    + '</div>'
                    + schema[4].text + '：' + value[4] + '<br>'
                    + schema[1].text + '：' + value[6] + '<br>'
                    + schema[2].text + '：' + value[2] + '<br>'
                    + schema[6].text + '：' + value[1] + '<br>'
                    + schema[7].text + '：' + value[0] + '<br>'
                    + schema[12].text + '：' + value[12] + '<br>'
                    + schema[8].text + '：' + value[8] + '<br>';
            }
        },
        xAxis: {
            type: 'value',
            name: 'GC%',
            nameGap: 16,
            nameTextStyle: {
                color: textColor,
                fontSize: 14
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: lineColor
                }
            },
            scale: true
        },
        yAxis: {
            type: 'value',
            name: 'Size (Kb)',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                color: textColor,
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: lineColor
                }
            },
            splitLine: {
                show: false
            },
            scale: true
        },
        visualMap: [
            {
                type: 'continuous',
                right: 0,
                top: '10%',
                dimension: 12,
                min: parseInt(data.minGene),
                max: parseInt(data.maxGene),
                itemWidth: 30,
                itemHeight: 120,
                calculable: true,
                precision: 0,
                text: ['Size: Genes'],
                textGap: 30,
                textStyle: {
                    color: textColor
                },
                inRange: {
                    symbolSize: [1, 50]
                },
                outOfRange: {
                    symbolSize: [50, 100],
                    color: ['rgba(255,255,255,.2)']
                },
                controller: {
                    inRange: {
                        color: ['#dd4444']
                    },
                    outOfRange: {
                        color: [disableColor]
                    }
                }
            }, {
                type: 'continuous',
                right: 0,
                bottom: '5%',
                dimension: 8,
                min: parseInt(data.minPro),
                max: parseInt(data.maxPro),
                itemWidth: 30,
                itemHeight: 120,
                calculable: true,
                precision: 0,
                text: ['Darkness:  \nProteins'],
                textGap: 30,
                textStyle: {
                    color: textColor
                },
                inRange: {
                    colorLightness: [1, 0.5]
                },
                outOfRange: {
                    color: ['rgba(255,255,255,.2)']
                },
                controller: {
                    inRange: {
                        color: ['#fff']
                    },
                    outOfRange: {
                        color: [disableColor]
                    }
                }
            }, {
                type: 'piecewise',
                top: 20,
                left: 0,
                dimension: 6,
                // pieces: [
                //     { value: 'Animals', label: 'Animals' },
                //     { value: 'Fungi', label: 'Fungi' },
                //     { value: 'Plants', label: 'Plants' },
                //     { value: 'Protists', label: 'Protists' },
                //     { value: 'Other', label: 'Other' }
                // ],
                categories: ['Animals', 'Fungi', 'Plants', 'Protists', 'Other'],
                textStyle: {
                    color: textColor
                },
                inRange: {
                },
                outOfRange: {
                    color: ['rgba(255,255,255,.05)', 'rgba(255,255,255,.05)', 'rgba(255,255,255,.05)', 'rgba(255,255,255,.05)', 'rgba(255,255,255,.05)']
                },
                controller: {
                    inRange: {
                        symbol: "path://M512 976.7424c-256.67072 0-464.7424-208.07168-464.7424-464.73728C47.2576 255.32928 255.32928 47.2576 512 47.2576s464.7424 208.07168 464.7424 464.7424c0 256.67072-208.07168 464.7424-464.7424 464.7424z m225.41312-754.26816c-161.65888 106.2144-264.18176 424.86272-264.18176 424.86272L410.14272 490.54208l-130.11968 101.16096c55.20896 25.28768 134.0672 106.2144 201.09312 212.4288 47.31392-111.26784 193.20832-338.87744 264.18176-359.11168-27.5968-80.9216-11.82208-146.67776-7.8848-222.54592z m0 0",
                        color: '#ffffff'
                    },
                    outOfRange: {
                        color: disableColor
                    }
                }
            }
        ],
        series: [
            {
                name: 'mtDNA',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.mtData,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: 'mtDNA',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data: [
                        { type: 'average', name: 'Average', valueIndex: 0 },
                        { type: 'average', name: 'Average', valueIndex: 1 }
                    ]
                }
            },
            {
                name: 'Plastid DNA',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.plData,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: 'Plastid DNA',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data: [
                        { type: 'average', name: 'Average', valueIndex: 0 },
                        { type: 'average', name: 'Average', valueIndex: 1 }
                    ]
                }
            },
            {
                name: 'cpDNA',
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.cpData,
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                        }
                    },
                    data: [[{
                        name: 'cpDNA',
                        xAxis: 'min',
                        yAxis: 'min'
                    }, {
                        xAxis: 'max',
                        yAxis: 'max'
                    }]]
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    data: [
                        { type: 'average', name: 'Average', valueIndex: 0 },
                        { type: 'average', name: 'Average', valueIndex: 1 }
                    ]
                }
            }
        ]
    };

    myChart.setOption(option);
    console.log(myChart.getOption());
    let typeOnLegend = [];
    if (data.cpData.length == 0) {
        typeOnLegend.push({
            name: 'cpDNA'
        });
    }
    if (data.mtData.length == 0) {
        typeOnLegend.push({
            name: 'mtDNA'
        });
    }
    if (data.plData.length == 0) {
        typeOnLegend.push({
            name: 'Plastid DNA'
        });
    }
    myChart.dispatchAction({
        type: 'legendToggleSelect',
        batch: typeOnLegend
    });

    let typeOn = {
        Animals: false,
        Fungi: false,
        Plants: false,
        Protists: false,
        Other: false
    };
    for (let i = 0; i < data.cpData.length; i++) {
        if (data.cpData[i][6] === "Animals") typeOn.Animals = true;
        if (data.cpData[i][6] === "Fungi") typeOn.Fungi = true;
        if (data.cpData[i][6] === "Plants") typeOn.Plants = true;
        if (data.cpData[i][6] === "Protists") typeOn.Protists = true;
        if (data.cpData[i][6] === "Other") typeOn.Other = true;
        if (typeOn.Animals === true && typeOn.Fungi === true && typeOn.Plants === true && typeOn.Protists === true && typeOn.Other === true) {
            break;
        }
    }
    for (let i = 0; i < data.mtData.length; i++) {
        if (data.mtData[i][6] === "Animals") typeOn.Animals = true;
        if (data.mtData[i][6] === "Fungi") typeOn.Fungi = true;
        if (data.mtData[i][6] === "Plants") typeOn.Plants = true;
        if (data.mtData[i][6] === "Protists") typeOn.Protists = true;
        if (data.mtData[i][6] === "Other") typeOn.Other = true;
        if (typeOn.Animals === true && typeOn.Fungi === true && typeOn.Plants === true && typeOn.Protists === true && typeOn.Other === true) {
            break;
        }
    }
    for (let i = 0; i < data.plData.length; i++) {
        if (data.plData[i][6] === "Animals") typeOn.Animals = true;
        if (data.plData[i][6] === "Fungi") typeOn.Fungi = true;
        if (data.plData[i][6] === "Plants") typeOn.Plants = true;
        if (data.plData[i][6] === "Protists") typeOn.Protists = true;
        if (data.plData[i][6] === "Other") typeOn.Other = true;
        if (typeOn.Animals === true && typeOn.Fungi === true && typeOn.Plants === true && typeOn.Protists === true && typeOn.Other === true) {
            break;
        }
    }
    myChart.dispatchAction({
        type: 'selectDataRange',
        visualMapIndex: 2,
        selected: {
            'Animals': typeOn.Animals,
            'Fungi': typeOn.Fungi,
            'Plants': typeOn.Plants,
            'Protists': typeOn.Protists,
            'Other': typeOn.Other
        }
    });

    myChart.on('click', function (params) {
        if (params.componentType === 'series') {
            if (params.seriesType === 'scatter') {
                // let type;
                // switch (params.data[3]) {
                //     case "mitochondrion":
                //         type = "mtDNA"; break;
                //     case "plastid":
                //         type = "plDNA"; break;
                //     case "chloroplast":
                //         type = "cpDNA"; break;
                // }
                if (params.data[4] != '-') {
                    window.open("http://bio.njfu.edu.cn/CPTree/service/cpdata.php?type=vdog&id=" + params.data[4]);
                }
            }
        }
    });
    if (!oldNcList) return ncList.join(",");
}

function readDataToMatrix(NCBIData, ncNumbers, NCBIValues) {
    let re = new Array();

    re["plData"] = new Array();
    re["mtData"] = new Array();
    re["cpData"] = new Array();

    re["minGene"] = 65535;
    re["maxGene"] = 0;
    re["minPro"] = 65535;
    re["maxPro"] = 0;

    let res = NCBIValues ? NCBIValues : getNCBIValues(NCBIData, ncNumbers);
    for (let i = 0; i < res.length; i++) {
        let line = res[i].slice();
        switch (line[3]) {
            case 'Plastid DNA':
                re["plData"].push(line); break;
            case 'mtDNA':
                re["mtData"].push(line); break;
            case 'cpDNA':
                re["cpData"].push(line); break;
        }

        if (parseInt(line[8]) > re["maxPro"]) re["maxPro"] = line[8];
        if (parseInt(line[12]) > re["maxGene"]) re["maxGene"] = line[12];
        if (parseInt(line[8]) < re["minPro"]) re["minPro"] = line[8];
        if (parseInt(line[12]) < re["minGene"]) re["minGene"] = line[12];
    }

    return re;
}