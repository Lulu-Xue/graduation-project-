/* NCBI file reader */

export let colorRange = ["#dd4444", "#fec42c", "#80F1BE"],
	backColor = "rgba(28, 29, 38, 1)",
	lineColor = "#666",
	textColor = "#999",
	disableColor = "#333";

export function randomList(NCBIData, listSize) {
	let re = getColumn(NCBIData, 4, 'all');
	re.sort(function () { return 0.5 - Math.random() });
	return re.slice(0, listSize);
}

export function getNCBIValues(NCBIData, NCNumbers) {
	let lines = NCBIData, res = [];
	if (NCNumbers) {
		let count = 0, len = NCNumbers.length;
		for (let i = 1; i < lines.length; i++) {
			if (lines[i]) {
				let nc_no = lines[i][4];
				if (NCNumbers.indexOf(nc_no) >= 0) {
					let line = lines[i];
					switch (line[3]) {
						case 'plastid':
							line[3] = "Plastid DNA"; break;
						case 'mitochondrion':
							line[3] = "mtDNA"; break;
						case 'chloroplast':
							line[3] = "cpDNA"; break;
					}
					res.push(line);
					count++;
				}
				if (count === len) break;
			}
		}
	} else {
		for (let i = 1, len = lines.length; i < len; i++) {
			if (lines[i]) {
				if (lines[i][12] < 900) res.push(lines[i]);//for beautiful scatter3D
			}
		}
	}
	return res;
}

export function getColumn(NCBIData, columnNumber, type, group) {
	let lines = NCBIData;
	let re = [];
	for (let i = 1; i < lines.length; i++) { // length-1: the last line is empty
		if (lines[i]) {
			let line = lines[i];
			if ((!type || line[3] === type || type === 'all') && (!group || line[1] === group)) {
				if (line[columnNumber] === '-') continue; // ignore the '-'
				if (re.indexOf(line[columnNumber]) < 0) re.push(line[columnNumber]);
			}
		}
	}
	return re;
}

export function switchColumn(matrix, source, target) {
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i]) [matrix[i][source], matrix[i][target]] = [matrix[i][target], matrix[i][source]];
		// let t = matrix[i][source];
		// matrix[i][source] = matrix[i][target];
		// matrix[i][target] = t;
	}
}

// export function getNCType(NCBIData, NCNumber) {
// 	// ../CPTree/service/cpdata.php?id=NC_000932.1&type=vdog
// 	var values = getNCBIValues(NCBIData, NCNumber);
// 	switch (values[3]) {
// 		case "mitochondrion":
// 			return "mtDNA";
// 		case "chloroplast":
// 			return "cpDNA";
// 		case "plastid":
// 			return "cpDNA";
// 	}
// 	return null;
// }
