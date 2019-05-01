import Vue from "vue"
import { getNCBIValues, randomList, switchColumn, colorRange, backColor, lineColor, textColor, disableColor } from "./ncbi.js"

// x subgroup size
// y sum of gene
// radius average genome size
export async function initPage(myChart, popNotification) {
	// ./genomes_organelles.txt
	await Vue.axios.get('/history.txt').then((res) => {
		// let NCBIData = res.data;
		// var data = new Object();
		// data.SubGroup = removeDuplicated( getColumnByName(NCBIData, "SubGroup", "all" ).sort().slice(0,-1) );// remove last: "SubGroup"
		// data.timeline = statisticDate( getColumnByName(NCBIData, "Release Date", "all" ).sort().slice(0,-1) ); // remove last: "Release Date"
		// data.series = statisticTimeline(NCBIData, data.timeline, data.SubGroup);

		var data = res.data;

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
							return 0.5 * val[2] + 5;
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
					window.open("entry.php?SubGroup=" + params.data[3].split(",")[0]);
				}
			}
		});
	});
}

// function removeDuplicated(arr) {
//     var hash = {};
//     var len = arr.length;
//     var re = [];

//     for (var i = 0; i < len; i++){
//         if (!hash[arr[i]]){
//             hash[arr[i]] = true;
//             re.push(arr[i]);
//         } 
//     }
//     return re;
// }

// function statisticDate(timeline) {
//     var hash = {};
//     var len = timeline.length;
//     var re = [];

//     for (var i = 0; i < len; i++){
//         var time = timeline[i].slice(0,4);
//         if ( !hash[ time ] ) {
//             hash[time] = true;
//             re.push(time);
//         } 
//     }
//     return re;
// }

// function statisticTimeline(NCBIData, timeline, subgroups) {
//     var re = new Array();
//     for (var i=0; i<timeline.length; i++) {
//         var oneYear = new Array();
//         for (var j=0; j<subgroups.length; j++) {
//             var geneValues = getColumnBeforeTime( NCBIData, 12, subgroups[j], timeline[i] ).sort().slice(0,-1); // remove last: column name
//             var subgroupSize = geneValues.length;
//             if ( subgroupSize == 0 ) {
//                 oneYear.push( [1,1,0,subgroups[j],parseInt(timeline[i])] );
//                 continue;
//             }
//             var geneNumber =  sumAll( geneValues );

//             var sizeValues = getColumnBeforeTime( NCBIData, 6, subgroups[j], timeline[i] ).sort().slice(0,-1);
//             var averageGeneSize = sumAll( sizeValues )/(sizeValues.length);

//             oneYear.push([ subgroupSize, geneNumber, averageGeneSize, subgroups[j], parseInt(timeline[i]) ]);
//         }
//         re.push(oneYear);
//     }
//     return re;
// }

// function sumAll(arr) {
//     var re=0;
//     for (var i=0;i<arr.length;i++) {
//         re += parseFloat( arr[i] );
//     }
//     return re;
// }

// function getColumn(NCBIData, columnNumber, subgroupName) {
//     var lines = NCBIData.split("\n");
//     var re = lines[0].split("\t")[columnNumber] + ",";
//     for (var i=1; i<lines.length-1; i++) { // length-1: the last line is empty
//         if ( lines[i].split("\t")[2] == subgroupName || subgroupName == 'all') {
//             if ( lines[i].split("\t")[columnNumber] == '-' ) continue; // ignore the '-'
//             re += lines[i].split("\t")[columnNumber] + ",";
//         }
//     }
//     return re.substr(0, re.length-1).split(",");
// }

// function getColumnBeforeTime(NCBIData, columnNumber, subgroupName, beforeDate) {
//     var lines = NCBIData.split("\n");
//     var re = lines[0].split("\t")[columnNumber] + ",";
//     for (var i=1; i<lines.length-1; i++) { // length-1: the last line is empty
//         if ( lines[i].split("\t")[2] == subgroupName && parseInt(lines[i].split("\t")[14].slice(0,4))<=beforeDate ) {
//             if ( lines[i].split("\t")[columnNumber] == '-' ) continue; // ignore the '-'
//             re += lines[i].split("\t")[columnNumber] + ",";
//         }
//     }
//     return re.substr(0, re.length-1).split(",");
// }