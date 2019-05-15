import { backColor, lineColor, textColor } from "./ncbi.js"

function getSubGroup(NCBIData) {
	let lines = NCBIData;
	let res = {}, re = [];
	for (let i = 0; i < lines.length; i++) {
		if (lines[i]) {
			let line = lines[i];
			if (Object.keys(res).indexOf(line[2]) < 0) {
				res[line[2]] = [line[3]];
			} else if (res[line[2]].indexOf(line[3]) < 0) {
				res[line[2]].push(line[3]);
			}
		}
	}
	for (let i in res) {
		for (let j = 0; j < res[i].length; j++) {
			re.push(i + ", " + res[i][j]);
		}
	}
	return re;
}

function getHistory(NCBIData) {
	let lines = NCBIData.slice(1).sort(function (a, b) {
		return (+a[14].split("/")[0]) - (+b[14].split("/")[0]);
	});
	let timeLine = [+lines[0][14].split("/")[0]], series = [];
	let re = {
		"SubGroup": getSubGroup(NCBIData)
	};
	let seriesIndex = 0;
	series[seriesIndex] = [];
	for (let i = 0, len = re["SubGroup"].length; i < len; i++) {
		series[seriesIndex].push([1, 1, 0, re["SubGroup"][i], timeLine[seriesIndex]]);
	}
	for (let i = 0; i < lines.length; i++) {
		if (lines[i]) {
			let line = lines[i];
			let year = +line[14].split("/")[0];
			if (timeLine.indexOf(year) < 0) {
				timeLine.push(year);
				seriesIndex++;
				series[seriesIndex] = [];
				for (let j = 0, len = re["SubGroup"].length; j < len; j++) {
					series[seriesIndex][j] = series[seriesIndex - 1][j].slice();
				}
			}
			let seriesLine = series[seriesIndex][re["SubGroup"].indexOf(line[2] + ", " + line[3])];
			if (seriesLine[2] === 0) {
				seriesLine[1] = line[12];
				seriesLine[2] = line[6];
			} else {
				seriesLine[2] = (seriesLine[2] * seriesLine[0] + line[6]) / (seriesLine[0] + 1);
				seriesLine[0]++;
				seriesLine[1] += line[12];
			}
		}
	}
	re["timeline"] = timeLine;
	re["series"] = series;
	return re;
}

// x subgroup size
// y sum of gene
// radius average genome size
export async function initPage(NCBIData, myChart, oldNcList, NCBIValues, router) {


	var data = getHistory(NCBIData);

	var itemStyle = {
		normal: {
			opacity: 0.8,
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0, 0, 0, 0.5)'
		}
	};

	var schema = [
		{ name: 'Genes', index: 0, text: 'SubGroup Size' },  // x
		{ name: 'SumOfGene', index: 1, text: 'Sum of Gene' },  // y
		{ name: 'AverageSize', index: 2, text: 'Average Genome Size (KB)' },  // r
		{ name: 'SubGoup', index: 3, text: 'SubGoupName' }   // color
	];

	let option = {
		baseOption: {
			timeline: {
				axisType: 'category',
				orient: 'vertical',
				autoPlay: true,
				inverse: true,
				playInterval: 2000,
				left: null,
				right: 0,
				top: 20,
				bottom: 20,
				width: 55,
				height: null,
				label: {
					normal: {
						textStyle: {
							color: textColor
						}
					},
					emphasis: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				symbol: 'none',
				lineStyle: {
					color: lineColor
				},
				checkpointStyle: {
					color: '#bbb',
					borderColor: '#777',
					borderWidth: 2
				},
				controlStyle: {
					showNextBtn: false,
					showPrevBtn: false,
					normal: {
						color: '#666',
						borderColor: '#666'
					},
					emphasis: {
						color: '#aaa',
						borderColor: '#aaa'
					}
				},
				data: []
			},
			backgroundColor: backColor,
			title: {
				text: data.timeline[0],
				textAlign: 'center',
				right: '10%',
				bottom: '30%',
				textStyle: {
					fontSize: document.body.scrollWidth / 13,
					color: 'rgba(255, 255, 255, 0.7)'
				}
			},
			tooltip: {
				padding: 5,
				backgroundColor: '#222',
				borderColor: '#777',
				borderWidth: 1,
				formatter: function (obj) {
					var value = obj.value;
					return schema[3].text + '：' + value[3] + '<br>'
						+ schema[1].text + '：' + value[1] + '<br>'
						+ schema[0].text + '：' + value[0] + '<br>'
						+ schema[2].text + '：' + value[2] + '<br>';
				}
			},
			grid: {
				left: 80,
				right: 100
			},
			xAxis: {
				type: 'log',
				name: 'Subgroup Size',
				max: 2500,
				min: 1,
				nameGap: 25,
				nameLocation: 'middle',
				nameTextStyle: {
					color: textColor,
					fontSize: 18
				},
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: lineColor
					}
				},
				axisLabel: {
					formatter: '{value}'
				}
			},
			yAxis: {
				type: 'log',
				name: 'Sum of Genes',
				max: 200000,
				min: 1,
				nameTextStyle: {
					color: textColor,
					fontSize: 18
				},
				axisLine: {
					lineStyle: {
						color: lineColor
					}
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					formatter: '{value}'
				}
			},
			visualMap: [
				{
					show: false,
					dimension: 3,
					categories: data.SubGroup,
					calculable: true,
					precision: 0.1,
					textStyle: {
						color: textColor
					},
					inRange: {
						color: (function () {
							var colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
							return colors.concat(colors);
						})()
					}
				}
			],
			series: [
				{
					type: 'scatter',
					itemStyle: itemStyle,
					data: data.series[0]
				}
			],
			animationDurationUpdate: 2000,
			animationEasingUpdate: 'quinticInOut'
		},
		options: []
	};

	for (var n = 0; n < data.timeline.length; n++) {
		option.baseOption.timeline.data.push(data.timeline[n]);
		option.options.push({
			title: {
				show: true,
				'text': data.timeline[n] + ''
			},
			series: {
				name: data.timeline[n],
				type: 'scatter',
				itemStyle: itemStyle,
				data: data.series[n],
				symbolSize: function (val) {
					if (val[2] > 0)
						return 0.3 * val[2] + 5;
					else
						return 0;
				}
			}
		});
	}

	myChart.setOption(option);
	myChart.on('click', function (params) {
		if (params.componentType === 'series') {
			if (params.seriesType === 'scatter') {
				router.push({
					name: "visualization",
					params: {
						type: "sl",
						dataKey: "SubGroup",
						dataValue: params.data[3].split(",")[0]
					}
				});
			}
		}
	});
}