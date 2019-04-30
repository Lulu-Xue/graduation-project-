import Vue from "vue";
import { getNCType, getNCBIValues, randomList, switchColumn, colorRange, backColor, lineColor, textColor, disableColor } from "./ncbi.js"

export function initPage(myChart, popNotification) {
    Vue.axios.get("/genomes_organelles.txt").then((res) => {
        let NCBIData = res.data.split("\n");
        let ncNode = document.querySelector("#ncNumbers");
        let ncList = null;
        if (ncNode.value == "no nc") {
            ncList = randomList(NCBIData, 20);
            ncNode.value = ncList.join(",");
            popNotification("There is no input data and 20 random genome data have been applied.")
        }
        let schema = [
            { name: 'name', index: 0, value: 'Organism/Name' },
            { name: 'Group', index: 1, value: 'Group' },
            { name: 'SubGroup', index: 2, value: 'SubGroup' },
            { name: 'Type', index: 3, value: 'Type' },
            { name: 'RefSeq', index: 4, value: 'RefSeq' },
            { name: 'INSDC', index: 5, value: 'INSDC' },
            { name: 'Size', index: 6, value: 'Size (Kb)' },
            { name: 'GC', index: 7, value: 'GC%' },
            { name: 'Protein', index: 8, value: 'Protein' },
            { name: 'rRNA', index: 9, value: 'rRNA' },
            { name: 'tRNA', index: 10, value: 'tRNA' },
            { name: 'oRNA', index: 11, value: 'Other RNA' },
            { name: 'Gene', index: 12, value: 'Gene' },
            { name: 'Pseudogene', index: 13, value: 'Pseudogene' },
            { name: 'RDate', index: 14, value: 'Release Date' },
            { name: 'MDate', index: 15, value: 'Modify Date' }
        ];
        let header = ['Other RNA', 'rRNA', 'tRNA', 'Protein', 'Gene', 'Pseudogene'];
        let xData = ncList;

        let ncData = readDataToMatrix(NCBIData, ncList);
        switchColumn(ncData.data, 0, 3);

        let option = {
            tooltip: {
                formatter: function (obj) {
                    let value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + xData[value[0]]
                        + '</div>'
                        + header[value[1]] + " : " + value[2];
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
            visualMap: {
                type: 'continuous',
                min: ncData.min,
                max: +ncData.max,
                inRange: {
                    color: colorRange.reverse()
                },
                textStyle: {
                    color: textColor
                }
            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 123,
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
                    distance: 300,
                    autoRotateAfterStill: 10,
                    minDistance: 150,
                    maxDistance: 400,
                }
            },
            xAxis3D: {
                type: 'category',
                data: xData,
                name: '',
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
                data: header,
                name: '',
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
                name: '',
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
                type: 'bar3D',
                data: data2Dto3D(ncData.data),
                shading: 'color',
                label: {
                    show: false
                },
                itemStyle: {
                    opacity: 0.5
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
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                if (params.seriesType === 'bar3D') {
                    let nc = ncList[params.data.value[0]];
                    window.open("dataview.php?type=" + getNCType(NCBIData, nc) + "&id=" + nc);
                }
            }
        });
    });
}

function data2Dto3D(data2D) {
    var re = new Array();
    for (var i=0; i<data2D.length; i++) {
        for (var j=0; j<data2D[i].length; j++) {
            re.push( {value: [ i, j, data2D[i][j] ]} );
        }
    }
    return re;
}

function readDataToMatrix(NCBIData, ncNumbers) {
    let re = new Array();

    re["data"] = new Array();
    re["max"] = 0;
    re["min"] = 65535;

    let res = getNCBIValues(NCBIData, ncNumbers);
    for (let i = 0; i < res.length; i++) {
        let line = res[i];
        re["data"].push(line.slice(8, 14));
        for (let j = 0; j <= re["data"][i].length; j++) {
            if (re["data"][i][j] === "-") {
                re["data"][i][j] = 0;
            }
            if (re["data"][i][j] > re["max"]) re["max"] = re["data"][i][j];
            if (re["data"][i][j] < re["min"]) re["min"] = re["data"][i][j];

        }
    }
    return re;
}