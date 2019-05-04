import Vue from "vue"
import { getNCBIValues, randomList, switchColumn, colorRange, backColor, lineColor, textColor, disableColor } from "./ncbi.js"

let CATEGORY_DIM_COUNT = 8; // 平行坐标系坐标轴维度个数
let GAP = 1; // 网格图之间的间距
let BASE_LEFT = 5; // 网格图距左百分比
let BASE_TOP = 10; // 网格图距右百分比
let GRID_WIDTH = (100 - BASE_LEFT) / CATEGORY_DIM_COUNT - GAP - 1;
let GRID_HEIGHT = (100 - BASE_TOP) / CATEGORY_DIM_COUNT - GAP - 1;
let CATEGORY_DIM = 3; // 筛选的列
let SYMBOL_SIZE = 4;

function retrieveScatterData(data, dimX, dimY) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        let item = [data[i][dimX], data[i][dimY]];
        item[2] = data[i][2];
        item[CATEGORY_DIM + 1] = dimX;  // x
        item[CATEGORY_DIM + 2] = dimY;  // y
        item[CATEGORY_DIM + 3] = data[i][0];  //name
        item[CATEGORY_DIM + 4] = data[i][4]; //NC
        item[CATEGORY_DIM] = data[i][CATEGORY_DIM];  //type
        result.push(item);
    }
    return result;
}

function generateGrids(option, data, schema) {
    let index = 0;

    for (let i = 1; i < CATEGORY_DIM_COUNT; i++) {
        for (let j = 0; j < CATEGORY_DIM_COUNT - 1; j++) {
            if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
                continue;
            }

            option.grid.push({
                left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                width: GRID_WIDTH + '%',
                height: GRID_HEIGHT + '%'
            });

            //只能在单个坐标系中选择，不能跨坐标轴
            option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
            option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

            option.xAxis.push({
                splitNumber: 3,
                position: 'top',
                axisLine: {
                    show: j === 0,
                    onZero: false
                },
                axisTick: {
                    show: j === 0,
                    inside: true
                },
                axisLabel: {
                    show: false,//j === 0,
                    textStyle: {
                        color: textColor
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: lineColor
                    }
                },
                type: 'value',
                gridIndex: index,
                scale: true,
                name: j === 0 ? schema[i + 6].text : "",
                nameLocation: 'middle',
                nameGap: 5,
                nameTextStyle: {
                    color: textColor
                }
            });

            option.yAxis.push({
                splitNumber: 3,
                position: 'right',
                axisLine: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    onZero: false
                },
                axisTick: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    inside: true
                },
                axisLabel: {
                    show: false,//i === CATEGORY_DIM_COUNT - 1,
                    textStyle: {
                        color: textColor
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: lineColor
                    }
                },
                type: 'value',
                gridIndex: index,
                scale: true,
                name: i === CATEGORY_DIM_COUNT - 1 ? schema[j + 6].text : "",
                nameLocation: 'middle',
                nameTextStyle: {
                    color: textColor
                }
            });

            option.series.push({
                type: 'scatter',
                symbolSize: SYMBOL_SIZE,
                xAxisIndex: index,
                yAxisIndex: index,
                data: retrieveScatterData(data, i + 6, j + 6)
            });

            //option.visualMap.seriesIndex.push(option.series.length - 1); //all

            index++;
        }
    }
}



export async function initPage(NCBIData, myChart, oldNcList, NCBIValues) {
    let ncList = oldNcList;
    if (!oldNcList) ncList = randomList(NCBIData, 200);
    let data = NCBIValues ? NCBIValues : readDataToMatrix(NCBIData, ncList);

    switchColumn(data, 1, 2); // Group

    let schema = [
        { name: 'name', index: 0, text: 'Organism/Name' },
        { name: 'SubGroup', index: 1, text: 'SubGroup' },
        { name: 'Group', index: 2, text: 'Group' },
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

    let option = {
        //animation: false,
        backgroundColor: backColor,
        brush: {
            brushLink: 'all',
            throttleType: 'debounce',
            xAxisIndex: [],
            yAxisIndex: [],
            inBrush: {
                opacity: 1
            },
            outOfBrush: {
                opacity: 0.2
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
        visualMap: [{
            type: 'piecewise',
            categories: ["mtDNA", "Plastid DNA", "cpDNA"],
            dimension: CATEGORY_DIM,
            orient: 'horizontal',
            top: 0,
            left: 'center',
            textStyle: {
                color: textColor,
                fontSize: 16
            },
            inRange: {
                color: colorRange,
            },
            outOfRange: {
                color: disableColor,
            },
            controller: {
                inRange: {
                    symbol: 'circle'
                },
                outOfRange: {
                    symbol: 'circle'
                }
            },
            //seriesIndex: [0] // all
        }, {
            type: 'piecewise',
            top: 20,
            left: 0,
            dimension: 2,
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
        }],
        tooltip: {
            trigger: 'item',
            formatter: function (obj) {
                let value = obj.value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + value[CATEGORY_DIM] + ': ' + value[CATEGORY_DIM + 3] + '(' + value[CATEGORY_DIM + 4] + ')'
                    + '</div>'
                    + 'X (' + schema[value[CATEGORY_DIM + 1]].text + ') ：' + value[0] + '<br>'
                    + 'Y (' + schema[value[CATEGORY_DIM + 2]].text + ') ：' + value[1] + '<br>'
                    + schema[2].text + ' ：' + value[2] + '<br>';
            }
        },
        parallelAxis: [
            { dim: 6, name: schema[6].text },
            { dim: 7, name: schema[7].text },
            { dim: 8, name: schema[8].text },
            { dim: 9, name: schema[9].text },
            { dim: 10, name: schema[10].text },
            { dim: 11, name: schema[11].text },
            { dim: 12, name: schema[12].text },
            { dim: 13, name: schema[13].text }
        ],
        parallel: {
            bottom: '5%',
            left: '5%',
            height: '33%',
            width: '50%',
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameRotate: -30,
                splitNumber: 3,
                nameTextStyle: {
                    fontSize: 14
                },
                axisLine: {
                    lineStyle: {
                        color: lineColor
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: lineColor
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: textColor
                    }
                }
            }
        },
        grid: [],
        xAxis: [],
        yAxis: [],
        series: [
            {
                name: 'parallel',
                type: 'parallel',
                data: data,
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 0.2,
                        opacity: 0.3
                    }
                }
            }
        ]
    };

    generateGrids(option, data, schema);
    myChart.setOption(option);

    let typeOn = {
        mtDNA: false,
        plDNA: false,
        cpDNA: false,
        Animals: false,
        Fungi: false,
        Plants: false,
        Protists: false,
        Other: false
    };
    for (let i = 0; i < data.length; i++) {
        if (data[i][CATEGORY_DIM] === "mtDNA") typeOn.mtDNA = true;
        if (data[i][CATEGORY_DIM] === "Plastid DNA") typeOn.plDNA = true;
        if (data[i][CATEGORY_DIM] === "cpDNA") typeOn.cpDNA = true;
        if (data[i][2] === "Animals") typeOn.Animals = true;
        if (data[i][2] === "Fungi") typeOn.Fungi = true;
        if (data[i][2] === "Plants") typeOn.Plants = true;
        if (data[i][2] === "Protists") typeOn.Protists = true;
        if (data[i][2] === "Other") typeOn.Other = true;
        if (typeOn.mtDNA === true && typeOn.plDNA === true && typeOn.cpDNA === true && typeOn.Animals === true && typeOn.Fungi === true && typeOn.Plants === true && typeOn.Protists === true && typeOn.Other === true) {
            break;
        }
    }
    myChart.dispatchAction({
        type: 'selectDataRange',
        selected: {
            'mtDNA': typeOn.mtDNA,
            'Plastid DNA': typeOn.plDNA,
            'cpDNA': typeOn.cpDNA,
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
                // let type = "";
                // switch (params.data[CATEGORY_DIM]) {
                //     case "mtDNA":
                //         type = "mtDNA"; break;
                //     case "Plastid DNA":
                //         type = "plDNA"; break;
                //     case "cpDNA":
                //         type = "cpDNA"; break;
                // }
                if (params.data[7] != '-') {
                    window.open("http://bio.njfu.edu.cn/CPTree/service/cpdata.php?type=vdog&id=" + params.data[7]);
                }
            }
        }
    });
    myChart.on('brushselected', function (params) {
        let brushSelected = params.batch[0].selected[0];
        if (brushSelected.dataIndex.length > 0) {
            let data = myChart.getOption().series[brushSelected.seriesIndex].data;
            let typeOn = {
                mtDNA: false,
                plDNA: false,
                cpDNA: false,
                Animals: false,
                Fungi: false,
                Plants: false,
                Protists: false,
                Other: false
            };
            for (let i = 0, len = brushSelected.dataIndex.length; i < len; i++) {
                if (data[brushSelected.dataIndex[i]][CATEGORY_DIM] === "mtDNA") typeOn.mtDNA = true;
                if (data[brushSelected.dataIndex[i]][CATEGORY_DIM] === "Plastid DNA") typeOn.plDNA = true;
                if (data[brushSelected.dataIndex[i]][CATEGORY_DIM] === "cpDNA") typeOn.cpDNA = true;
                if (data[brushSelected.dataIndex[i]][2] === "Animals") typeOn.Animals = true;
                if (data[brushSelected.dataIndex[i]][2] === "Fungi") typeOn.Fungi = true;
                if (data[brushSelected.dataIndex[i]][2] === "Plants") typeOn.Plants = true;
                if (data[brushSelected.dataIndex[i]][2] === "Protists") typeOn.Protists = true;
                if (data[brushSelected.dataIndex[i]][2] === "Other") typeOn.Other = true;
                if (typeOn.mtDNA === true && typeOn.plDNA === true && typeOn.cpDNA === true && typeOn.Animals === true && typeOn.Fungi === true && typeOn.Plants === true && typeOn.Protists === true && typeOn.Other === true) {
                    break;
                }
            }
            myChart.dispatchAction({
                type: 'selectDataRange',
                selected: {
                    'mtDNA': typeOn.mtDNA,
                    'Plastid DNA': typeOn.plDNA,
                    'cpDNA': typeOn.cpDNA,
                    'Animals': typeOn.Animals,
                    'Fungi': typeOn.Fungi,
                    'Plants': typeOn.Plants,
                    'Protists': typeOn.Protists,
                    'Other': typeOn.Other
                }
            });
        }
    });
    if (!oldNcList) return ncList.join(",");
}

function readDataToMatrix(NCBIData, ncNumbers) {
    let res = getNCBIValues(NCBIData, ncNumbers);
    return res;
}