var express = require('express');
var router = express.Router();
var fs = require("fs");

let header = ["#Organism/Name", "Group", "SubGroup", "Type", "RefSeq", "INSDC", "Size (Kb)", "GC%", "Protein", "rRNA", "tRNA", "Other RNA", "Gene", "Pseudogene", "Release Date", "Modify Date"];//约定的列

function switchColumn(matrix, source, target) {
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i]) [matrix[i][source], matrix[i][target]] = [matrix[i][target], matrix[i][source]];
	}
}

function orderType(data) { //给传入数据排序
	let title = data[0];
	for (let i = 0, len = header.length; i < len; i++) {
		if (title[i].split(header[i]).length > 1 && title.indexOf(header[i]) > 0) {
			switchColumn(data, i, title.indexOf(header[i]));
		}
	}
}

function getLineType(lines) { //获取每列的类型，是number的需要转换
	let res = [];
	for (let i = 1, len = lines.length; i < len; i++) {
		if (lines[i]) {
			let line = lines[i].split("\t"), j = 0, jlen = 0;
			for (j = 0, jlen = line.length; j < jlen; j++) {
				res.push(+line[j]);
				if (line[j] === '-') break;
			}
			if (j < jlen) {
				res = [];
			} else {
				break;
			}
		}
	}
	return res;
}

/* GET gene listing. */
router.get('/gene', function (req, res, next) {
	fs.readFile("../public/genomes_organelles.txt", 'utf8', function (err, data) {
		if (err) {
			return console.error(err);
		}
		let lines = data.split("\r\n");
		let result = [];
		let types = getLineType(lines);
		for (let i = 0, len = lines.length; i < len; i++) {
			if (lines[i]) {
				let line = lines[i].split("\t");
				for (let j = 0; j < line.length; j++) {
					if (i != 0 && !isNaN(types[j])) {
						if (line[j] === '-') line[j] = 0;
						else line[j] = +line[j];
					}
				}
				result.push(line);
			}
		}
		orderType(result);
		res.json(result);
	});
});

module.exports = router;
